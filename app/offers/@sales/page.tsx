"use client";

import OffersCard from "@/components/offers/offers-card";
import OffersList from "@/components/offers/offers-list";
import OffersSidebar from "@/components/offers/offers-sidebar";
import OffersSkeleton from "@/components/offers/offers-skeleton";
import { Car, CarBid } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type CarSales = CarBid & { car: Car };

const SalesPage = () => {
    const { data: offers } = useQuery({
        queryKey: ["sales"],
        queryFn: async () => {
            const { data } = await axios.get<CarSales[]>("/api/offers/sales");
            return data;
        },
    });

    console.log(offers);

    return (
        <div className="flex flex-row">
            <div className="">
                <OffersList>
                    {offers
                        ? offers.map((offer) => (
                              <OffersCard
                                  key={offer.id}
                                  details={{ ...offer.car, ...offer }}
                              />
                          ))
                        : new Array(20)
                              .fill(null)
                              .map((_, index) => (
                                  <OffersSkeleton key={index} />
                              ))}
                </OffersList>
            </div>
        </div>
    );
};

export default SalesPage;
