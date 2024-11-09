"use client";

import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import ChatContainer from "./ChatContainer";
import ApiResponse from "@/schema/ApiResponse";


function onSubmit() {
  console.log("submit");
}

const page = () => {
  const [chatResponse, setChatResponse] = useState<ApiResponse | null>(null);
  return (
    <main className="two-column-layout flex min-h-screen">
      <div className="form-container">
        <AppointmentForm onSubmit={onSubmit} />
      </div>
      <div className="chat-container">
        <ChatContainer setChatResponse={setChatResponse} />
      </div>
    </main>
  );
};

export default page;
