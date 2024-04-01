"use client";

import OffersSidebar from "@/components/offers/offers-sidebar";
import SortDropdown from "@/components/offers/sort-dropdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

const OffersLayout = ({
    sales,
    auctions,
}: {
    children: ReactNode;
    sales: ReactNode;
    auctions: ReactNode;
}) => {
    const searchParams = useSearchParams();
    const selectedTab = searchParams.get("tab") || "sales";
    const selectedSort = searchParams.get("sort") || "newest";

    return (
        <div className="w-full h-full mt-24">
            <div className="flex flex-row gap-x-6 border-b dark:border-neutral-800 pb-4 pt-1 pl-12">
                <div className="dark:bg-neutral-800 inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                    <Link
                        href="/offers?tab=sales"
                        className={cn(
                            "dark:text-white/50 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                            selectedTab === "sales" &&
                                "bg-gray-200 dark:bg-neutral-900 dark:text-white"
                        )}
                    >
                        Sales
                    </Link>
                    <Link
                        href="/offers?tab=auctions"
                        className={cn(
                            "dark:text-white/50 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                            selectedTab === "auctions" &&
                                "bg-gray-200 dark:bg-neutral-900 dark:text-white"
                        )}
                    >
                        Auctions
                    </Link>
                </div>
                <SortDropdown />
            </div>
            <div className="flex flex-row px-12 w-full mt-5">
                <OffersSidebar />
                <div className="ml-16">
                    <div className="uppercase font-semibold text-3xl pb-6">
                        {selectedTab}
                    </div>
                    {selectedTab === "sales" ? sales : auctions}
                </div>
            </div>
        </div>
    );
};

export default OffersLayout;
