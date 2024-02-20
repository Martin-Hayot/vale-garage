"use client";

import { useSession } from "next-auth/react";
import { useTransition } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { settings } from "@/actions/settings";
import { Car } from "lucide-react";
import { OffersForm } from "../_components/offers-form";

const BidsPage = () => {
    const { update, data } = useSession();

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

export default BidsPage;
