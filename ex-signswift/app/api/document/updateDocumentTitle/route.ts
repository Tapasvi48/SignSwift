// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document

export async function POST(req: NextRequest, res: NextApiResponse) {
  let { title, id, expiration, isOrder } = await req.json();
  const currentDate = new Date(expiration);
  currentDate.setHours(23, 59, 59, 999);
  expiration = currentDate.toISOString();

  console.log(title, id, expiration, isOrder, "here uwu");
  try {
    const document = await prisma.document.update({
      where: { id: parseInt(id) },
      data: { title: title, Expiration: expiration, isOrder: isOrder },
    });
    console.log(document);
    return NextResponse.json({
      message: "Document title updated",
      success: true,
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
