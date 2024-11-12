import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: {id: string}
}

const applicationDetails = async ({params}: Props) => {
  const application = await prisma.application.findUnique({
    where: {
      id: params.id
    }
  })

  if (!application)
    notFound()
  
  return (
    <div>
      <p>{application.issue}</p>
      <p>{application.name}</p>
      <p>{application.symptoms}</p>
    </div>
  )
}

export default applicationDetails