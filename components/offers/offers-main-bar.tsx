"use client";

import { cn } from "@/lib/utils";
import OffersSearchBar from "./offers-searchbar";
import SortDropdown from "./sort-dropdown";
import { MobileFiltersToggle } from "../mobile-filters-toggle";

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

interface MainBarProps {
    tab: string;
    setTab: (tab: string) => void;
}

const MainBar = ({ tab, setTab }: MainBarProps) => {
    // const { isConnected } = useWebSocketStore();

    return (
        <div className="border-b dark:bg-neutral-900 dark:border-neutral-800 py-3 px-4 flex justify-center ">
            <div className="flex flex-row  gap-x-6 w-[80%] max-w-[1200px]">
                <div>
                    <MobileFiltersToggle />
                </div>
                <div className="hidden dark:bg-neutral-800 bg-white lg:inline-flex h-[2.8rem] items-center justify-center rounded-md bg-muted p-1 text-muted-foreground border dark:border-none">
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
                {/* Mobile Tab switcher */}
                <div className="lg:hidden flex-1 flex justify-center items-center text-xl cursor-pointer">
                    {tab === "sales" ? (
                        <div onClick={() => setTab("auctions")}>
                            Go to Auctions
                        </div>
                    ) : (
                        <div onClick={() => setTab("sales")}>Go to Sales</div>
                    )}
                </div>
                <div className="hidden">
                    <OffersSearchBar />
                </div>
                <SortDropdown />
            </div>
            {/* {isConnected ? (
                <div className="rounded-full bg-green-500 w-[0.6em] h-[0.6em] flex justify-center self-center shadow-[0_0_5px_1px_rgba(34,197,94,0.5)]"></div>
            ) : (
                <div className="rounded-full bg-red-500  w-[0.6em] h-[0.6em] flex justify-center self-center shadow-[0_0_5px_1px_rgba(239,68,68,0.5)]"></div>
            )} */}
        </div>
    );
};

export default MainBar;
