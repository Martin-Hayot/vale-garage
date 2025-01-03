import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
    const user = await currentUser();
    if (!user) {
        redirect("/auth/login");
    }
    return <div>{children}</div>;
};

export default ProtectedLayout;
