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

const STORE_PATH = path.join(process.cwd(), "data", "submissions_store.json");

const INITIAL_DATA: StorageData = {
  submissions: [
    {
      id: "sub-1",
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      subject: "ASP.NET Core & Angular Hiring",
      message: "Hi Alok, we reviewed your profile and experience in ASP.NET Core and Angular. We would like to discuss a Full Stack Developer role with our team.",
      read: false,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: "sub-2",
      name: "Priya Patel",
      email: "priya@techinnovations.io",
      subject: "REST API Development Inquiry",
      message: "Hello Alok, looking for an experienced developer to build scalable RESTful APIs with Spring Boot and C#. Let us know your availability!",
      read: true,
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
  ],
  downloads: [
    {
      id: "dl-1",
      email: "hr.manager@techcorp.com",
      ip: "152.58.16.42",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      downloadedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "dl-2",
      email: "recruiter@innovate.io",
      ip: "103.211.54.12",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      downloadedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
  ],
};

function readStoreFile(): StorageData {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const content = fs.readFileSync(STORE_PATH, "utf-8");
      return JSON.parse(content);
    }
  } catch {
    // If file corrupt or missing, use INITIAL_DATA
  }
  return INITIAL_DATA;
}

function writeStoreFile(data: StorageData) {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to submissions_store.json:", err);
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

  // Write to persistent file store immediately
  const store = readStoreFile();
  store.submissions.unshift(newItem);
  writeStoreFile(store);

  // Try DB persistence
  try {
    await prisma.contactSubmission.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
    });
  } catch {
    // Fallback handled by file store
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
    // DB offline, fallback to file store
  }

  const store = readStoreFile();
  return store.submissions;
}

export async function markContactAsRead(id: string) {
  const store = readStoreFile();
  const index = store.submissions.findIndex((s) => s.id === id);
  if (index !== -1) {
    store.submissions[index].read = true;
    writeStoreFile(store);
  }

  try {
    await prisma.contactSubmission.update({
      where: { id },
      data: { read: true },
    });
  } catch {
    // Graceful fallback
  }
}

export async function deleteContactSubmission(id: string) {
  const store = readStoreFile();
  const index = store.submissions.findIndex((s) => s.id === id);
  if (index !== -1) {
    store.submissions.splice(index, 1);
    writeStoreFile(store);
  }

  try {
    await prisma.contactSubmission.delete({
      where: { id },
    });
  } catch {
    // Graceful fallback
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

  // Write to persistent file store immediately
  const store = readStoreFile();
  store.downloads.unshift(newItem);
  writeStoreFile(store);

  try {
    await prisma.resumeDownload.create({
      data: {
        email: email || "Not Provided",
        ip: ip || "127.0.0.1",
        userAgent: userAgent || "Unknown Browser",
      },
    });
  } catch {
    // Fallback handled by file store
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
    // DB offline, fallback to file store
  }

  const store = readStoreFile();
  return store.downloads;
}

export async function deleteResumeDownload(id: string) {
  const store = readStoreFile();
  const index = store.downloads.findIndex((d) => d.id === id);
  if (index !== -1) {
    store.downloads.splice(index, 1);
    writeStoreFile(store);
  }

  try {
    await prisma.resumeDownload.delete({
      where: { id },
    });
  } catch {
    // Graceful fallback
  }
}
