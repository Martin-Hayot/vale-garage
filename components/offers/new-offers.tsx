import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const NewOffers = () => {
    return (
        <Carousel className="max-w-sm md:max-w-full md:w-full">
            <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/4"
                    >
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square lg:h-40 lg:w-36 xl:w-44 xl:h-48 2xl:h-64 2xl:w-64  items-center justify-center p-6">
                                    <span className="text-3xl font-semibold">
                                        {index + 1}
                                    </span>
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
