import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Car } from "lucide-react";
import { OffersForm } from "@/components/forms/offers-form";

const CreateOffer = () => {
    return (
        <Card className="dark:bg-neutral-700 bg-neutral-200 min-w-[300px] md:min-w-[500px]">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                Create Offer
                <Car className="ml-2 h-8 w-8 text-accent" />
            </CardHeader>
            <CardContent>
                <OffersForm />
            </CardContent>
        </Card>
    );
};

export default CreateOffer;
