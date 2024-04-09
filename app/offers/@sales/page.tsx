"use client";

import OffersCard from "@/components/offers/offers-card";
import OffersSkeleton from "@/components/offers/offers-skeleton";
import { useFilters } from "@/store/filters";
import { Car, CarBid } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "@uidotdev/usehooks";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

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
            const priceRange = `${filters.price.min}-${filters.price.max}`;
            const mileageRange = `${filters.mileage.min}-${filters.mileage.max}`;
            const { data } = await axios.get<CarSales[]>("/api/offers/sales", {
                params: {
                    sort: filters.sort,
                    color: filters.color,
                    body: filters.body,
                    gearbox: filters.gearbox,
                    transmission: filters.transmission,
                    state: filters.state,
                    fuel: filters.fuel,
                    price: priceRange,
                    mileage: mileageRange,
                },
            });
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
                style={{ opacity: 0 }}
                ref={dataRef}
            >
                {offers &&
                    !isPending &&
                    offers.map((offer) => (
                        <OffersCard
                            key={offer.id}
                            details={{ ...offer.car, ...offer }}
                        />
                    ))}
            </div>
        </div>
    );
};

export default SalesPage;
