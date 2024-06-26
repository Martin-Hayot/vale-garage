"use client";

import OffersCard from "@/components/offers/offers-card";
import OffersSkeleton from "@/components/offers/offers-skeleton";
import { useFilters } from "@/store/filters";
import { Car, CarBid, OfferImages } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import OffersSidebar from "@/components/offers/offers-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { useDrawer } from "@/store/drawer";
import {
    MILEAGE_OPTIONS,
    POWER_OPTIONS,
    PRICE_OPTIONS,
    YEAR_OPTIONS,
} from "@/constants/filters";
import MainBar from "@/components/offers/offers-main-bar";

type CarSales = CarBid & { car: Car } & { offerImages: OfferImages[] };

const SalesPage = () => {
    const { filters, setFilters } = useFilters();
    const searchParams = useSearchParams();
    const selectedTab = searchParams.get("tab") || "sales";
    const [tab, setTab] = useState(selectedTab);
    const router = useRouter();
    const { id } = useDrawer();

    const updateFilters = () => {
        const selectedSort = searchParams.get("sort") as
            | "newest"
            | "oldest"
            | "price_asc"
            | "price_desc"
            | undefined;
        const selectedPrice = searchParams.get("price");
        const selectedMileage = searchParams.get("mileage");
        const selectedFuels = searchParams.get("fuel");
        const selectedYear = searchParams.get("year");
        const selectedPower = searchParams.get("power");

        if (selectedSort) {
            setFilters({ sort: selectedSort });
        }
        if (selectedPrice) {
            const [min, max] = selectedPrice.split("-");
            setFilters({
                price: {
                    min: parseInt(min),
                    max: parseInt(max),
                    step: PRICE_OPTIONS.step,
                },
            });
        }
        if (selectedMileage) {
            const [min, max] = selectedMileage.split("-");
            setFilters({
                mileage: {
                    min: parseInt(min),
                    max: parseInt(max),
                    step: MILEAGE_OPTIONS.step,
                },
            });
        }
        if (selectedYear) {
            const [min, max] = selectedYear.split("-");
            setFilters({
                year: {
                    min: parseInt(min),
                    max: parseInt(max),
                    step: YEAR_OPTIONS.step,
                },
            });
        }
        if (selectedPower) {
            const [min, max] = selectedPower.split("-");
            setFilters({
                power: {
                    min: parseInt(min),
                    max: parseInt(max),
                    step: POWER_OPTIONS.step,
                },
            });
        }
        if (selectedFuels) {
            setFilters({ fuel: selectedFuels.split(",") });
        }
    };

    const updateUrl = () => {
        const priceRange = `${filters.price.min}-${filters.price.max}`;
        const mileageRange = `${filters.mileage.min}-${filters.mileage.max}`;
        const yearRange = `${filters.year.min}-${filters.year.max}`;
        const powerRange = `${filters.power.min}-${filters.power.max}`;

        router.push(
            `/offers?tab=${tab}&drawer=${id}&sort=${
                filters.sort
            }&price=${priceRange}&mileage=${mileageRange}&year=${yearRange}&power=${powerRange}&fuel=${filters.fuel.join(
                ","
            )}`,
            { scroll: false }
        );
    };

    useEffect(updateFilters, [searchParams, setFilters]);
    useEffect(updateUrl, [router, filters, tab, id]);

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
            params.status = "ACTIVE";
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

    return (
        <div>
            <MainBar tab={tab} setTab={setTab} />
            {tab === "auctions" && (
                <div className="flex justify-center text-4xl my-48">
                    Coming soon...
                </div>
            )}
            {tab === "sales" && (
                <div className="w-full flex flex-row justify-center gap-x-2 mb-64 mt-8">
                    <div>
                        <OffersSidebar />
                    </div>
                    <div className="flex flex-row justify-center items-start w-full basis-1/2">
                        <div className="w-full max-w-[1420px]">
                            <div>
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
                                            .map((_, index) => (
                                                <OffersSkeleton key={index} />
                                            ))}
                                </div>
                                {error && (
                                    <div className="flex justify-center text-4xl my-48">
                                        Error: {error.message}
                                    </div>
                                )}
                                <div
                                    className="offers-grid gap-6 mx-4"
                                    ref={dataRef}
                                >
                                    {offers &&
                                        !isPending &&
                                        offers.map((offer) => (
                                            <div
                                                className="place-self-center"
                                                key={offer.id}
                                            >
                                                <OffersCard
                                                    details={{
                                                        ...offer.car,
                                                        ...offer,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesPage;
