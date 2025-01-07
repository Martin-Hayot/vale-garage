"use client";

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Socials = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    };

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />{" "}
                <span className="ml-2">Google</span>
            </Button>
        </div>
    );
};
