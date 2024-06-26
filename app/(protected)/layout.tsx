import { currentUser } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    const user = await currentUser();
    if (!user) {
        redirect("/auth/login");
    }
    return (
        <div className="h-full w-full flex flex-col items-center mx-auto">
            <div className=" w-full my-10 pl-10 text-3xl">
                <Link href={"/"}>
                    <ArrowLeft />
                </Link>
            </div>
            {children}
        </div>
    );
};

export default ProtectedLayout;
