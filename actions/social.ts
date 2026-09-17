"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { socialSchema } from "@/lib/validations";

export async function createSocialLinkAction(formData: unknown) {
  try {
    await verifySession();

    const validation = socialSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.socialLink.create({
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/social");

    return { success: true, message: "Social link created successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create social link";
    return { success: false, error: msg };
  }
}

export async function updateSocialLinkAction(id: string, formData: unknown) {
  try {
    await verifySession();

    const validation = socialSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.socialLink.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/social");

    return { success: true, message: "Social link updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update social link";
    return { success: false, error: msg };
  }
}

export async function deleteSocialLinkAction(id: string) {
  try {
    await verifySession();

    await prisma.socialLink.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/social");

    return { success: true, message: "Social link deleted successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete social link";
    return { success: false, error: msg };
  }
}
