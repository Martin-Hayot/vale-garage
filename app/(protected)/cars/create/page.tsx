import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { Car } from "lucide-react";
import { redirect } from "next/navigation";
import { CreateCarForm } from "../../_components/create-car-form";

const CreateCarPage = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/login");
    }

    if (user?.role !== "ADMIN") {
        return (
            <Card className="w-[600px]">
                <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                    <Car className="mr-2 h-8 w-8 [transform:rotateY(180deg)]" />
                    Create Car Model
                </CardHeader>
                <CardContent>
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">
                            You are not authorized to access this page
                        </h1>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-[600px]">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                <Car className="mr-2 h-8 w-8 [transform:rotateY(180deg)]" />
                Create Car Model
            </CardHeader>
            <CardContent>
                <CreateCarForm />
            </CardContent>
        </Card>
    );
};

export default CreateCarPage;
