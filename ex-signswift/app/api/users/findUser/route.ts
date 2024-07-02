// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { email } = await req.json();

  if (req.method === "POST") {
    // create user
    console.log("post");
    console.log("create user");
    const customer = await prisma.user.findUnique({
      where: { email: email },
    });
    if (customer) {
      console.log(customer, "dev2222");
      return NextResponse.json({
        message: "User Already Exsist in Database",
        user: customer,
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "User Doesnt exist in db",
        user: customer,
        status: 500,
      });
    }
  }
}

// We hash the user entered password using crypto.js

// function to create user in our database
async function createUserHandler(req: NextApiRequest, res: NextApiResponse) {
  let errors = [];
}
