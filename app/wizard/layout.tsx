import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='relative flex h-screen w-full flex-col items-start justify-center'>
        {children}
    </div>
  )
}

export default layout