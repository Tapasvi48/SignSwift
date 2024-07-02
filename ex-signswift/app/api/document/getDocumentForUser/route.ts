// We impot our prisma client
import prisma from "../../../../lib/prisma";
// Prisma will help handle and catch errors
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { userId, email, date } = await req.json();
  console.log(userId, email, "email  for getting the filessss");

  //all docs of craeted user where user is not the signer

  //all drafts  ->from users

  try {
    const document1 = await prisma.document.findMany({
      where: {
        AND: [
          {
            userId: userId,
          },
          {
            NOT: {
              Recipient: {
                some: {
                  email: {
                    equals: email,
                  },
                },
              },
            },
          },

          {
            Active: true,
          },
        ],
      },
    });

    //draft->can edit those docs  //pending->cant do anthying on these
    // dont want those in which he is a  signer

    //return docs with status pending and user is the recepient

    //get all doc that user has to sign
    const document2 = await prisma.document.findMany({
      where: {
        AND: [
          {
            Recipient: {
              some: {
                email: {
                  equals: email,
                },
              },
            },
          },
        ],
      },
      include: {
        Recipient: true,
      },
    });

    // console.log(document1, "document 1 are");
    // console.log(document2, "document 2 are");
    // documents-> that user has to sign
    //document2->user has to sign
    const modifiedDocument2 = document2.map((doc) => {
      if (doc.status === "PENDING") {
        return { ...doc, status: "SIGN" };
      }
      return doc;
    });

    const documentsWithStatus = [
      ...modifiedDocument2?.map((doc) => ({ ...doc })),
      ...document1?.map((doc) => ({ ...doc })),
    ];
    // signer-> last user->completed

    return NextResponse.json({
      message: "Document",
      Document: documentsWithStatus,
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
