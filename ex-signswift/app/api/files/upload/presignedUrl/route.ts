import type { NextApiRequest, NextApiResponse } from "next";
import type { ShortFileProp, PresignedUrlProp } from "@/app/utils/types";
import { createPresignedUrlToUpload } from "@/app/utils/s3-file-management";

import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const bucketName =
  process.env.S3_BUCKET_NAME == undefined
    ? "ipvms-dev"
    : process.env.S3_BUCKET_NAME;
const expiry = 60 * 60; // 24 hours

export async function POST(req: NextRequest, res: NextApiResponse) {
  const request = await req.json();
  console.log(request);

  // get the files from the request body
  const files = request as ShortFileProp[];
  console.log(files.length, "dev dev");

  if (!files?.length) {
    return NextResponse.json({
      message: "Imnernal Server asda Error",
      status: 500,
    });
  }

  const presignedUrls = [] as PresignedUrlProp[];

  if (files?.length) {
    // use Promise.all to get all the presigned urls in parallel
    await Promise.all(
      // loop through the files
      files?.map(async (file) => {
        const fileName = `${nanoid(5)}-${file?.originalFileName}`;

        // get presigned url using s3 sdk
        const url = await createPresignedUrlToUpload({
          bucketName,
          fileName,
          expiry,
        });
        console.log(url);
        // add presigned url to the list
        presignedUrls.push({
          fileNameInBucket: fileName,
          originalFileName: file.originalFileName,
          fileSize: file.fileSize,
          url,
        });
      })
    );
  }
  console.log(presignedUrls);
  return NextResponse.json({
    message: "Document Uploaded to Minio",
    success: true,
    data: presignedUrls,
    status: 200,
  });
}
