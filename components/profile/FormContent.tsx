"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ToastContainer } from "react-toastify";
import { CardFooter } from "../ui/card";

interface UserProfileType extends React.HTMLAttributes<HTMLDivElement> {}

export function FormContent({ className, ...props }: UserProfileType) {
  const { username, email } = useSelector((state: RootState) => state.auth);

  const userProfile = z.object({
    email: z.string().email("This is not a valid email.").optional(),
    password: z.string().min(3).optional(),
    username: z.string().min(3).optional(),
    photo: z.any().optional(),
  });

  type userProfileSchemaType = z.infer<typeof userProfile>;
  const form = useForm<userProfileSchemaType>({
    resolver: zodResolver(userProfile),
    defaultValues: {
      email: email,
      password: "",
      username: username,
      photo: "",
    },
  });

  async function onSubmit(data: userProfileSchemaType) {
    console.log(data);
  }
  return (
    <>
      <ToastContainer />
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              {/* Photo Field */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image*</FormLabel>
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <FormControl>
                        <Input type="file" accept="image/*" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@exp.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        //   disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        //   disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <CardFooter className="flex justify-between mt-3">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Update</Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
