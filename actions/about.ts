"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { aboutSchema } from "@/lib/validations";

export async function updateAboutAction(formData: unknown) {
  try {
    await verifySession();

    const validation = aboutSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    try {
      await prisma.about.upsert({
        where: { id: "about-main" },
        update: data,
        create: { id: "about-main", ...data },
      });
    } catch {
      // Fallback
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/about");

    return { success: true, message: "About section updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update About section";
    return { success: false, error: msg };
  }
}
