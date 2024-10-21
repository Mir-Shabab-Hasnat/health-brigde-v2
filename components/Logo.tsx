import { Rainbow } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <a href='/' className='flex items-center gap-2'>
        <Rainbow className='stroke h-11 w-11 stroke-indigo-500 stroke=[1.5]' />
        <p className='bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>
            HealthBridge
        </p>
    </a>
  )
}

export default Logo