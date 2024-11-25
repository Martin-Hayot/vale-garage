"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import OffersCard from "./offers-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Car, Sales, OfferImages } from "@prisma/client";
import { useLikes } from "@/store/likes";

type CarOffer = { car: Car } & Sales & { offerImages: OfferImages[] };

interface NewOffersProps {
    offers: CarOffer[];
}

const NewOffers = ({ offers }: NewOffersProps) => {
    const boxRef = useRef(null);
    const { getLikes, likes } = useLikes();

    useEffect(() => {
        gsap.set(boxRef.current, { scaleX: 0, transformOrigin: "left" });
    }, []);

    const handleMouseEnter = () => {
        gsap.to(boxRef.current, { scaleX: 1, opacity: 1, duration: 0.8 });
    };

    const handleMouseLeave = () => {
        gsap.to(boxRef.current, { scaleX: 0, opacity: 0, duration: 0.8 });
    };

    return (
        <div>
            <div className="flex flex-row items-center justify-center lg:justify-between mb-16">
                <h2 className="text-4xl pt-10 md:pt-0 text-center font-bold text-neutral-900 dark:text-white">
                    New Offers
                </h2>
                <div
                    className="group flex flex-col"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link
                        className="hidden lg:block text-2xl font-semibold text-neutral-900 dark:text-white"
                        href={"/offers"}
                    >
                        See all offers
                        <ArrowRight className="inline ml-2" />
                    </Link>
                    <div ref={boxRef} className="h-[2px] opacity-0 bg-accent" />
                </div>
            </div>

            <Carousel className="w-[300px] md:w-[600px] lg:w-[900px] 2xl:w-[1300px]">
                <div className="flex flex-col">
                    <CarouselContent className="px-0">
                        {offers.map((offer, index: number) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-[40%] xl:basis-1/3 2xl:basis-1/4"
                            >
                                <OffersCard
                                    details={{ ...offer.car, ...offer }}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex flex-row gap-x-6 justify-center items-start mt-10">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                    </div>
                    <div className="lg:hidden flex justify-center mt-10">
                        <Button className="btn btn-primary">
                            See all offers
                        </Button>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default NewOffers;
