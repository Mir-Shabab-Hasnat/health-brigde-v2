import ApplicationChart from '@/components/ApplicationChart'
import ApplicationSummary from '@/components/ApplicationSummary'
import LatestApplications from '@/components/LatestApplications'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'

const page = async () => {
  const pendingCount = await prisma.application.count({
    where: {
      status: "pending"
    }
  })
  const bookedCount = await prisma.application.count({
    where: {
      status: "booked"
    }
  })
  const closedCount = await prisma.application.count({
    where: {
      status: "closed"
    }
  })
  
  return (
    <div className="relative h-full">
      <Image 
        src={'/Artboard.png'}
        alt="background image"
        fill
        style={{ objectFit: "cover" }} // This ensures the image covers the whole area
        className="absolute inset-0 -z-10" // Position the image behind everything else
      />
      <div className="border-b bg-card">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <p className="text-3xl font-bold">Hello, Admin!</p>
        </div>
      </div>
      <div className="container mx-auto w-full px-8 py-32">
        <div className='flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0'> {/* Flex col on small, flex row on medium screens */}
          <div className='flex flex-col space-y-4 md:w-2/5'>
            <ApplicationSummary pending={pendingCount} booked={bookedCount} closed={closedCount}/>
            <ApplicationChart pending={pendingCount} booked={bookedCount} closed={closedCount}/>
          </div>
          <div className='w-full md:w-3/5'>
            <LatestApplications />
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
