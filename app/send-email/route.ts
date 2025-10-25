//it is not good to create endpoint for this 
//this page typically handled like in business logic like to send order verfication
import {Resend} from 'resend'
import WelcomeTemplate from '@/emails/WelcomeTemplate'
import { NextResponse } from 'next/server'
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(){
    await resend.emails.send({
        from: '...',
        to : 'mikethegoat007@gmail.com',
        subject : '...',
        react : WelcomeTemplate({name : 'Mike'})

    })

    return NextResponse.json({})
}
