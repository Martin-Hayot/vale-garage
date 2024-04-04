import { create } from "zustand";
import {
    SORT_OPTIONS,
    COLOR_OPTIONS,
    BODY_OPTIONS,
    GEARBOX_OPTIONS,
    TRANSMISSION_OPTIONS,
    STATE_OPTIONS,
    FUEL_OPTIONS,
} from "@/constants/filters";

type SORT_OPTIONS = (typeof SORT_OPTIONS)[number]["value"];
type COLOR_OPTIONS = (typeof COLOR_OPTIONS)[number];
type BODY_OPTIONS = (typeof BODY_OPTIONS)[number];
type GEARBOX_OPTIONS = (typeof GEARBOX_OPTIONS)[number];
type TRANSMISSION_OPTIONS = (typeof TRANSMISSION_OPTIONS)[number];
type STATE_OPTIONS = (typeof STATE_OPTIONS)[number];
type FUEL_OPTIONS = (typeof FUEL_OPTIONS)[number];

export type Filters = {
    sort: SORT_OPTIONS;
    color: COLOR_OPTIONS;
    body: BODY_OPTIONS;
    gearbox: GEARBOX_OPTIONS;
    transmission: TRANSMISSION_OPTIONS;
    state: STATE_OPTIONS;
    fuel: FUEL_OPTIONS;
    setFilter: (filter: keyof Filters, value: any) => void;
    setFilters: (filters: Partial<Filters>) => void;
    filters: {
        sort: SORT_OPTIONS;
        color: COLOR_OPTIONS;
        body: BODY_OPTIONS;
        gearbox: GEARBOX_OPTIONS;
        transmission: TRANSMISSION_OPTIONS;
        state: STATE_OPTIONS;
        fuel: FUEL_OPTIONS;
    };
};

export const useFilters = create<Filters>((set) => ({
    sort: "newest",
    color: COLOR_OPTIONS[0],
    body: BODY_OPTIONS[0],
    gearbox: GEARBOX_OPTIONS[0],
    transmission: TRANSMISSION_OPTIONS[0],
    state: STATE_OPTIONS[0],
    fuel: FUEL_OPTIONS[0],
    setFilter: (filter: keyof Filters, value: any) => {
        set({ [filter]: value });
        set((state) => ({
            filters: { ...state.filters, [filter]: value },
        }));
    },
    setFilters: (filters: Partial<Filters>) => {
        set(filters);
        set((state) => ({
            filters: { ...state.filters, ...filters },
        }));
    },
    filters: {
        sort: "newest",
        color: COLOR_OPTIONS[0],
        body: BODY_OPTIONS[0],
        gearbox: GEARBOX_OPTIONS[0],
        transmission: TRANSMISSION_OPTIONS[0],
        state: STATE_OPTIONS[0],
        fuel: FUEL_OPTIONS[0],
    },
}));
