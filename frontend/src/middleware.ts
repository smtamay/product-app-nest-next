import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/home/:path*"],
};
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("Middleware triggered for path:", pathname);
  const token = request.cookies.get("token")?.value || "";

  if (token) {
    try {
      console.log(token);
      const response = await fetch("http://backend:3000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("Response from auth service:", data);
      return NextResponse.next();
    } catch (error) {
      console.error("Error in middleware:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }else{
    console.log("No token found, redirecting to login");
    const loginUrl = new URL("/", request.url);
    return NextResponse.rewrite(loginUrl);
  }
}
