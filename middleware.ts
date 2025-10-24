export { default } from "next-auth/middleware"

export const config = { //this will be our protected route
    //?: zero or one 
    //*: zero or more
    //+: one or more
    matcher: ['/dashboard']
}