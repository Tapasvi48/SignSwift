// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { name, email, id, image } = await req.json();
  console.log(name, email);
  if (req.method === "POST") {
    // create user
    console.log("post");
    console.log("create user");
    const customer = await prisma.user.findUnique({
      where: { email: email },
    });
    if (customer) {
      console.log(customer);
      return NextResponse.json({
        message: "User Already Exsist in Database",
        user: customer,
        status: 201,
      });
    }

    const user = await prisma.user.create({
      data: { name: name, email: email, customerId: id, image: image },
    });
    return NextResponse.json({
      message: "User Created",
      user: user,
      status: 201,
    });
  } else {
    return NextResponse.json({
      message: "Method Not Allowed",

      status: 405,
    });
  }
}
// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
