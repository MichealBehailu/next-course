import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";


export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  //   const body = await request.json();

  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: params.id, name: "Cake" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const body = await request.json();
  const validation = schema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.issues);

  if (params.id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  return NextResponse.json({ name: body.name, price: body.price });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({});
}
