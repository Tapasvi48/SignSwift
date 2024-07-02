// We impot our prisma client

import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export interface IField {
  id: number;
  documentId: number;
  left: string;
  secondaryId: string;
  top: string;
  width: string;
  height: string;
  page: number;
  text: string;
  icon: string;
  recipientId: number;
}
interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    droppedItem: IField[];
    docId: string;
  };
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { docId, droppedItem } = await req.json();
  console.log(docId, droppedItem, "new dropped items are");
  await prisma.field.deleteMany({
    where: {
      documentId: parseInt(docId),
    },
  });

  // Create new fields based on droppedItem
  const newFields = droppedItem?.map((item: IField) => ({
    documentId: item.documentId,
    recipientId: item.recipientId || 0,
    page: item.page,
    width: item.width,
    height: item.height,
    left: item.left,
    text: item.text,
    top: item.top,
  }));

  // Create the new fields
  const doc = await prisma.field.createMany({
    data: newFields,
  });

  console.log(doc);
  return NextResponse.json({
    message: "Document Field created successfully",
    status: 201,
  });
}
