import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currentUser } from "@/lib/auth";
import { Car } from "lucide-react";
import { redirect } from "next/navigation";
import { CreateCarForm } from "../../_components/create-car-form";
import CarsSearch from "@/components/cars-search";
import { db } from "@/lib/db";
import { Toaster } from "@/components/ui/toaster";

const getCars = async () => {
    const cars = await db.car.findMany({
        select: {
            make: true,
            model: true,
        },
    });

    return cars;
};

const CreateCarPage = async () => {
    const user = await currentUser();
    if (!user) {
        redirect("/login");
    }

    const cars = await getCars();

    if (user?.role !== "ADMIN") {
        return (
            <Card className="w-[600px]  dark:bg-neutral-600">
                <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                    <Car className="mr-2 h-8 w-8 [transform:rotateY(180deg)]" />
                    Car Model
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
        <Card className=" md:w-[600px] w-[340px] bg-neutral-200 dark:bg-neutral-700">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                Car Models
                <Car className="ml-2 h-8 w-8 text-accent" />
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
                <CreateCarForm />

                <CarsSearch
                    carsData={cars.map((car) => ({ ...car, id: uuidv4() }))}
                    canDelete
                />
                <Toaster />
            </CardContent>
        </Card>
    );
};

export default CreateCarPage;
