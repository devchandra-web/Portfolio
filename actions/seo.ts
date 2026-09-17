"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { seoSchema } from "@/lib/validations";

export async function updateSeoAction(formData: unknown) {
  try {
    await verifySession();

    const validation = seoSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.sEO.upsert({
      where: { id: "seo-main" },
      update: data,
      create: { id: "seo-main", ...data },
    });

    revalidatePath("/");
    revalidatePath("/admin/seo");

    return { success: true, message: "SEO settings updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update SEO settings";
    return { success: false, error: msg };
  }
}
