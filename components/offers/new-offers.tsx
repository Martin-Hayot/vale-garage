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
import { Button } from "../ui/button";

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
        <>
            <Carousel className="w-full 2xl:max-w-[120em]">
                <CarouselContent>
                    {offers.map((offer, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                        >
                            <div className="pt-4 py-3 bg-neutral-50 rounded-md cursor-pointer">
                                <h3 className="text-lg font-semibold text-black px-6 pb-4">
                                    {offer.car.make} {offer.car.model}
                                </h3>

                                <Image
                                    src="/car-placeholder.jpg"
                                    width={400}
                                    height={400}
                                    alt={`${offer.car.make} ${offer.car.model}`}
                                    className="w-full object-contain"
                                />

                                <div className="flex flex-row justify-between px-6 pt-4">
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
                                            {offer.fuelType} - {offer.gearBox}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                <div className="flex justify-center mt-10">
                    <Button className="btn btn-primary">See all offers</Button>
                </div>
            </Carousel>
        </>
    );
};

export default NewOffers;
