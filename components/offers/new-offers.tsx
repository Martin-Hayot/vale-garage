"use client";

import { motion } from "framer-motion";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import OffersCard from "./offers-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Car, Sales, OfferImages } from "@prisma/client";

type CarOffer = { car: Car } & Sales & { offerImages: OfferImages[] };

interface NewOffersProps {
    offers: CarOffer[];
}

const NewOffers = ({ offers }: NewOffersProps) => {
    return (
        <div>
            <div className="flex flex-row items-center justify-center lg:justify-between mb-16">
                <h2 className="text-4xl pt-10 md:pt-0 text-center font-bold text-neutral-900 dark:text-white">
                    New Offers
                </h2>
                <motion.div
                    className="group flex flex-col"
                    initial={{ opacity: 1 }}
                    whileHover="hover"
                >
                    <Link
                        className="hidden lg:block text-2xl font-semibold text-neutral-900 dark:text-white"
                        href={"/offers"}
                    >
                        See all offers
                        <ArrowRight className="inline ml-2" />
                    </Link>
                    <motion.div
                        className="h-[2px] bg-accent"
                        initial={{ width: 0, opacity: 0 }}
                        variants={{
                            hover: { width: "100%", opacity: 1 },
                        }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>
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
                </div>
            </Carousel>

            <div className="flex lg:hidden flex-row items-center justify-center lg:justify-between mt-16">
                <motion.div
                    className="group flex flex-col"
                    initial={{ opacity: 1 }}
                    whileHover="hover"
                >
                    <Link
                        className="lg:hidden text-2xl font-semibold text-neutral-900 dark:text-white"
                        href={"/offers"}
                    >
                        See all offers
                        <ArrowRight className="inline ml-2" />
                    </Link>
                    <motion.div
                        className="h-[2px] bg-accent"
                        initial={{ width: 0, opacity: 0 }}
                        variants={{
                            hover: { width: "100%", opacity: 1 },
                        }}
                        transition={{ duration: 0.8 }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default NewOffers;
