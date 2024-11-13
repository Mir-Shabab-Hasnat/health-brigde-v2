"use client"

import { PrismaPromise } from '@prisma/client';
import React from 'react'
import { Card } from './ui/card';
import {ResponsiveContainer, BarChart, XAxis, YAxis, Bar} from "recharts"

interface Props {
    pending: number;
    booked: number;
    closed: number
}

const ApplicationChart = ({pending, booked, closed}: Props) => {
    const data = [
        {label: "Pending", value: pending},
        {label: "Booked", value: booked},
        {label: "Closed", value: closed},
    ]
  return (
    <Card className='p-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="label" />
                <YAxis/>
                <Bar dataKey="value" barSize={60} style={{fill: "indigo"}}/>
            </BarChart>
        </ResponsiveContainer>
    </Card>
  )
}

export default ApplicationChart