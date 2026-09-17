import { NextRequest, NextResponse } from "next/server";
import { addResumeDownload } from "@/lib/store/submissions";

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
  const email = searchParams.get("email") || "Not Provided";

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || "Unknown Browser";

  await addResumeDownload(email, ip, userAgent);

  const url = new URL("/resume.pdf", req.url);
  return NextResponse.redirect(url);
}
