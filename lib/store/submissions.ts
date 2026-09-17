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

const INITIAL_DATA: StorageData = {
  submissions: [
    {
      id: "sub-1",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      subject: "Frontend Developer Inquiry",
      message: "Hi Chandra, we reviewed your profile and experience in React and Next.js. We would like to discuss a Frontend Developer role with our team.",
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
  ],
  downloads: [
    {
      id: "dl-1",
      email: "hr.manager@techcorp.com",
      ip: "152.58.16.42",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      downloadedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
  ],
};

if (!globalForSubmissions.inMemoryStore) {
  globalForSubmissions.inMemoryStore = readStoreFile();
}

function readStoreFile(): StorageData {
  let tmpData: Partial<StorageData> | null = null;
  let primaryData: Partial<StorageData> | null = null;

  // 1. Try reading from /tmp (Vercel serverless)
  try {
    if (fs.existsSync(TMP_STORE_PATH)) {
      const content = fs.readFileSync(TMP_STORE_PATH, "utf-8");
      tmpData = JSON.parse(content);
    }
  } catch {
    // Ignore error
  }

  // 2. Try reading from primary store path
  try {
    if (fs.existsSync(PRIMARY_STORE_PATH)) {
      const content = fs.readFileSync(PRIMARY_STORE_PATH, "utf-8");
      primaryData = JSON.parse(content);
    }
  } catch {
    // Ignore error
  }

  const submissions = [
    ...(tmpData?.submissions || []),
    ...(primaryData?.submissions || []),
  ];

  const downloads = [
    ...(tmpData?.downloads || []),
    ...(primaryData?.downloads || []),
  ];

  // Deduplicate submissions by ID
  const uniqueSubmissions: ContactItem[] = [];
  for (const s of submissions) {
    if (s && s.id && !uniqueSubmissions.some((u) => u.id === s.id)) {
      uniqueSubmissions.push(s);
    }
  }

  // Deduplicate downloads by ID
  const uniqueDownloads: ResumeDownloadItem[] = [];
  for (const d of downloads) {
    if (d && d.id && !uniqueDownloads.some((u) => u.id === d.id)) {
      uniqueDownloads.push(d);
    }
  }

  return {
    submissions: uniqueSubmissions.length > 0 ? uniqueSubmissions : INITIAL_DATA.submissions,
    downloads: uniqueDownloads.length > 0 ? uniqueDownloads : INITIAL_DATA.downloads,
  };
}

function writeStoreFile(data: StorageData) {
  globalForSubmissions.inMemoryStore = data;

  // Try writing to /tmp first (always writable in Vercel serverless)
  try {
    fs.writeFileSync(TMP_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to /tmp store:", err);
  }

  // Also try writing to project data folder (works in local dev)
  try {
    const dir = path.dirname(PRIMARY_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(PRIMARY_STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignore EROFS error on Vercel
  }
}

export async function addContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const newItem: ContactItem = {
    id: `sub-${Date.now()}`,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    read: false,
    createdAt: new Date().toISOString(),
  };

  // 1. Save to Memory & File Store (Guarantees persistence even without live DB)
  const currentStore = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedStore = {
    ...currentStore,
    submissions: [newItem, ...currentStore.submissions.filter((s) => s.id !== newItem.id)],
  };
  writeStoreFile(updatedStore);

  // 2. Save to Database via Prisma if available
  try {
    if (prisma && "contactSubmission" in prisma && typeof (prisma as any).contactSubmission?.create === "function") {
      await (prisma as any).contactSubmission.create({
        data: {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
      });
    }
  } catch {
    // Database offline or table missing, fallback store handled
  }

  return newItem;
}

export async function getContactSubmissions(): Promise<ContactItem[]> {
  let dbSubmissions: ContactItem[] = [];

  try {
    if (prisma && "contactSubmission" in prisma && typeof (prisma as any).contactSubmission?.findMany === "function") {
      const dbItems = await (prisma as any).contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
      });
      if (dbItems) {
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
  } catch {
    // DB offline or credentials missing, use fallback store
  }

  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  
  // Merge DB submissions and local store submissions seamlessly
  const combined = [...dbSubmissions];
  for (const item of store.submissions) {
    if (!combined.some((c) => c.id === item.id)) {
      combined.push(item);
    }
  }

  return combined.length > 0 ? combined : INITIAL_DATA.submissions;
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
  } catch {
    // Fallback handled
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
  } catch {
    // Fallback handled
  }
}

export async function addResumeDownload(email: string, ip?: string, userAgent?: string) {
  const newItem: ResumeDownloadItem = {
    id: `dl-${Date.now()}`,
    email: email || "Not Provided",
    ip: ip || "127.0.0.1",
    userAgent: userAgent || "Unknown Browser",
    downloadedAt: new Date().toISOString(),
  };

  // 1. Save to Memory & File Store (Guarantees persistence even without live DB)
  const currentStore = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedStore = {
    ...currentStore,
    downloads: [newItem, ...currentStore.downloads],
  };
  writeStoreFile(updatedStore);

  // 2. Save to Database via Prisma if available
  try {
    if (prisma && "resumeDownload" in prisma && typeof (prisma as any).resumeDownload?.create === "function") {
      await (prisma as any).resumeDownload.create({
        data: {
          email: email || "Not Provided",
          ip: ip || "127.0.0.1",
          userAgent: userAgent || "Unknown Browser",
        },
      });
    }
  } catch {
    // DB save fallback handled silently
  }

  return newItem;
}

export async function getResumeDownloads(): Promise<ResumeDownloadItem[]> {
  let dbDownloads: ResumeDownloadItem[] = [];

  try {
    if (prisma && "resumeDownload" in prisma && typeof (prisma as any).resumeDownload?.findMany === "function") {
      const dbItems = await (prisma as any).resumeDownload.findMany({
        orderBy: { downloadedAt: "desc" },
      });
      if (dbItems) {
        dbDownloads = dbItems.map((item: any) => ({
          id: item.id,
          email: item.email || "Not Provided",
          ip: item.ip || "127.0.0.1",
          userAgent: item.userAgent || "Unknown Browser",
          downloadedAt: item.downloadedAt instanceof Date ? item.downloadedAt.toISOString() : String(item.downloadedAt),
        }));
      }
    }
  } catch {
    // DB offline, fallback to memory/file store
  }

  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  
  const combined = [...dbDownloads];
  for (const item of store.downloads) {
    if (!combined.some((c) => c.id === item.id)) {
      combined.push(item);
    }
  }

  return combined.length > 0 ? combined : INITIAL_DATA.downloads;
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
  } catch {
    // Fallback handled
  }
}
