"use client";

import AccountVerify from "@/components/auth/account-verify/index";
import { useParams } from "next/navigation";
export default function AccountVerifyHome() {
  const { token, id } = useParams();

  return <AccountVerify token={token} id={id} />;
}
