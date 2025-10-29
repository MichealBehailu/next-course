import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { prisma } from "@/prisma/client";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
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
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product)
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 404 }
    );

  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(updatedProduct, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product)
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 404 }
    );

  await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json({}, { status: 200 });
}
