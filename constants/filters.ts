import {
    CAR_COLORS,
    TRANSMISSION_TYPES,
    CAR_BODIES,
    CAR_STATES,
    FUEL_TYPES,
    GEARBOX_TYPES,
} from "./cars";

export const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
] as const;

export const COLOR_OPTIONS = ["any", ...CAR_COLORS] as const;

export const TRANSMISSION_OPTIONS = ["any", ...TRANSMISSION_TYPES] as const;

export const BODY_OPTIONS = ["any", ...CAR_BODIES] as const;

export const STATE_OPTIONS = ["any", ...CAR_STATES] as const;

export const FUEL_OPTIONS = ["any", ...FUEL_TYPES] as const;

export const GEARBOX_OPTIONS = ["any", ...GEARBOX_TYPES] as const;
