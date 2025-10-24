import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import { prisma } from "../../../prisma/client";
import bcrypt from 'bcrypt'
const schema =z.object({
    email : z.string().email({ message: "Invalid email address" }),
    password : z.string().min(5, { message: "Password must be at least 5 characters long" })
})

export async function POST(request:NextRequest){
    const body = await request.json();
    const validation = schema.safeParse(body);

    if(!validation.success) 
        return NextResponse.json(validation.error.flatten().fieldErrors, {status : 400})

    const user = await prisma.user.findUnique({
        where : {email : body.email}
    })

    if(user)
        return NextResponse.json({error: 'User already exist'},{status : 400})

    const hashedpassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
        data : {
            email : body.email,
            hashedpassword
        }
    })

    return NextResponse.json({email : newUser.email});
}