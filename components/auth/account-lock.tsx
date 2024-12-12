"use client";

import Custom404 from "@/app/not-found";
import AxiosInstance from "@/lib/axiosInstance";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AccountLock = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  if (!email) return <Custom404 />;

  async function resendEmail() {
    try {
      const res = await AxiosInstance.get(`/resend-email/${email}`);
      const { success, message } = res.data;

      if (success) {
        toast.success(message, {
          position: "bottom-right",
        });
        return;
      }
      toast.warn(message || "Something went wrong!", {
        position: "bottom-right",
      });
    } catch (error: any) {
      const { response } = error;
      if (response) {
        const { status, data } = response;

        if (status === 500) {
          toast.error("Server error occurred. Please try again later.", {
            position: "bottom-right",
          });
        } else {
          toast.warn(data?.message || "An error occurred.", {
            position: "bottom-right",
          });
        }
      } else {
        toast.error("Network error. Please check your connection.", {
          position: "bottom-right",
        });
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SnapAura</h1>
            <h2 className="text-xl font-semibold text-gray-800">
              Your Account is Locked
            </h2>
            <p className="mt-2 text-gray-600">
              You have to verify your email address to use this account.
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={resendEmail}
              type="button"
              className="w-full bg-indigo-500 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Resend Verification Email
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Need help?{" "}
            <Link href="#" className="text-indigo-500 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
