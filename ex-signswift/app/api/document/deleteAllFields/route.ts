// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document

export async function POST(req: NextRequest, res: NextApiResponse) {
  const resp = await req.json();
  const docId = resp.docId;

  //id ->String

  try {
    const resoo = await prisma.field.deleteMany({
      where: { documentId: parseInt(docId || "") },
    });
    console.log(resoo);

    return NextResponse.json({
      message: "All Fields Deleted Successfully",
      result: resoo,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Imnernal Server Error",
      status: 500,
    });
  }
}
// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
