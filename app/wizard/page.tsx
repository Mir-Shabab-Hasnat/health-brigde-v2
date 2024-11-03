import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

export const page = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in")
    }

  return (
    <div className='container flex max-w-2xl flex-col items-center justify-between gap-4'>

    </div>
  )
}
