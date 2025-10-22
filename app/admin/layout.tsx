//this custome layout applies to only the admin unlike the root layout which applies to all
import React from 'react'
import { ReactNode } from 'react'

interface Props{
    children : ReactNode;
}

const layout = ({children}:Props) => {
  return (
    <div className='flex'>
        <aside className='bg-slate-500 mr-5 p-5' >Admin Side</aside>
        <div>{children}</div>
    </div>
  )
}

export default layout