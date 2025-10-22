import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";
import schema from "../schema";

// interface Props{
//     params : {id:number};
// }

export async function GET( //the name of the ffuction that is the method should be Captial otherwise it will not work
  request: NextRequest,
  { params }: { params: { id: string } } //change the data type of the id from number to string . since it is treated as a string in search param
) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id), //we need to convert it from string to number since it is string
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json(); //validate the request body
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.issues, { status: 400 });

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user)
    return NextResponse.json({ error: "User not found!" }, { status: 404 });

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: body.name,
      email: body.email, //other fields are by default default
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });

  // if (!body.name)
  //   //If invalid, return 400
  //   return NextResponse.json({ error: "Name is required" }, { status: 400 }); //like if we pass an empty string instead of the user name

  // if (params.id > 10)
  //   //Fetch the user with the given id then If doesn't exist, return 404
  //   return NextResponse.json({ error: "User not found" }, { status: 404 });

  // //Update the user
  // return NextResponse.json({ id: 1, name: body.name });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //   const body = await request.json(); //we don't need body

  const user = await prisma.user.findUnique({
    //check the user id if it exist
    where: {
      id: parseInt(params.id),
    },
  });

  if (!user)
    return NextResponse.json({ error: "User doesn't exist!" }, { status: 404 });

  const deletedUser = await prisma.user.delete({
    where: {
      id: parseInt(params.id),
    },
  });

  return NextResponse.json({}, { status: 200 }); //return NextResponse.json({message: "User deleted successfully!"}, { status: 200 }); //just return empty object to show it is deleted or use this return NextResponse.json({ message: "User successfully deleted"},{});
}
