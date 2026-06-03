import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthed } from "@/lib/adminAuth";
import { addGalleryPhoto, deleteGalleryPhoto } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        message: "Image storage is not configured. Add BLOB_READ_WRITE_TOKEN (Vercel Blob).",
      },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const alt = (formData.get("alt") ?? "").toString().trim();
    const caption = (formData.get("caption") ?? "").toString().trim();

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ ok: false, message: "No image file provided." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ ok: false, message: "File must be an image." }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(`gallery/${Date.now()}-${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });

    await addGalleryPhoto({ url: blob.url, alt: alt || file.name, caption });
    return NextResponse.json({ ok: true, url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("Failed to upload gallery image", error);
    return NextResponse.json({ ok: false, message: "Upload failed." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { id?: number };
    if (typeof body.id !== "number") {
      return NextResponse.json({ ok: false, message: "Missing photo id." }, { status: 400 });
    }
    await deleteGalleryPhoto(body.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete gallery image", error);
    return NextResponse.json({ ok: false, message: "Delete failed." }, { status: 500 });
  }
}
