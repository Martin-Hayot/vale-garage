"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface OffersFormProps {
    Form: any;
    title: string;
    Icon: any;
}

const DashboardCard = ({ Form, title, Icon }: OffersFormProps) => {
    return (
        <Card className="dark:bg-neutral-600 bg-neutral-200 ">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                {title}
                {Icon}
            </CardHeader>
            <CardContent>
                <Form />
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
