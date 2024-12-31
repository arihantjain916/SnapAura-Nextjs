"use client";

import { useParams, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { userdata } from "@/redux/features/auth";
import AxiosInstance from "@/lib/axiosInstance";

export const OAuthCallback = () => {
  const searchParams = useSearchParams();
  const params = useParams<{ provider: string }>();

  const router = useRouter();
  const dispatch = useDispatch();

  async function handleCallback() {
    try {
      const res = await AxiosInstance.get(
        `/oauth/${params.provider}/callback?code=${searchParams.get("code")}`
      );
      if (res.data.status === "success") {
        Cookies.set("AUTH_TOKEN", res.data.token, { expires: 7 });
        dispatch(
          userdata({
            id:res.data.data.id,
            isAuthenticated: true,
            username: res.data.data.username,
            email: res.data.data.email,
            name: res.data.data.name ?? "",
            profile: res.data.data.profile ?? null,
          })
        );
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      router.push("/auth/login");
    }
  }

  handleCallback();

  //   useEffect(() => {
  //     handleCallback();
  //   }, []);

  return <></>;
};
