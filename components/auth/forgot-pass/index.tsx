import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import AxiosInstance from "@/lib/axiosInstance";

export const ForgotPassword = () => {
  const ForgotPass = z.object({
    email: z.string().email("This is not a valid email."),
    password: z.string().min(3),
  });

  type ForgotPassType = z.infer<typeof ForgotPass>;
  const forgotPasswordForm = useForm<ForgotPassType>({
    resolver: zodResolver(ForgotPass),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onFormSubmit(data: ForgotPassType) {
    try {
      const res = await AxiosInstance.post(
        "/user/reset/password?_method=PUT",
        data
      );
      if (res.data.status === "success") {
        toast.success(res.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error: any) {
      if (error.response.status === 422) {
        toast.warn(error.response.data.message, {
          position: "bottom-right",
        });
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <Dialog>
        <DialogTrigger>Forgot Password</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="w-full rounded-lg p-6 shadow sm:max-w-md sm:p-8 md:mt-0">
              <DialogTitle className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Forgot Password
              </DialogTitle>

              <p className="font-light text-gray-500 dark:text-gray-400">
                Don't fret! Just type in your email and password!
              </p>
              <Form {...forgotPasswordForm}>
                <form className="mt-4 space-y-4 md:space-y-5 lg:mt-5">
                  <div>
                    <FormField
                      control={forgotPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email*</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="m@exp.com"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={forgotPasswordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password*</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder=""
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    onClick={forgotPasswordForm.handleSubmit(onFormSubmit)}
                    type="button"
                    className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  >
                    Reset password
                  </Button>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
