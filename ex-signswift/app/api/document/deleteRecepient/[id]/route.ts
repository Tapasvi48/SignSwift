// We impot our prisma client
import prisma from "../../../../../lib/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

//update title of document


export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
  try{
    
    const res=await prisma.recipient.delete({
      where:{id:parseInt(params.id)}
    })
    return NextResponse.json({
      message: "Recepient deted Successfully",
      status: 200,
      success:true,
    });
  }
  catch(error){
return NextResponse.json({
  message:"Imnernal Server Error",
  status: 500,
})
  }

    
  
}
