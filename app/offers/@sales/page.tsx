"use client";

import OffersCard from "@/components/offers/offers-card";
import OffersSkeleton from "@/components/offers/offers-skeleton";
import { useFilters } from "@/store/filters";
import { Car, CarBid } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import OffersDrawer from "@/components/offers/offers-drawer";

type CarSales = CarBid & { car: Car };

const SalesPage = () => {
    const { filters, sort } = useFilters();
    const searchParams = useDebounce(filters, 400);
    const {
        data: offers,
        refetch,
        isPending,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["sales", searchParams],
        queryFn: async () => {
            console.log(window.location.href);
            const { data } = await axios.get<CarSales[]>("/api/offers/sales");
            setTimeout(() => {}, 1000);
            return data;
        },
    });

    const skeletonRef = useRef(null);
    const dataRef = useRef(null);

    useEffect(() => {
        if (!isPending && !isLoading) {
            gsap.to(skeletonRef.current, { opacity: 0, duration: 1 });
            gsap.fromTo(
                dataRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1 }
            );
        } else {
            gsap.to(skeletonRef.current, { opacity: 1, duration: 1 });
            gsap.to(dataRef.current, { opacity: 0, duration: 1 });
        }
    }, [offers, isPending, isLoading]);

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="">
            <div className="flex flex-row justify-end items-end pb-4">
                <div className="font-semibold text-2xl">
                    {offers?.length || "..."} cars found
                </div>
            </div>
            <div
                className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10"
                style={{ opacity: 1 }}
                ref={skeletonRef}
            >
                {isPending &&
                    new Array(12)
                        .fill(null)
                        .map((_, index) => <OffersSkeleton key={index} />)}
            </div>
            <div
                className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10"
                style={{ display: isLoading ? "none" : "grid" }}
                ref={dataRef}
            >
                {offers &&
                    !isPending &&
                    offers.map((offer) => (
                        <OffersDrawer
                            details={{ ...offer.car, ...offer }}
                            key={offer.id}
                        >
                            <OffersCard details={{ ...offer.car, ...offer }} />
                        </OffersDrawer>
                    ))}
            </div>
        </div>
    );
};

export default SalesPage;
