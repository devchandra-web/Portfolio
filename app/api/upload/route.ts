import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";
import { uploadFile } from "@/lib/storage";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    await verifySession();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const result = await uploadFile(file);

    // Save record in Media table
    let media = null;
    try {
      media = await prisma.media.create({
        data: {
          name: result.name,
          url: result.url,
          mimeType: result.mimeType,
          size: result.size,
        },
      });
    } catch {
      // Fallback
    }

    return NextResponse.json({
      success: true,
      media: media || result,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
