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

export const PRICE_OPTIONS = {
    min: 0,
    max: 60000,
    step: 100,
};

export const MILEAGE_OPTIONS = {
    min: 0,
    max: 300000,
    step: 5000,
};

export const YEAR_OPTIONS = {
    min: 1970,
    max: new Date().getFullYear(),
    step: 1,
};

export const POWER_OPTIONS = {
    min: 1,
    max: 500,
    step: 20,
};
