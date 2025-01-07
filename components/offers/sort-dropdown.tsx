"use client";

import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoMdFunnel } from "react-icons/io";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { SORT_OPTIONS } from "@/constants/filters";
import { useFilters } from "@/store/filters";

const SortDropdown = () => {
    const [open, setOpen] = useState(false);
    const { sort, setFilter } = useFilters();

    let sortLabel = SORT_OPTIONS.find((option) => option.value === sort);

    return (
        <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
            <DropdownMenuTrigger className="group inline-flex justify-center items-center gap-x-4 font-medium border dark:border-neutral-800 rounded-md p-2 px-4 dark:hover:bg-neutral-800 hover:bg-neutral-100 transition-all duration-150">
                <span className="hidden lg:block">
                    Sort by : {sortLabel?.label}
                </span>{" "}
                <IoMdFunnel />
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
                                setFilter("sort", option.value);
                                setOpen(false);
                            }}
                            className={cn(
                                "flex flex-row justify-between gap-4 items-center w-full px-4 py-2 text-left text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-800",
                                option.value === sort &&
                                    "bg-neutral-100 dark:bg-neutral-800"
                            )}
                        >
                            {option.label}
                            {option.value === sort && (
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
