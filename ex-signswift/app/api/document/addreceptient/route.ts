// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma, Role } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document

interface Irec {
  name: string;
  email: string;
  token: string;
  documentId: number;
  signnumber: number;
  role: string;
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { docId, recipient } = await req.json();
  console.log(docId, recipient, "in add recpientr");

  try {
    const result = await prisma.recipient?.createMany({
      data: recipient?.map((rec: Irec) => ({
        name: rec?.name?.toString(),
        email: rec?.email?.toString()?.toLowerCase(),
        token: rec?.token?.toString(),
        signnumber: rec?.signnumber,
        documentId: parseInt(docId),
        role: rec?.role,
      })),
    });
    console.log(result, "in add recpint");

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
// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
