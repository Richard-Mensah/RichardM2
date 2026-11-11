import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthed } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const MAX_BYTES = 8 * 1024 * 1024;

const FOLDERS = new Set(["client-work", "testimonials"]);

/** Uploads one admin image (project screenshot, testimonial avatar) to Vercel Blob and returns its URL. */
export async function POST(request: NextRequest) {
  if (!(await isAuthed(request))) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { ok: false, message: "Image storage is not configured. Add BLOB_READ_WRITE_TOKEN (Vercel Blob)." },
      { status: 500 },
    );
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = (formData.get("folder") ?? "client-work").toString();
    const folder = FOLDERS.has(folderRaw) ? folderRaw : "client-work";
    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ ok: false, message: "No image file provided." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, message: "File must be an image (JPG, PNG or WebP)." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, message: "Image is larger than 8 MB. Export it as a JPG first." }, { status: 400 });
    }
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(`${folder}/${Date.now()}-${safeName}`, file, { access: "public", addRandomSuffix: true });
    return NextResponse.json({ ok: true, url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("Failed to upload admin image", error);
    return NextResponse.json({ ok: false, message: "Upload failed." }, { status: 500 });
  }
}
