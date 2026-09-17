"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { serviceSchema } from "@/lib/validations";

export async function createServiceAction(formData: unknown) {
  try {
    await verifySession();

    const validation = serviceSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.service.create({
      data,
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");

    return { success: true, message: "Service created successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create service";
    return { success: false, error: msg };
  }
}

export async function updateServiceAction(id: string, formData: unknown) {
  try {
    await verifySession();

    const validation = serviceSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const data = validation.data;

    await prisma.service.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");

    return { success: true, message: "Service updated successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update service";
    return { success: false, error: msg };
  }
}

export async function deleteServiceAction(id: string) {
  try {
    await verifySession();

    await prisma.service.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");

    return { success: true, message: "Service deleted successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete service";
    return { success: false, error: msg };
  }
}
