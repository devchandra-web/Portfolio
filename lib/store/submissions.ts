import fs from "fs";
import path from "path";
import { prisma } from "@/lib/db/prisma";

export interface ContactItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ResumeDownloadItem {
  id: string;
  email: string;
  ip: string;
  userAgent: string;
  downloadedAt: string;
}

interface StorageData {
  submissions: ContactItem[];
  downloads: ResumeDownloadItem[];
}

const PRIMARY_STORE_PATH = path.join(process.cwd(), "data", "submissions_store.json");
const TMP_STORE_PATH = path.join("/tmp", "submissions_store.json");

const globalForSubmissions = globalThis as unknown as {
  inMemoryStore: StorageData | undefined;
};

if (!globalForSubmissions.inMemoryStore) {
  globalForSubmissions.inMemoryStore = readStoreFile();
}

function readStoreFile(): StorageData {
  let tmpData: Partial<StorageData> | null = null;
  let primaryData: Partial<StorageData> | null = null;

  try {
    if (fs.existsSync(TMP_STORE_PATH)) {
      const content = fs.readFileSync(TMP_STORE_PATH, "utf-8");
      tmpData = JSON.parse(content);
    }
  } catch {
    // Ignore read errors
  }

  try {
    if (fs.existsSync(PRIMARY_STORE_PATH)) {
      const content = fs.readFileSync(PRIMARY_STORE_PATH, "utf-8");
      primaryData = JSON.parse(content);
    }
  } catch {
    // Ignore read errors
  }

  const submissions = [
    ...(tmpData?.submissions || []),
    ...(primaryData?.submissions || []),
  ];

  const downloads = [
    ...(tmpData?.downloads || []),
    ...(primaryData?.downloads || []),
  ];

  const uniqueSubmissions: ContactItem[] = [];
  for (const s of submissions) {
    if (s && s.id && !uniqueSubmissions.some((u) => u.id === s.id)) {
      uniqueSubmissions.push(s);
    }
  }

  const uniqueDownloads: ResumeDownloadItem[] = [];
  for (const d of downloads) {
    if (d && d.id && !uniqueDownloads.some((u) => u.id === d.id)) {
      uniqueDownloads.push(d);
    }
  }

  return {
    submissions: uniqueSubmissions,
    downloads: uniqueDownloads,
  };
}

function writeStoreFile(data: StorageData) {
  globalForSubmissions.inMemoryStore = data;

  try {
    fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ephemeral /tmp write fallback
  }

  try {
    const dir = path.dirname(PRIMARY_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRIMARY_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignore EROFS on serverless (Vercel)
  }
}

export async function addContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  let createdItem: ContactItem | null = null;

  // 1. Try DB insertion first via Prisma
  try {
    if (prisma && "contactSubmission" in prisma && typeof (prisma as any).contactSubmission?.create === "function") {
      const dbRecord = await (prisma as any).contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });
      if (dbRecord) {
        createdItem = {
          id: dbRecord.id,
          name: dbRecord.name,
          email: dbRecord.email,
          subject: dbRecord.subject,
          message: dbRecord.message,
          read: dbRecord.read,
          createdAt: dbRecord.createdAt instanceof Date ? dbRecord.createdAt.toISOString() : String(dbRecord.createdAt),
        };
      }
    }
  } catch (err) {
    console.error("[DB Contact Submission Error]:", err);
  }

  // 2. If DB not available or failed, create local fallback item
  if (!createdItem) {
    createdItem = {
      id: `sub-${Date.now()}`,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      read: false,
      createdAt: new Date().toISOString(),
    };
  }

  // Save to in-memory/file store safely
  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedStore = {
    ...store,
    submissions: [createdItem, ...store.submissions.filter((s) => s.id !== createdItem!.id)],
  };
  writeStoreFile(updatedStore);

  return createdItem;
}

export async function getContactSubmissions(): Promise<ContactItem[]> {
  let dbSubmissions: ContactItem[] = [];

  try {
    if (prisma && "contactSubmission" in prisma && typeof (prisma as any).contactSubmission?.findMany === "function") {
      const dbItems = await (prisma as any).contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (Array.isArray(dbItems)) {
        dbSubmissions = dbItems.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          subject: item.subject,
          message: item.message,
          read: item.read,
          createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : String(item.createdAt),
        }));
      }
    }
  } catch (err) {
    console.error("[DB Get Contact Submissions Error]:", err);
  }

  const store = globalForSubmissions.inMemoryStore || readStoreFile();

  // Combine DB and in-memory store without duplicating IDs
  const combined = [...dbSubmissions];
  for (const item of store.submissions) {
    if (!combined.some((c) => c.id === item.id)) {
      combined.push(item);
    }
  }

  // Sort by newest first
  combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return combined;
}

export async function markContactAsRead(id: string) {
  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedSubmissions = store.submissions.map((s) =>
    s.id === id ? { ...s, read: true } : s
  );
  writeStoreFile({ ...store, submissions: updatedSubmissions });

  try {
    if (prisma && "contactSubmission" in prisma && typeof (prisma as any).contactSubmission?.update === "function") {
      await (prisma as any).contactSubmission.update({
        where: { id },
        data: { read: true },
      });
    }
  } catch (err) {
    console.error("[DB Mark Read Error]:", err);
  }
}

export async function deleteContactSubmission(id: string) {
  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedSubmissions = store.submissions.filter((s) => s.id !== id);
  writeStoreFile({ ...store, submissions: updatedSubmissions });

  try {
    if (prisma && "contactSubmission" in prisma && typeof (prisma as any).contactSubmission?.delete === "function") {
      await (prisma as any).contactSubmission.delete({
        where: { id },
      });
    }
  } catch (err) {
    console.error("[DB Delete Contact Error]:", err);
  }
}

export async function addResumeDownload(email: string, ip?: string, userAgent?: string) {
  let createdItem: ResumeDownloadItem | null = null;

  // 1. Try DB insertion first via Prisma
  try {
    if (prisma && "resumeDownload" in prisma && typeof (prisma as any).resumeDownload?.create === "function") {
      const dbRecord = await (prisma as any).resumeDownload.create({
        data: {
          email: email || "Not Provided",
          ip: ip || "127.0.0.1",
          userAgent: userAgent || "Unknown Browser",
        },
      });
      if (dbRecord) {
        createdItem = {
          id: dbRecord.id,
          email: dbRecord.email || "Not Provided",
          ip: dbRecord.ip || "127.0.0.1",
          userAgent: dbRecord.userAgent || "Unknown Browser",
          downloadedAt: dbRecord.downloadedAt instanceof Date ? dbRecord.downloadedAt.toISOString() : String(dbRecord.downloadedAt),
        };
      }
    }
  } catch (err) {
    console.error("[DB Resume Download Error]:", err);
  }

  // 2. If DB not available or failed, create local fallback item
  if (!createdItem) {
    createdItem = {
      id: `dl-${Date.now()}`,
      email: email || "Not Provided",
      ip: ip || "127.0.0.1",
      userAgent: userAgent || "Unknown Browser",
      downloadedAt: new Date().toISOString(),
    };
  }

  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedStore = {
    ...store,
    downloads: [createdItem, ...store.downloads.filter((d) => d.id !== createdItem!.id)],
  };
  writeStoreFile(updatedStore);

  return createdItem;
}

export async function getResumeDownloads(): Promise<ResumeDownloadItem[]> {
  let dbDownloads: ResumeDownloadItem[] = [];

  try {
    if (prisma && "resumeDownload" in prisma && typeof (prisma as any).resumeDownload?.findMany === "function") {
      const dbItems = await (prisma as any).resumeDownload.findMany({
        orderBy: { downloadedAt: "desc" },
      });
      if (Array.isArray(dbItems)) {
        dbDownloads = dbItems.map((item: any) => ({
          id: item.id,
          email: item.email || "Not Provided",
          ip: item.ip || "127.0.0.1",
          userAgent: item.userAgent || "Unknown Browser",
          downloadedAt: item.downloadedAt instanceof Date ? item.downloadedAt.toISOString() : String(item.downloadedAt),
        }));
      }
    }
  } catch (err) {
    console.error("[DB Get Resume Downloads Error]:", err);
  }

  const store = globalForSubmissions.inMemoryStore || readStoreFile();

  const combined = [...dbDownloads];
  for (const item of store.downloads) {
    if (!combined.some((c) => c.id === item.id)) {
      combined.push(item);
    }
  }

  combined.sort((a, b) => new Date(b.downloadedAt).getTime() - new Date(a.downloadedAt).getTime());

  return combined;
}

export async function deleteResumeDownload(id: string) {
  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedDownloads = store.downloads.filter((d) => d.id !== id);
  writeStoreFile({ ...store, downloads: updatedDownloads });

  try {
    if (prisma && "resumeDownload" in prisma && typeof (prisma as any).resumeDownload?.delete === "function") {
      await (prisma as any).resumeDownload.delete({
        where: { id },
      });
    }
  } catch (err) {
    console.error("[DB Delete Resume Download Error]:", err);
  }
}


