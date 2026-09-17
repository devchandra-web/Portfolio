"use server";

import { revalidatePath } from "next/cache";
import { 
  getContactSubmissions, 
  markContactAsRead, 
  deleteContactSubmission,
  getResumeDownloads,
  deleteResumeDownload
} from "@/lib/store/submissions";

export async function fetchContactSubmissionsAction() {
  return await getContactSubmissions();
}

export async function markContactAsReadAction(id: string) {
  await markContactAsRead(id);
  revalidatePath("/admin");
  revalidatePath("/admin/contact");
  return { success: true };
}

export async function deleteContactSubmissionAction(id: string) {
  await deleteContactSubmission(id);
  revalidatePath("/admin");
  revalidatePath("/admin/contact");
  return { success: true };
}

export async function fetchResumeDownloadsAction() {
  return await getResumeDownloads();
}

export async function deleteResumeDownloadAction(id: string) {
  await deleteResumeDownload(id);
  revalidatePath("/admin");
  revalidatePath("/admin/contact");
  revalidatePath("/admin/messages");
  return { success: true };
}
