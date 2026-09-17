import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addResumeDownload, getResumeDownloads } from "@/lib/store/submissions";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address to download the resume." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown Browser";

    const download = await addResumeDownload(email, ip, userAgent);

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/messages");
    } catch {
      // Ignore cache revalidation errors
    }

    console.log(`[RESUME CAPTURE] Captured email: ${email} from IP: ${ip}`);

    return NextResponse.json({
      success: true,
      message: "Email verified. Downloading resume...",
      downloadUrl: "/resume.pdf",
      data: download,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process resume download request." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  if (searchParams.has("email")) {
    const email = searchParams.get("email") || "Not Provided";
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "Unknown Browser";

    await addResumeDownload(email, ip, userAgent);

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/messages");
    } catch {
      // Ignore cache revalidation errors
    }

    const url = new URL("/resume.pdf", req.url);
    return NextResponse.redirect(url);
  }

  try {
    const downloads = await getResumeDownloads();
    return NextResponse.json({ success: true, data: downloads });
  } catch {
    return NextResponse.json({ error: "Failed to fetch resume downloads" }, { status: 500 });
  }
}

