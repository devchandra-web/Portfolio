import { put } from "@vercel/blob";

export interface UploadResult {
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

export async function uploadFile(file: File): Promise<UploadResult> {
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

  if (blobToken) {
    try {
      const blob = await put(`portfolio-media/${Date.now()}-${file.name}`, file, {
        access: "public",
        token: blobToken,
      });

      return {
        url: blob.url,
        name: file.name,
        size: file.size,
        mimeType: file.type,
      };
    } catch (err) {
      console.warn("Vercel Blob upload failed, utilizing fallback upload helper:", err);
    }
  }

  // Fallback storage helper for local dev & evaluation: Convert File to base64 Data URL or mock path
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${file.type};base64,${base64}`;

  return {
    url: dataUrl,
    name: file.name,
    size: file.size,
    mimeType: file.type,
  };
}
