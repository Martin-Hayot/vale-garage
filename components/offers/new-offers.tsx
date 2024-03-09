import * as React from "react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/db";
import Image from "next/image";

const NewOffers = async () => {
    const offers = await db.carBid.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            car: true,
        },
        take: 10, // Limit to 10 new offers
    });

    return (
        <Carousel className="max-w-64 md:max-w-full md:w-full">
            <CarouselContent>
                {offers.map((offer, index) => (
                    <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
                    >
                        <div className="p-1">
                            <Card className="aspect-square cursor-pointer">
                                <CardHeader>
                                    <h3 className="text-lg font-semibold text-black">
                                        {offer.car.make} {offer.car.model}
                                    </h3>
                                </CardHeader>
                                <CardContent className="flex flex-col">
                                    <Image
                                        src={offer.images[0]}
                                        alt={`${offer.car.make} ${offer.car.model}`}
                                        className="w-full h-40 object-cover"
                                    />

                                    <div className="flex flex-col md:flex-row justify-between">
                                        <p className="text-lg text-black">
                                            {offer.price} €
                                        </p>
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    offer.circulationDate
                                                ).getFullYear()}{" "}
                                                - {offer.mileage} km
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {offer.fuelType} -{" "}
                                                {offer.gearBox}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
};

export default NewOffers;
