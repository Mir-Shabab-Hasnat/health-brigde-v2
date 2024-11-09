"use client"

import React from 'react'
import AppointmentForm from './AppointmentForm'


function onSubmit() {
    console.log("submit")
}

const page = () => {
  return (
    <main className='two-column-layout flex min-h-screen'>
        <div className='form-container'>
            <AppointmentForm onSubmit={onSubmit}/>
        </div>
        <div className='chat-container'>
            chat contents
        </div>
    </main>
  )
}

export default page