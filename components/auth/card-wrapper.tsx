"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import { Header } from "./header";
import { Socials } from "./socials";
import { BackButton } from "./back-button";
import Link from "next/link";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocials?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonHref,
    backButtonLabel,
    showSocials,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md bg-neutral-300 dark:bg-foreground">
            <CardHeader>
                <Link href={"/"}>
                    <Header label={headerLabel} />
                </Link>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocials && (
                <CardFooter>
                    <Socials />
                </CardFooter>
            )}
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
