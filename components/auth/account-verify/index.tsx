"use client";

import AxiosInstance from "@/lib/axiosInstance";
import Cookies from "js-cookie";

const AccountVerify = (props: {
  token: string | string[] | undefined;
  id: string | string[] | undefined;
}) => {
  async function verifyEmail() {
    try {
      const res = await AxiosInstance.get(
        `/verify/email/${props.id}/${props.token}`
      );

      if (res.data.success) {
        Cookies.set("isEmailVerified", "yes", { expires: 1 });
        alert(res.data.message);
      }
    } catch (err: any) {
      if (err.response.status === 500) {
        Cookies.remove("isEmailVerified");
        alert(err.response.data.message);
      }
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Email Verification</h1>
          <p className="text-[15px] text-slate-500">
            Press the button below to verify your email
          </p>
        </header>
        <div>
          <button
            onClick={verifyEmail}
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded"
          >
            Verify Email
          </button>
        </div>
        <div className="text-sm text-slate-500 mt-4">
          Didn't receive code?{" "}
          <a
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="#0"
          >
            Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountVerify;
