"use client";

import OffersSidebar from "@/components/offers/offers-sidebar";
import SortDropdown from "@/components/offers/sort-dropdown";
import {
    MILEAGE_OPTIONS,
    POWER_OPTIONS,
    PRICE_OPTIONS,
    YEAR_OPTIONS,
} from "@/constants/filters";
import { cn } from "@/lib/utils";
import { useDrawer } from "@/store/drawer";
import { useFilters } from "@/store/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

const TabButton = ({
    tab,
    currentTab,
    setTab,
    label,
}: {
    tab: string;
    currentTab: string;
    setTab: (tab: string) => void;
    label: string;
}) => (
    <div
        className={cn(
            "dark:text-white/50 min-w-24  cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
            currentTab === tab && "bg-blue-600/90  text-white dark:text-white"
        )}
        onClick={() => setTab(tab)}
    >
        {label}
    </div>
);

const OffersLayout = ({
    sales,
    auctions,
}: {
    children: ReactNode;
    sales: ReactNode;
    auctions: ReactNode;
}) => {
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

    return (
        <div className="w-full h-full mt-[82px]">
            <div className="flex flex-row justify-center gap-x-6 border-b dark:bg-neutral-900 dark:border-neutral-800 py-3 px-4">
                <div className="dark:bg-neutral-800 bg-white inline-flex h-[2.8rem] items-center justify-center rounded-md bg-muted p-1 text-muted-foreground border dark:border-none">
                    <TabButton
                        tab="sales"
                        currentTab={tab}
                        setTab={setTab}
                        label="Sales"
                    />
                    <TabButton
                        tab="auctions"
                        currentTab={tab}
                        setTab={setTab}
                        label="Auctions"
                    />
                </div>
                <SortDropdown />
            </div>
            <div className="w-full flex flex-row mb-64">
                <OffersSidebar />
                <div className="flex flex-row justify-center items-start w-full">
                    <div className="w-full max-w-[1420px] mx-auto">
                        {tab === "sales" ? sales : auctions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffersLayout;
