import { create } from "zustand";
import { SORT_OPTIONS } from "@/constants/filters";

type SORT_OPTIONS = (typeof SORT_OPTIONS)[number]["value"];

type Filters = {
    sort: SORT_OPTIONS;
};

export const useFilters = create<Filters>((set) => ({
    sort: "newest",
    setSort: (sort: SORT_OPTIONS) => set({ sort }),
}));
