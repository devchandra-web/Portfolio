"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/auth/session";
import { projectSchema } from "@/lib/validations";

export async function createProjectAction(formData: unknown) {
  try {
    await verifySession();

    const validation = projectSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const { technologies, ...data } = validation.data;

    // Check slug uniqueness
    const existing = await prisma.project.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return { success: false, error: "A project with this slug already exists. Please choose a unique slug." };
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null,
      },
    });

    // Process technologies relations
    if (technologies && technologies.length > 0) {
      for (const techName of technologies) {
        const techSlug = techName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const tech = await prisma.technology.upsert({
          where: { slug: techSlug },
          update: { name: techName },
          create: { name: techName, slug: techSlug },
        });

        await prisma.projectTechnology.create({
          data: {
            projectId: project.id,
            technologyId: tech.id,
          },
        });
      }
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/admin/projects");

    return { success: true, message: "Project created successfully!", project };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create project";
    return { success: false, error: msg };
  }
}

export async function updateProjectAction(id: string, formData: unknown) {
  try {
    await verifySession();

    const validation = projectSchema.safeParse(formData);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const { technologies, ...data } = validation.data;

    const existing = await prisma.project.findUnique({
      where: { id },
    });

    if (!existing) {
      return { success: false, error: "Project not found" };
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        publishedAt: data.published && !existing.published ? new Date() : existing.publishedAt,
      },
    });

    // Update tech relations
    if (technologies) {
      await prisma.projectTechnology.deleteMany({
        where: { projectId: id },
      });

      for (const techName of technologies) {
        const techSlug = techName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const tech = await prisma.technology.upsert({
          where: { slug: techSlug },
          update: { name: techName },
          create: { name: techName, slug: techSlug },
        });

        await prisma.projectTechnology.create({
          data: {
            projectId: id,
            technologyId: tech.id,
          },
        });
      }
    }

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${updated.slug}`);
    revalidatePath("/admin/projects");

    return { success: true, message: "Project updated successfully!", project: updated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update project";
    return { success: false, error: msg };
  }
}

export async function toggleProjectPublishAction(id: string, published: boolean) {
  try {
    await verifySession();

    const project = await prisma.project.update({
      where: { id },
      data: {
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/admin/projects");

    return {
      success: true,
      message: `Project ${published ? "published" : "unpublished"} successfully!`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to toggle status";
    return { success: false, error: msg };
  }
}

export async function toggleProjectFeaturedAction(id: string, featured: boolean) {
  try {
    await verifySession();

    const project = await prisma.project.update({
      where: { id },
      data: { featured },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/admin/projects");

    return { success: true, message: "Project featured status updated!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to toggle featured status";
    return { success: false, error: msg };
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await verifySession();

    const project = await prisma.project.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/admin/projects");

    return { success: true, message: "Project deleted successfully!" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to delete project";
    return { success: false, error: msg };
  }
}
