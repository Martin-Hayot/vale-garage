"use client";

import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoMdFunnel } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
] as const;

const SortDropdown = () => {
    const [selected, setSelected] = useState<string>(SORT_OPTIONS[0].label);
    const [filter, setFilter] = useState({ sort: "newest" });
    const [open, setOpen] = useState(false);

    return (
        <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
            <DropdownMenuTrigger className="group inline-flex justify-center items-center gap-x-4 font-medium border dark:border-neutral-800 rounded-lg p-2 px-4 dark:hover:bg-neutral-800 transition-all duration-150">
                Sort by : {selected} <IoMdFunnel />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="dark:bg-neutral-900 border-0"
            >
                {SORT_OPTIONS.map((option) => {
                    return (
                        <button
                            key={option.value}
                            onClick={() => {
                                setSelected(option.label);
                                setFilter((prev) => ({
                                    ...prev,
                                    sort: option.value,
                                }));
                                setOpen(false);
                            }}
                            className={cn(
                                "flex flex-row justify-between gap-4 items-center w-full px-4 py-2 text-left text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800",
                                option.value === filter.sort &&
                                    "bg-neutral-100 dark:bg-neutral-800"
                            )}
                        >
                            {option.label}
                            {option.value === filter.sort && (
                                <Check className="w-4 h-4" />
                            )}
                        </button>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortDropdown;
