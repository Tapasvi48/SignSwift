import { createPresignedUrlToDownload } from "@/app/utils/s3-file-management";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * This route is used to get presigned url for downloading file from S3
 */
export async function GET(req: NextRequest) {
  console.log("hnuefunfuenfuenn");
  console.log(req.url);
  const segments =
    req?.url?.split("/") === undefined ? [] : req?.url?.split("/");

  const lastSegment =
    segments[segments?.length - 1] !== undefined
      ? segments[segments?.length - 1]
      : "";
  console.log(lastSegment);
  const id = lastSegment;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Missing or invalid filename" });
  }

  console.log("file", id);

  // Get the file name in bucket from the database
  const fileObject = await prisma.file.findUnique({
    where: {
      id,
    },
    select: {
      fileName: true,
    },
  });

  if (!fileObject) {
    return NextResponse.json({ message: "Item not found" });
  }

  // Get presigned url from s3 storage
  const presignedUrl = await createPresignedUrlToDownload({
    bucketName:
      process.env.S3_BUCKET_NAME !== undefined
        ? process.env.S3_BUCKET_NAME
        : "ipvms-dev",
    fileName: fileObject?.fileName,
  });

  console.log(presignedUrl);

  return NextResponse.json({ message: presignedUrl });
}
