import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
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
import { CardFooter } from "../ui/card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AxiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";
import { userdata } from "@/redux/features/auth";
import { ChangeEvent, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/image-formatter";
import { UpdateInfo } from "./update-info";

interface UserProfileType extends React.HTMLAttributes<HTMLDivElement> {}

const userProfileSchema = z.object({
  email: z.string().email("Invalid email."),
  name: z.string().min(3, "Name must be at least 3 characters."),
  username: z.string().min(3, "Username must be at least 3 characters."),
});

type UserProfileSchemaType = z.infer<typeof userProfileSchema>;

export function FormContent({ className, ...props }: UserProfileType) {
  const { username, email, profile, name } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [updateType, setUpdateType] = useState<"email" | "username" | null>(
    null
  );

  const form = useForm<UserProfileSchemaType>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: { email, username, name },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image")) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.", {
        position: "bottom-right",
      });
    }
  };

  const onCropComplete = async (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
    if (imageUrl && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          imageUrl,
          croppedAreaPixels,
          0
        );
        setImage(croppedImage);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  const onSubmit = async (data: UserProfileSchemaType) => {
    try {
      const authToken = Cookies.get("AUTH_TOKEN");
      const headers = { Authorization: `Bearer ${authToken}` };

      if (data.email !== email || data.username !== username) {
        const updateField = data.email !== email ? "email" : "username";
        const otpmail = updateField === "email" ? data.email : email;

        setUpdateType(updateField);
        setIsModalOpen(true);

        await AxiosInstance.get(`/user/send/otp/${otpmail}`, {
          headers,
        });

        return;
      }

      const formData = new FormData();
      if (image) formData.append("profile", image);
      formData.append("name", data.name || "");

      const response = await AxiosInstance.post(
        "/user/update/profile?_method=PUT",
        formData,
        { headers }
      );

      const { status, message, data: userData } = response.data;

      if (status) {
        const { username, email, profile, name } = userData;

        dispatch(
          userdata({
            isAuthenticated: true,
            username,
            email,
            profile,
            name,
          })
        );

        form.reset({ email, username, name });
        setImage(null);
        setImageUrl(null);
        toast.success(message, { position: "bottom-right" });
      } else {
        toast.warn(message, { position: "bottom-right" });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast.error(errorMessage, { position: "bottom-right" });
    }
  };

  const handleOTPVerification = async () => {
    try {
      const authToken = Cookies.get("AUTH_TOKEN");
      if (!authToken) throw new Error("Authorization token is missing.");

      const headers = { Authorization: `Bearer ${authToken}` };
      const updateField =
        form.getValues("email") !== email ? "email" : "username";
      const updatedValue = form.getValues(updateField);

      setIsModalOpen(false);

      const response = await AxiosInstance.post(
        `/user/verify/otp`,
        {
          field: updateField,
          [updateField]: updatedValue,
          otp,
        },
        { headers }
      );
      const { status, message, data: userData } = response.data;

      if (status === "success") {
        const { username, email, profile, name } = userData;

        dispatch(
          userdata({
            isAuthenticated: true,
            username,
            email,
            profile,
            name,
          })
        );
      }

      setOtp("");
      setUpdateType(null);
      toast.success(message, { position: "bottom-right" });
    } catch (error: any) {
      const { status, message } = error.response?.data;
      console.log(message ?? "ss");
      if (status === "error") {
        toast.error(message.username[0] ?? message.email[0], {
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              {/* Profile Image Field */}
              <div className="flex flex-col md:flex-row gap-2">
                <Avatar>
                  <AvatarImage
                    src={profile || "https://github.com/shadcn.png"}
                    alt="Profile"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </FormControl>
              </div>

              {image && (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-64 h-64">
                    <Cropper
                      image={imageUrl!}
                      crop={crop}
                      zoom={zoom}
                      aspect={4 / 3}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                    />
                  </div>
                </div>
              )}

              <div>
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@mail.com"
                          {...field}
                          // disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("email") !== email && (
                  <div className="flex justify-end mt-2">
                    {/* <UpdateInfo field="email" email={form.watch("email")} /> */}
                  </div>
                )}
              </div>

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username*</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Username"
                          {...field}
                          // disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("username") !== username && (
                  <div className="flex justify-end mt-2">
                    {/* <UpdateInfo field="username" email={email} /> */}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <CardFooter className="flex justify-between mt-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    form.reset({ email, username, name });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Update</Button>
              </CardFooter>
            </div>
          </form>
        </Form>

        <UpdateInfo
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          otp={otp}
          setOtp={setOtp}
          onVerify={handleOTPVerification}
          updateType={updateType}
        />
      </div>
    </>
  );
}
