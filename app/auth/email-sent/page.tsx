"use client";

import Custom404 from "@/app/not-found";
import { EmailSent } from "@/components/auth/email-send";
import { useSearchParams } from "next/navigation";

export default function AccountLockHome() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const ttl = searchParams.get("ttl");
  if (!email) return <Custom404 />;
  if (!ttl) return <Custom404 />;

  const data = {
    email: email!,
    ttl: ttl!,
  };

  return <EmailSent params={data} />;
}
