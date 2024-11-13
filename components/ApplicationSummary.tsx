import React from 'react'
import { Card } from './ui/card';

interface Props {
    pending: number;
    booked: number;
    closed: number
}

const ApplicationSummary = ({pending, booked, closed}: Props) => {
    const statuses: {
        label: string,
        value: number,
        status: string
    }[] = [
        {label: "Pending Applications", value: pending, status: "pending"},
        {label: "Booked Applications", value: booked, status: "booked"},
        {label: "Closed Applications", value: closed, status: "closed"},
    ]
  return (
    <div className='flex space-x-3'>
        {statuses.map(status => (
            <Card key={status.label} className='p-3'>
                <div className='flex flex-col gap-1'>
                    <div className='text-lg font-medium'>{status.label}</div>
                    <div className='font-bold text-xl'>
                        {status.value}
                    </div>
                </div>
            </Card>
        ))}
    </div>
  )
}

export default ApplicationSummary