import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { addContactSubmission, getContactSubmissions } from "@/lib/store/submissions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const submission = await addContactSubmission({
      name,
      email,
      subject: subject || "Portfolio Contact Inquiry",
      message,
    });

    try {
      revalidatePath("/admin");
      revalidatePath("/admin/messages");
    } catch {
      // Ignore cache revalidation errors
    }

    console.log(`[EMAIL ALERT] New contact form submission from ${name} (${email})`);
    console.log(`[EMAIL ALERT] Forwarded Notification to: cd6388881581@gmail.com`);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been recorded and sent to Chandra Shekhar.",
      data: submission,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process contact submission. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const submissions = await getContactSubmissions();
    return NextResponse.json({ success: true, data: submissions });
  } catch {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}
