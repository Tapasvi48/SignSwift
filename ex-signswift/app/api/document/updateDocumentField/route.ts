// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { droppedItem, id } = await req.json();
  //id ->String
  const field = {
    secondaryId: droppedItem.id.toString(),
    documentId: id,
  };
  try {
    // const document=await prisma.document.update({
    //   where: { id: id },
    //   data: { Field:droppedItem},
    // })
    const rece = await prisma.recipient.findMany({});
    console.log(rece);
    return NextResponse.json({
      message: "Document Created",

      status: 201,
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
