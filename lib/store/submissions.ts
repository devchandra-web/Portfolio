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
  // Try reading from /tmp first (on Vercel/serverless)
  try {
    if (fs.existsSync(TMP_STORE_PATH)) {
      const content = fs.readFileSync(TMP_STORE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch {
    // Ignore error
  }

  // Fallback to local data directory
  try {
    if (fs.existsSync(PRIMARY_STORE_PATH)) {
      const content = fs.readFileSync(PRIMARY_STORE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch {
    // Ignore error
  }

  return INITIAL_DATA;
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
    submissions: [newItem, ...currentStore.submissions],
  };
  writeStoreFile(updatedStore);

  // 2. Save to Database via Prisma if available
  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
  } catch (err) {
    console.warn("Prisma DB save failed, saved to serverless store fallback:", err);
  }

  return newItem;
}

export async function getContactSubmissions(): Promise<ContactItem[]> {
  try {
    const dbItems = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbItems && dbItems.length > 0) {
      return dbItems.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subject: item.subject,
        message: item.message,
        read: item.read,
        createdAt: item.createdAt.toISOString(),
      }));
    }
  } catch {
    // DB offline or credentials missing, use fallback store
  }

  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  return store.submissions;
}

export async function markContactAsRead(id: string) {
  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedSubmissions = store.submissions.map((s) =>
    s.id === id ? { ...s, read: true } : s
  );
  writeStoreFile({ ...store, submissions: updatedSubmissions });

  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: { read: true },
    });
  } catch {
    // Fallback handled
  }
}

export async function deleteContactSubmission(id: string) {
  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedSubmissions = store.submissions.filter((s) => s.id !== id);
  writeStoreFile({ ...store, submissions: updatedSubmissions });

  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });
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
    await prisma.resumeDownload.create({
      data: {
        email: email || "Not Provided",
        ip: ip || "127.0.0.1",
        userAgent: userAgent || "Unknown Browser",
      },
    });
  } catch (err) {
    console.warn("Prisma DB save failed, saved to serverless store fallback:", err);
  }

  return newItem;
}

export async function getResumeDownloads(): Promise<ResumeDownloadItem[]> {
  try {
    const dbItems = await prisma.resumeDownload.findMany({
      orderBy: { downloadedAt: "desc" },
    });
    if (dbItems && dbItems.length > 0) {
      return dbItems.map((item) => ({
        id: item.id,
        email: item.email || "Not Provided",
        ip: item.ip || "127.0.0.1",
        userAgent: item.userAgent || "Unknown Browser",
        downloadedAt: item.downloadedAt.toISOString(),
      }));
    }
  } catch {
    // DB offline, fallback to memory/file store
  }

  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  return store.downloads;
}

export async function deleteResumeDownload(id: string) {
  const store = globalForSubmissions.inMemoryStore || readStoreFile();
  const updatedDownloads = store.downloads.filter((d) => d.id !== id);
  writeStoreFile({ ...store, downloads: updatedDownloads });

  try {
    await prisma.resumeDownload.delete({
      where: { id },
    });
  } catch {
    // Fallback handled
  }
}
