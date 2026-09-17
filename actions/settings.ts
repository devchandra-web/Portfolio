"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { settingsSchema } from "@/lib/validations";

export async function updateSettingsAction(formData: unknown) {
  try {
    await verifySession();

    const validation = settingsSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.siteSettings.upsert({
      where: { id: "settings-main" },
      update: data,
      create: { id: "settings-main", ...data },
    });

    revalidatePath("/");
    revalidatePath("/admin/settings");

    return { success: true, message: "Site settings updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update site settings";
    return { success: false, error: msg };
  }
}
