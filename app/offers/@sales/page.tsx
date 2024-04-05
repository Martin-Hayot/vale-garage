"use client";

import OffersCard from "@/components/offers/offers-card";
import OffersSkeleton from "@/components/offers/offers-skeleton";
import { useFilters } from "@/store/filters";
import { Car, CarBid } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CarSales = CarBid & { car: Car };

const SalesPage = () => {
    const { sort } = useFilters();
    const {
        data: offers,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["sales", sort],
        queryFn: async () => {
            const { data } = await axios.get<CarSales[]>("/api/offers/sales", {
                params: { sort },
            });
            return data;
        },
    });

    if (isError) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="">
            <div className="flex flex-row justify-end items-end pb-4">
                <div className="font-semibold text-2xl">
                    {offers?.length || "..."} car found
                </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
                {offers && !isPending
                    ? offers.map((offer) => (
                          <OffersCard
                              key={offer.id}
                              details={{ ...offer.car, ...offer }}
                          />
                      ))
                    : new Array(20)
                          .fill(null)
                          .map((_, index) => <OffersSkeleton key={index} />)}
            </div>
        </div>
    );
};

export default SalesPage;
