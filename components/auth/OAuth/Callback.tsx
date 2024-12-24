"use client";

import axios from "axios";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { userdata } from "@/redux/features/auth";

export const OAuthCallback = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams<{ provider: string }>();

  const router = useRouter();
  const dispatch = useDispatch();

  async function handleCallback() {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/oauth/${params.provider}/callback?code=${searchParams.get(
          "code"
        )}`
      );
      console.log(res.data);
      if (res.data.status === "success") {
        Cookies.set("AUTH_TOKEN", res.data.token, { expires: 7 });
        dispatch(
          userdata({
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
      router.push("/auth/login");
    }
  }

  handleCallback();

  //   useEffect(() => {
  //     handleCallback();
  //   }, []);

  return <></>;
};
