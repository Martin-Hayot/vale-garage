"use client";

import OffersSidebar from "@/components/offers/offers-sidebar";
import SortDropdown from "@/components/offers/sort-dropdown";
import { MILEAGE_OPTIONS, PRICE_OPTIONS } from "@/constants/filters";
import { cn } from "@/lib/utils";
import { useDrawer } from "@/store/drawer";
import { useFilters } from "@/store/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

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
    const selectedSort = searchParams.get("sort") as
        | "newest"
        | "oldest"
        | "price_asc"
        | "price_desc"
        | undefined;
    const selectedPrice = searchParams.get("price");
    const selectedMileage = searchParams.get("mileage");
    const selectedFuels = searchParams.get("fuel");
    const [tab, setTab] = useState(selectedTab);
    const router = useRouter();
    const { id } = useDrawer();

    useEffect(() => {
        if (selectedSort) {
            setFilters({
                sort: selectedSort,
            });
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
        if (selectedFuels) {
            setFilters({
                fuel: selectedFuels.split(","),
            });
        }
    }, [
        selectedPrice,
        selectedMileage,
        selectedFuels,
        selectedSort,
        setFilters,
    ]);

    useEffect(() => {
        // todo: add filters to the query
        const priceRange = `${filters.price.min}-${filters.price.max}`;
        const mileageRange = `${filters.mileage.min}-${filters.mileage.max}`;

        router.push(
            `/offers?tab=${tab}&drawer=${id}&sort=${
                filters.sort
            }&price=${priceRange}&mileage=${mileageRange}&fuel=${filters.fuel.join(
                ","
            )}`,
            { scroll: false }
        );
    }, [router, filters, tab, id, selectedSort]);

    return (
        <div className="w-full h-full mt-24">
            <div className="flex flex-row justify-center gap-x-6 border-b dark:border-neutral-800 pb-4 pt-1 px-4">
                <div className="dark:bg-neutral-800 bg-white inline-flex h-[2.8rem] items-center justify-center rounded-md bg-muted p-1 text-muted-foreground border dark:border-none">
                    <div
                        className={cn(
                            "dark:text-white/50 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-6 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                            tab === "sales" &&
                                "bg-blue-600/90 dark:bg-neutral-900 text-white dark:text-white"
                        )}
                        onClick={() => setTab("sales")}
                    >
                        Sales
                    </div>
                    <div
                        className={cn(
                            "dark:text-white/50 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                            tab === "auctions" &&
                                "bg-blue-600/90 dark:bg-neutral-900 text-white dark:text-white"
                        )}
                        onClick={() => setTab("auctions")}
                    >
                        Auctions
                    </div>
                </div>
                <SortDropdown />
            </div>
            <div className="w-full flex justify-center flex-row mt-8 lg:gap-x-10 mb-64">
                <div className="h-full">
                    <OffersSidebar />
                </div>
                <div className="w-full max-w-[1200px]">
                    {tab === "sales" ? sales : auctions}
                </div>
            </div>
        </div>
    );
};

export default OffersLayout;
