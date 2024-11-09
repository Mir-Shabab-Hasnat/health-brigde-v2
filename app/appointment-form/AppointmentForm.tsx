"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema, FormSchemaType } from "@/schema/appointment";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";
import { useEffect } from "react";

// Update the schema to include new fields

interface FormProps {
  onSubmit: (data: FormSchemaType) => void;
}

const AppointmentForm = ({ onSubmit }: FormProps) => {
  const userInfo = useQuery<User>({
    queryKey: ["userInfo"],
    queryFn: () => fetch("/api/get-user-info").then((res) => res.json()),
  });

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: userInfo.data?.name,
      dateOfBirth: "",
      phoneNumber: userInfo.data?.phoneNumber || "",
      address: userInfo.data?.location || "",
      healthCardNumber: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.data?.name,
        dateOfBirth: "",
        phoneNumber: userInfo.data?.phoneNumber || "",
        address: userInfo.data?.location || "",
        healthCardNumber: "",
      });
    }
  }, [userInfo, form]);

  return (
    <>
      <div className="form-itself">
        <div className="form-pre-text">
          <h1>Fill out this form!</h1>
          <p>
            hi there, please start fill out the form, then chat with our bot,
            then submit it ✅
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your full name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date of Birth Field */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your date of birth.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Health Card Number Field */}
            <FormField
              control={form.control}
              name="healthCardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Health Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Health Card Number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Please enter your health card number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AppointmentForm;
