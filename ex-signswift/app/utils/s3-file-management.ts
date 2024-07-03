import * as Minio from "minio";
import type internal from "stream";

// Create a new Minio client with the S3 endpoint, access key, and secret key
export const s3Client = new Minio.Client({
  endPoint:
    process.env.S3_ENDPOINT === undefined ? "" : process.env.S3_ENDPOINT,
  port: process.env.S3_PORT ? Number(process.env.S3_PORT) : undefined,
  accessKey:
    process.env.S3_ACCESS_KEY === undefined ? "" : process.env.S3_ACCESS_KEY,
  secretKey:
    process.env.S3_SECRET_KEY === undefined ? "" : process.env.S3_SECRET_KEY,
  useSSL: true,
});
console.log(s3Client, "dev is minio");

export async function createBucketIfNotExists(bucketName: string) {
  const bucketExists = await s3Client.bucketExists(bucketName);
  console.log(bucketExists, "dm bucket exists");
  if (!bucketExists) {
    await s3Client.makeBucket(bucketName);
  }
}

/**
 * Generate presigned urls for uploading files to S3
 * @param files files to upload
 * @returns promise with array of presigned urls
 */
export async function createPresignedUrlToUpload({
  bucketName,
  fileName,
  expiry = 60 * 60, // 1 hour
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}) {
  // Create bucket if it doesn't exist
  // await createBucketIfNotExists(bucketName);
  console.log("createBucketIfNotExists(bucketName); step done");

  return await s3Client.presignedPutObject(bucketName, fileName, expiry);
}

export async function createPresignedUrlToDownload({
  bucketName,
  fileName,
  expiry = 60 * 60 * 24 * 7, // 1 year
}: {
  bucketName: string;
  fileName: string;
  expiry?: number;
}) {
  return await s3Client.presignedGetObject(bucketName, fileName, expiry);
}
