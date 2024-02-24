import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Car } from "lucide-react";
import { OffersForm } from "../../_components/offers-form";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateOfferPage = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/login");
    }

    if (user?.role !== "ADMIN") {
        return (
            <Card className="w-[600px]">
                <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                    <Car className="mr-2 h-8 w-8 [transform:rotateY(180deg)]" />
                    Create Offer
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
                Create Offer
            </CardHeader>
            <CardContent>
                <OffersForm />
            </CardContent>
        </Card>
    );
};

export default CreateOfferPage;
