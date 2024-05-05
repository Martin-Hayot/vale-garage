"use client";

import OffersCard from "@/components/offers/offers-card";
import OffersSkeleton from "@/components/offers/offers-skeleton";
import { useFilters } from "@/store/filters";
import { Car, CarBid } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { gsap } from "gsap";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";

type CarSales = CarBid & { car: Car };

const SalesPage = () => {
    const { filters } = useFilters();
    const url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);

    // remove drawer search param from url because it causes a re-render
    searchParams.delete("drawer");

    const {
        data: offers,
        isPending,
        isLoading,
        error,
    } = useQuery<CarSales[], AxiosError>({
        queryKey: ["sales", searchParams.toString()],
        queryFn: async () => {
            const url = new URL(window.location.href);
            const searchParams = new URLSearchParams(url.search);
            const params = Object.fromEntries(searchParams);
            const { data } = await axios.get<CarSales[]>("/api/offers/sales", {
                params,
            });
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
    }, [offers, isLoading, isPending]);

    if (error) {
        return (
            <div className="text-4xl mt-10 font-semibold pl-14">
                {(error.response?.data as string)?.toString()}...
            </div>
        );
    }

    return (
        <div className="mt-5">
            <div className="flex flex-row justify-end items-end pb-4 pr-8">
                <div className="font-semibold text-2xl">
                    {offers?.length || "..."} cars found
                </div>
            </div>
            <div
                className="offers-grid gap-6 mx-4"
                style={{ opacity: 1 }}
                ref={skeletonRef}
            >
                {isPending &&
                    new Array(12)
                        .fill(null)
                        .map((_, index) => <OffersSkeleton key={index} />)}
            </div>
            <div className="offers-grid gap-6 mx-4" ref={dataRef}>
                {offers &&
                    !isPending &&
                    offers.map((offer) => (
                        <div className="place-self-center" key={offer.id}>
                            <OffersCard details={{ ...offer.car, ...offer }} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SalesPage;
