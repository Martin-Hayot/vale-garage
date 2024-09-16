"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SettingsForm } from "@/components/forms/settings-form";

const SettingsPage = () => {
    return (
        <div className="h-full w-full flex flex-col items-center mx-auto">
            <div className="w-full my-10 pl-10 text-3xl">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
            </div>
            <SettingsForm />
        </div>
    );
};

export default SettingsPage;
