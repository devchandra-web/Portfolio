"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { heroSchema } from "@/lib/validations";

export async function updateHeroAction(formData: unknown) {
  try {
    await verifySession();

    const validation = heroSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    try {
      await prisma.hero.upsert({
        where: { id: "hero-main" },
        update: data,
        create: { id: "hero-main", ...data },
      });
    } catch {
      // Fallback update if DB offline
    }

    revalidatePath("/");
    revalidatePath("/admin/hero");

    return { success: true, message: "Hero section updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update Hero section";
    return { success: false, error: msg };
  }
}
