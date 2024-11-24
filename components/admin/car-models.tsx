import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Car } from "lucide-react";
import { CreateCarForm } from "@/components/forms/create-car-form";
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

const CarModels = async () => {
    const cars = await getCars();
    return (
        <Card className="bg-neutral-200 dark:bg-neutral-600">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                Car Models
                <Car className="ml-2 h-8 w-8 text-accent" />
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                    <div className="sm:w-96">
                        <CreateCarForm />
                    </div>
                    <div className="sm:w-96 md:flex-grow">
                        <CarsSearch
                            carsData={cars.map((car) => ({
                                ...car,
                                id: uuidv4(),
                            }))}
                            canDelete
                        />
                    </div>
                    <Toaster />
                </div>
            </CardContent>
        </Card>
    );
};

export default CarModels;
