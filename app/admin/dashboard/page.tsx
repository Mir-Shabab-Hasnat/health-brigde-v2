import AdminApplicationTable from '@/components/AdminApplicationTable'
import React from 'react'

const page = () => {
  return (
    <div className="h-full bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <p className="text-3xl font-bold">Hello, Admin!</p>
        </div>
      </div>
      <div className="container mx-auto w-full gap-6 px-8 py-8">
        <AdminApplicationTable />
      </div>
    </div>
  )
}

export default page