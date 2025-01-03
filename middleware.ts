import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    publicRoutes,
    apiAuthPrefix,
} from "@/routes";
const { auth } = NextAuth(authConfig);

// @ts-ignore
export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiRoute = nextUrl.pathname.startsWith("/api");
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiRoute) {
        return null;
    }

    if (isApiAuthRoute) {
        return null;
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return null;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
