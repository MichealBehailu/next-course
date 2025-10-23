import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";

export async function GET(request: NextRequest) {//the http method get should be all CAPITAL(GET)
  
  const user = await prisma.product.findMany();
  
  return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.issues);

  //we dont want the same product to be posted //the name should be unique 
  const product = await prisma.product.findUnique({
    where : {name: body.name}
  })

  if(product)
    return NextResponse.json({error : "Product already exist!"}, {status : 400});

  const newProduct = await prisma.product.create({
    data : {
      name: body.name,
      price : body.price
    }
  })

  return NextResponse.json(newProduct,{ status: 201 }
  );
}
