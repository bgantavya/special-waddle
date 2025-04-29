import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@libs/cloudinary";

export async function POST(req: NextRequest) {
    
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }).end(buffer);
        });

        return NextResponse.json(uploadResult);
    } catch (err) {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
