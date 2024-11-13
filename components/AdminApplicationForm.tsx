"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ApplicationChangeFormSchema,
  ApplicationChangeFormSchemaType,
} from "@/schema/applicationConfirmation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { UpdateApplicationAdmin } from "@/app/admin/dashboard/[id]/_actions/updateApplicationAdmin";
import { toast } from "sonner";
import { Application } from "@prisma/client";

interface ApplicationFormProps {
  applicationId: string;
}

const AdminApplicationForm = ({ applicationId }: ApplicationFormProps) => {
  const router = useRouter();
  const form = useForm<ApplicationChangeFormSchemaType>({
    resolver: zodResolver(ApplicationChangeFormSchema),
  });

  const updateApplication = useMutation({
    mutationFn: UpdateApplicationAdmin,
    onMutate: () => {
      toast.loading("Updating patient application...");
    },
    onSuccess: async (data: Application) => {
      toast.dismiss();
      toast.success(`Appointment for: ${data.issue} updated`, {
        id: "update-aplication-admin",
      });
      router.push("/admin/dashboard");
      router.refresh();
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong", {
        id: "update-application-id",
      });
    },
  });

  const handleSubmit = (updateData: ApplicationChangeFormSchemaType) => {
    updateApplication.mutate({
      applicationAdminData: updateData,
      applicationId: applicationId,
    });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Status and Appointment Date Fields */}
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Change Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="booked">Booked</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Appointment Date Field */}
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please select a date for the appointment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit and Go Back Buttons */}
            <div className="flex flex-col items-center space-y-4 w-full md:w-auto self-center">
              <Button type="submit">Make Changes</Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => router.push("/admin/dashboard")}>
        Go back to dashboard
      </Button>
      </div>
      
    </div>
  );
};

export default AdminApplicationForm;
