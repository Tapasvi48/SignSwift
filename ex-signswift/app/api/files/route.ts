import type { NextApiRequest, NextApiResponse } from "next";
import type { FileProps } from "@/app/utils/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const LIMIT_FILES = 10;

export async function POST() {
  // Get 10 latest files from the database
  // For simplicity, we are not using pagination
  // If you want to implement pagination, you can use skip and take
  // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#skip-and-take

  const files = await prisma.file?.findMany({
    take: LIMIT_FILES,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      originalName: true,
      size: true,
    },
  });

  // The database type is a bit different from the frontend type
  // Make the array of files compatible with the frontend type FileProps
  const filesWithProps: FileProps[] = files?.map((file: any) => ({
    id: file.id,
    originalFileName: file.originalName,
    fileSize: file.size,
  }));

  return NextResponse.json(filesWithProps);
}
