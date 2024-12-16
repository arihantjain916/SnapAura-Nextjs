"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CardFooter } from "@/components/ui/card";
import { ToastContainer, toast } from "react-toastify";
import AxiosInstance from "@/lib/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import React, { ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import { CrossIcon } from "lucide-react";

interface UserProfileType extends React.HTMLAttributes<HTMLDivElement> {}

export function FormContent({ className, ...props }: UserProfileType) {
  const [images, setImages] = React.useState<File[]>([]);
  const [imageUrls, setImageUrls] = React.useState<string[]>([]);

  const userProfile = z.object({
    content: z.string().min(1).max(1000),
  });

  type userProfileSchemaType = z.infer<typeof userProfile>;
  const form = useForm<userProfileSchemaType>({
    resolver: zodResolver(userProfile),
    defaultValues: {},
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validImages = files.filter((file) => file.type.includes("image"));

    if (validImages.length > 0) {
      const urls = validImages.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...validImages]);
      setImageUrls((prev) => [...prev, ...urls]);
    } else {
      alert("Please select valid image files.");
    }
  };

  async function onSubmit(data: userProfileSchemaType) {
    try {
      const formData = new FormData();

      images.forEach((image, index) => {
        formData.append(`image[${index}]`, image);
      });
      formData.append("caption", data.content);

      const res = await AxiosInstance.post("/post", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.warn(res.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      } else {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      }
    }
    form.reset();
    setImages([]);
    setImageUrls([]);
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <ToastContainer />
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div>
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt="" className="w-full h-auto" />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        <CrossIcon />
                      </button>
                    </div>
                  ))}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
              </div>
              {/* Post Content Field */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What's on your mind?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <CardFooter className="flex justify-between mt-3">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Post</Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
