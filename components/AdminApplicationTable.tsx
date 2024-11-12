"use client"

import { Application } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const AdminApplicationTable = () => {
    const patientApplications = useQuery<Application[]>({
        queryKey: ["get-all-aplications"],
        queryFn: () => fetch("api/get-all-applications").then((res) => res.json())
    })

    const allApplications = patientApplications.data;
  if (allApplications) {
    console.log(allApplications[0]);
  }


  return (
    <div>AdminApplicationTable</div>
  )
}

export default AdminApplicationTable