import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
  //the http method get should be all CAPITAL(GET)
  return NextResponse.json([
    //returing array of an object
    {
      id: 1,
      name: "Milk",
      price: 2.5,
    },
    {
      id: 2,
      name: "Bread",
      price: 3.5,
    },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body)

  if (!validation.success)
    return NextResponse.json(validation.error.issues);

  return NextResponse.json(
    { id: 10, name: body.name, price: body.price },
    { status: 201 }
  );
}
