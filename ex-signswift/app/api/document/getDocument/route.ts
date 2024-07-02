// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { docId } = await req.json();
  // console.log(await req.json());
  // console.log("api fetch", docId);
  console.log(docId, "document id is");

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
    console.log(document, "document in ");

    return NextResponse.json({
      message: "Document",
      Document: document,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Internal Server Error",
      status: 500,
      error: error.message,
    });
  }
}
