// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { email } = await req.json();
  console.log(email);
  try {
    const document2 = await prisma.document.findMany({
      where: {
        Recipient: {
          some: {
            email: email,
            signingStatus: "NOT_SIGNED",
          },
        },
      },
      include: {
        Recipient: true,
      },
    });

    return NextResponse.json({
      message: "Document",
      Document: document2,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
