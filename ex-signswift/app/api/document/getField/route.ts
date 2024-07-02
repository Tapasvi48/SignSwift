// We import our Prisma client
import prisma from "@/lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { docId } = await req.json();

  try {
    const document = await prisma.document.findUnique({
      where: {
        id: parseInt(docId),
      },
      include: {
        Field: true,
        Recipient: true,
      },
    });

    return NextResponse.json({
      message: "Document",
      Document: document,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
    });
  }
}
