import { Dashboard } from "@/components/admin/dashboard";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminDashboardPage = async () => {
    const user = await currentUser();

    if (!user || user.role !== "ADMIN") {
        return redirect("/login");
    }

    return <Dashboard />;
};

export default AdminDashboardPage;
