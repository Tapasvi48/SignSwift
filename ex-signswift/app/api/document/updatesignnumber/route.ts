import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { docId, signnumber } = await req.json();
  console.log(docId, signnumber, "in add recpientr");

  try {
    const updatedRecord = await prisma.document.update({
      where: {
        id: docId,
      },
      data: {
        signnumber: signnumber,
      },
    });

    console.log(updatedRecord, "in add recpint");

    return NextResponse.json({
      message: "Recepient Addded Success",
      success: true,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Imnernal Server asda Error",
      status: 500,
      error: error.message,
    });
  }
}
