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
import React, { ChangeEvent, useState, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import Cookies from "js-cookie";
import { CrossIcon } from "lucide-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/image-formatter";

interface UserProfileType extends React.HTMLAttributes<HTMLDivElement> {}

type ImageData = {
  file: File;
  url: string;
  croppedUrl?: string;
};

export function FormContent({ className, ...props }: UserProfileType) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userProfile = z.object({
    content: z.string().min(1).max(1000),
  });

  type UserProfileSchemaType = z.infer<typeof userProfile>;
  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(userProfile),
    defaultValues: {},
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validImages = files.filter((file) => file.type.includes("image"));

    if (validImages.length > 0) {
      const newImages = validImages.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setImages((prev) => [...prev, ...newImages]);
    } else {
      toast.error("Please select valid image files.", {
        position: "bottom-right",
      });
    }
  };

  const removeImage = useCallback((index: number) => {
    setImages((prev) => {
      const updatedImages = [...prev];
      URL.revokeObjectURL(updatedImages[index].url);
      if (updatedImages[index].croppedUrl) {
        URL.revokeObjectURL(updatedImages[index].croppedUrl);
      }
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  }, []);

  const onCropComplete = useCallback(
    async (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropImage = useCallback(async () => {
    if (currentImageIndex === null || !croppedAreaPixels) return;

    try {
      const cropped = await getCroppedImg(
        images[currentImageIndex].url,
        croppedAreaPixels,
        0
      );
      if (cropped) {
        const croppedUrl = URL.createObjectURL(cropped);
        setImages((prev) => {
          const updatedImages = [...prev];
          updatedImages[currentImageIndex] = {
            ...updatedImages[currentImageIndex],
            file: new File(
              [cropped],
              updatedImages[currentImageIndex].file.name,
              { type: "image/jpeg" }
            ),
            croppedUrl,
          };
          return updatedImages;
        });
        setCurrentImageIndex(null);
        toast.success("Image cropped successfully.", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Failed to crop image.", { position: "bottom-right" });
    }
  }, [currentImageIndex, croppedAreaPixels, images]);

  const onSubmit = async (data: UserProfileSchemaType) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      images.forEach((image, index) =>
        formData.append(`image[${index}]`, image.file)
      );
      formData.append("caption", data.content);

      const res = await AxiosInstance.post("/post", formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("AUTH_TOKEN")}`,
        },
      });

      if (res.data.success) {
        toast.success(res.data.message, { position: "bottom-right" });
      } else {
        toast.warn(res.data.message, { position: "bottom-right" });
      }
      form.reset();
      setImages([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred.", {
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.url);
        if (image.croppedUrl) URL.revokeObjectURL(image.croppedUrl);
      });
    };
  }, [images]);

  return (
    <>
      <ToastContainer />
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div>
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      {currentImageIndex === index ? (
                        <Cropper
                          image={image.url}
                          crop={crop}
                          zoom={zoom}
                          aspect={4 / 3}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      ) : (
                        <img
                          src={image.croppedUrl || image.url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      )}
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        onClick={() => removeImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                {currentImageIndex !== null && (
                  <div className="flex justify-end mb-2">
                    <Button onClick={handleCropImage} variant="outline">
                      Crop Image
                    </Button>
                  </div>
                )}
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
                <Button variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post"}
                </Button>
              </CardFooter>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
