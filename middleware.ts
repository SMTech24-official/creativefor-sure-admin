import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {jwtDecode} from "jwt-decode"; // Ensure proper import for jwt-decode

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Retrieve token from cookies

  // Decode the token if it exists
  let decodedData = null;
  if (token) {
    try {
      decodedData = jwtDecode<{ role: string }>(token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const isLoggedIn = !!decodedData;

  // Prevent logged-in users from accessing the login route
  if (request.nextUrl.pathname === "/login" && isLoggedIn) {
    const homeUrl = new URL("/", request.url); // Redirect to homepage or dashboard
    return NextResponse.redirect(homeUrl);
  }

  // Redirect unauthenticated users away from protected routes
  if (!isLoggedIn && request.nextUrl.pathname !== "/login") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to the requested route
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"], // Match all routes except static files
};
