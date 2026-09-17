"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { experienceSchema } from "@/lib/validations";

export async function createExperienceAction(formData: unknown) {
  try {
    await verifySession();

    const validation = experienceSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.experience.create({
      data,
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");

    return { success: true, message: "Experience entry created successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create experience";
    return { success: false, error: msg };
  }
}

export async function updateExperienceAction(id: string, formData: unknown) {
  try {
    await verifySession();

    const validation = experienceSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.experience.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");

    return { success: true, message: "Experience entry updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update experience";
    return { success: false, error: msg };
  }
}

export async function deleteExperienceAction(id: string) {
  try {
    await verifySession();

    await prisma.experience.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/experience");
    revalidatePath("/admin/experience");

    return { success: true, message: "Experience entry deleted successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete experience";
    return { success: false, error: msg };
  }
}
