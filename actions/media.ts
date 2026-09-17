"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";

export async function deleteMediaAction(id: string) {
  try {
    await verifySession();

    await prisma.media.delete({
      where: { id },
    });

    revalidatePath("/admin/media");

    return { success: true, message: "Media deleted successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete media";
    return { success: false, error: msg };
  }
}
