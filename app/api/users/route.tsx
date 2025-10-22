import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../prisma/client";
import schema from "./schema";

export async function POST(request: NextRequest) {
  //the name POST or GET should be capital otherwise it doesnt work at all

  const body = await request.json(); //since it return a promise
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  //the below code: a user can only have one email associated with 1 account //email is unique
  const user = await prisma.user.findUnique({
    //this is used to check if the user exist or not
    where: {
      email: body.email,
    },
  });

  if (user)
    //if the user exist we return this
    return NextResponse.json({ error: "User already exist!" }, { status: 400 });

  const newUser = await prisma.user.create({
    //this new user will be created after checking the above code
    data: {
      //here we don't pass data:body //it is because hacker might include malware in the body thats why
      name: body.name,
      email: body.email, //the other fileds are default like followers , isActive , registeredAt
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}

export async function GET(request: NextRequest) {
  //if we remove the parameter(request: NextRequest) next js will cache the data

  const users = await prisma.user.findMany(); //this will fetch all the users in the database

  return NextResponse.json(users);
}
