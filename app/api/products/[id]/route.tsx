// @ts-nocheck
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";
import { id } from "zod/locales";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //   const body = await request.json();

  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 404 }
    );

  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.issues);

  const product = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!product)
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 404 }
    );

  const updatedProduct = await prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(updatedProduct, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    //if product doesnt exist
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 404 }
    );

  await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({}, { status: 200 }); //return NextResponse.json({message : "Product sccessfully deleted"}, {status : 200})
}
