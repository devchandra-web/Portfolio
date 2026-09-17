import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { createSession } from "@/lib/auth/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Default admin credentials fallback if DB user is not yet created
    const defaultEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const defaultPassword = process.env.ADMIN_PASSWORD || "admin123";

    let adminUser = null;

    try {
      adminUser = await prisma.user.findUnique({
        where: { email },
      });
    } catch {
      // DB offline or non-responsive, fallback check
    }

    let isValidPassword = false;

    if (adminUser) {
      isValidPassword = await bcrypt.compare(password, adminUser.passwordHash);
    } else if (email === defaultEmail) {
      // Fallback matching against default credentials
      isValidPassword = password === defaultPassword;
    }

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid email address or password" },
        { status: 401 }
      );
    }

    const userId = adminUser?.id || "admin-main";
    const userRole = adminUser?.role || "ADMIN";

    await createSession(userId, email, userRole);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: { id: userId, email, role: userRole },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
