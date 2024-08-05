import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./navigation";

const intlMiddleware = createIntlMiddleware({
  // A list of all locales that are supported
  locales,
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
  // If always, the locale will be set in the URL (e.g. `/en/about`)
  localePrefix: "always",
  // If true, the locale will be detected from the browser (e.g. `/en/about`)
  localeDetection: true,
});

const authMiddleware = withAuth(
  function onSuccess(request: NextRequest) {
    return intlMiddleware(request);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token !== null;
      },
    },
    pages: {
      signIn: `/en/login`,
    },
  }
);

export function middleware(request: NextRequest) {
  // Step 1: Use the incoming request
  const defaultLocale = request.headers.get("x-default-locale") || "en";

  // Step 2: Create and call the next-intl middleware

  const response = intlMiddleware(request);

  // Step 3: Alter the response
  response.headers.set("x-default-locale", defaultLocale);

  const routePath = request.nextUrl.pathname.split("/")[2];

  if (["order", "cart", "favourites", "checkout"].includes(routePath))
    return authMiddleware(request as NextRequestWithAuth, {} as NextFetchEvent);

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/login",
    "/signup",
    "/password-reset",
    "/email-confirmed",
  ],
};
