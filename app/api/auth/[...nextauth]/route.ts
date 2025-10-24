import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../../prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { email } from "zod";


export const authOptions :NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers : [
        CredentialsProvider({
            name :  "Credentials",
            credentials : {
                email : {label: 'Email', type:'email',placeholder:'Email'},
                password : {label: 'Password', type:'password',placeholder:'password'},
            },
            async authorize(credentials,req){
                if(!credentials?.email || !credentials.password) return null; //throws here i think to let the user to check their details

                const user = await prisma.user.findUnique({  //here we are checking if the user exist in our database that match the provided email 
                    where : {email : credentials.email}
                })

                if(!user) return null //checking the user

                const passwordsMatch = await bcrypt.compare(credentials.password,user.hashedpassword!) //we are definitly sure that the user has a password //and checking if the provided password matches with the one that is provided
                
                return passwordsMatch ? user : null //if true we are returning the user if not null



            }
        }),
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID!, //! <-- to avoid the ts error which we are telling it we have definitly have a value
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    session : {
        strategy : "jwt"
    },

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
