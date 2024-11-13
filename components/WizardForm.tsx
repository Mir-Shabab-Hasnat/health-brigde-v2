"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { User } from "@prisma/client";

import { UpdateUserInfo } from "@/app/wizard/_actions/userInfo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

const formSchema = z.object({
  phoneNumber: z
    .string()
    .nonempty("Phone number is required")
    .regex(phoneNumberRegex)
    .min(10),
  location: z.string().nonempty("location is required"),
  dateOfBirth: z.string(),
});

const WizardForm = () => {
  //const [phoneNumber, setPhoneNumber] = useState<string | null>(null)
  const router = useRouter();

  const userInfo = useQuery<User>({
    queryKey: ["create-userInfo"],
    queryFn: () => fetch("/api/user-info").then((res) => res.json()),
  });

  //console.log("@@@ USER INFO", userInfo)

  const mutation = useMutation({
    mutationFn: UpdateUserInfo,
    onMutate: () => {
      toast.loading("Updating user info...");
    },
    onSuccess: () => {
      // Handle success, e.g., show a success message or refetch user info
      toast.dismiss();
      toast.success("User info updated successfully");
      router.push("/");
    },
    onError: (error) => {
      // Handle error, e.g., show an error message
      toast.dismiss();
      toast.error("Error updating user info:" + error);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      location: "",
      dateOfBirth: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(typeof data.dateOfBirth);
    mutation.mutate(data);
  };
  return (
    <SkeletonWrapper isLoading={userInfo.isFetching}>
      <div className="mt-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            {/* Date of Birth Field */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="date" {...field} />
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
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Your location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </SkeletonWrapper>
  );
};

export default WizardForm;
