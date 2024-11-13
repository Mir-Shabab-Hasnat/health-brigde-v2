"use client";

import React, { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import ChatContainer from "./ChatContainer";
import ApiResponse from "@/schema/ApiResponse";
import { FormSchemaType } from "@/schema/appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAplication } from "./_actions/application";
import { Application } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AppointmentFormPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: CreateAplication,
    onMutate: () => {
      toast.loading("Creating your application")
    },
    onSuccess: async (data: Application) => {
      toast.dismiss()
      toast.success(
        `Application for Appointment for: ${data.issue} by ${data.name}`,
        {
          id: "create-aplication",
        }
      );

      await queryClient.invalidateQueries({
        queryKey: ["userInfo"],
      });

      
      router.push("/")
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: "create-application",
      });
    },
  });

  const onSubmit = (formData: FormSchemaType) => {
    if (chatResponse) {
      toast.loading("Creating application for your appointment", {
        id: "create-category",
      });

      mutate({ formData, patientAnalysis: chatResponse });
    }
    else {
      toast.error("Chat response not available")
    }
  };

  const [chatResponse, setChatResponse] = useState<ApiResponse | null>(null);
  console.log(chatResponse);
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

export default AppointmentFormPage;
