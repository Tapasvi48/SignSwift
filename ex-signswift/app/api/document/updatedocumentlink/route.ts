// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { link, id } = await req.json();

  try {
    const document = await prisma.document.update({
      where: { id: parseInt(id) },
      data: { ShareLink: link },
    });
    console.log(document);
    return NextResponse.json({
      message: "Document link updated",
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
