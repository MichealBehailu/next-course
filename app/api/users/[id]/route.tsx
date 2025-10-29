import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await params

  const user = await prisma.user.findUnique({
    where: { id: id }, //{ id: parseInt(id) },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user)
    return NextResponse.json({ error: "User not found!" }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user)
    return NextResponse.json({ error: "User doesn't exist!" }, { status: 404 });

  await prisma.user.delete({
    where: { id: id },
  });

  return NextResponse.json({}, { status: 200 });
}
