"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { skillSchema } from "@/lib/validations";

export async function createSkillAction(formData: unknown) {
  try {
    await verifySession();

    const validation = skillSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.skill.create({
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/skills");

    return { success: true, message: "Skill created successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create skill";
    return { success: false, error: msg };
  }
}

export async function updateSkillAction(id: string, formData: unknown) {
  try {
    await verifySession();

    const validation = skillSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.skill.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/skills");

    return { success: true, message: "Skill updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update skill";
    return { success: false, error: msg };
  }
}

export async function deleteSkillAction(id: string) {
  try {
    await verifySession();

    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin/skills");

    return { success: true, message: "Skill deleted successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete skill";
    return { success: false, error: msg };
  }
}
