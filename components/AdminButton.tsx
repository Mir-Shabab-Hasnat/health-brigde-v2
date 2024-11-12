"use client"

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'



const AdminButton = () => {
    const router = useRouter()
  return (
    <div className='p-3'>
        <Button 
        variant="ghost"
        onClick={() => (
            router.push("/admin/dashboard")
        )}
        >
            Admin
        </Button>
    </div>
  )
}

export default AdminButton