import { NextResponse } from "next/server";

export function middleware(request: any) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("AUTH_TOKEN")?.value;
  const isVerified = request.cookies.get("isEmailVerified")?.value ?? "yes";

  const publicPaths = ["/auth/login", "/auth/register", "/auth/account-lock","/auth/account-verify/*",'/oauth/*'];
  const isPublicPath = publicPaths.includes(pathname);

  if (token && isVerified === "no" && pathname !== "/auth/account-lock") {
    return NextResponse.redirect(
      new URL("/auth/account-lock", request.nextUrl)
    );
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/register", "/protected-route"],
};
