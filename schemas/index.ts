import {
    BODY_OPTIONS,
    COLOR_OPTIONS,
    FUEL_OPTIONS,
    GEARBOX_OPTIONS,
    STATE_OPTIONS,
    TRANSMISSION_OPTIONS,
} from "@/constants/filters";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email(),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    }),
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
    name: z.string().min(1, { message: "Name is required" }),
});

export const ResetSchema = z.object({
    email: z.string().email(),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: "Minimum 6 characters required" }),
});

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.boolean(),
});

export const OffersSchema = z.object({
    carMake: z.string().min(1, { message: "Car Make is required" }),
    carModel: z.string().min(1, { message: "Car Model is required" }),
    price: z.coerce.number().min(500, { message: "Price is required" }),
    mileage: z.coerce.number().min(1, { message: "Mileage is required" }),
    state: z.string().min(1, { message: "State of the car is required" }),
    circulationDate: z.coerce.date().max(new Date(), { message: "Too new!" }),
    description: z.string().min(1, { message: "Description is required" }),
    fuelType: z.string().min(1, { message: "Fuel type is required" }),
    transmission: z.string().min(1, { message: "Transmission is required" }),
    power: z.coerce.number().min(1, { message: "Power is required" }),
    carBody: z.string().min(1, { message: "Car body is required" }),
    gearBox: z.string().min(1, { message: "Gear box is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    doors: z.coerce.number().min(1, { message: "Doors is required" }),
    seats: z.coerce.number().min(1, { message: "Seats is required" }),
});

export const AuctionsSchema = z.object({
    carMake: z.string().min(1, { message: "Car Make is required" }),
    carModel: z.string().min(1, { message: "Car Model is required" }),
    mileage: z.coerce.number().min(1, { message: "Mileage is required" }),
    state: z.string().min(1, { message: "State of the car is required" }),
    circulationDate: z.coerce.date().max(new Date(), { message: "Too new!" }),
    description: z.string().min(1, { message: "Description is required" }),
    fuelType: z.string().min(1, { message: "Fuel type is required" }),
    transmission: z.string().min(1, { message: "Transmission is required" }),
    power: z.coerce.number().min(1, { message: "Power is required" }),
    carBody: z.string().min(1, { message: "Car body is required" }),
    gearBox: z.string().min(1, { message: "Gear box is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    doors: z.coerce.number().min(1, { message: "Doors is required" }),
    seats: z.coerce.number().min(1, { message: "Seats is required" }),
    // auction specific
    startDate: z.coerce
        .date()
        .min(new Date(), { message: "Start date is required" }),
    endDate: z.coerce
        .date()
        .min(new Date(), { message: "End date is required" }),
    startPrice: z.coerce
        .number()
        .min(1, { message: "Start price is required" }),
    maxPrice: z.coerce.number().min(1, { message: "Max price is required" }),
    reservePrice: z.coerce
        .number()
        .min(1, { message: "Reserve price is required" }),
    bidIncrement: z.coerce
        .number()
        .min(100, { message: "Minimum bid is required" }),
    onlyForMerchants: z.boolean(),
});

export const CreateCarSchema = z.object({
    make: z.string().min(1, { message: "Make is required" }),
    model: z.string().min(1, { message: "Model is required" }),
});

export const OffersFilterValidator = z.object({
    make: z.optional(z.string()),
    model: z.optional(z.string()),
    price: z.tuple([z.number(), z.number()]),
    mileage: z.tuple([z.number(), z.number()]),
    power: z.tuple([z.number(), z.number()]),
    state: z.array(z.enum(STATE_OPTIONS)),
    fuelType: z.array(z.enum(FUEL_OPTIONS)),
    transmission: z.array(z.enum(TRANSMISSION_OPTIONS)),
    carBody: z.array(z.enum(BODY_OPTIONS)),
    gearBox: z.array(z.enum(GEARBOX_OPTIONS)),
    color: z.array(z.enum(COLOR_OPTIONS)),
    doors: z.optional(z.number()),
    seats: z.optional(z.number()),
    circulationDate: z.optional(z.date()),
});

export const MerchantsSchema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    vatNumber: z
        .string()
        .min(1, { message: "VAT number is required" })
        .max(12, { message: "VAT number is too long" }),
});

export const AppointmentSchema = z.object({
    gender: z.string().min(1, {
        message: "Must select a gender",
    }),
    firstname: z.string().min(2, {
        message: "Firstname must be at least 2 characters.",
    }),
    lastname: z.string().min(2, {
        message: "Lastname must be at least 2 characters.",
    }),
    email: z.string().email(),
    phone: z.string().refine(
        (val) => {
            const phoneRegex =
                /^\+(\d{1,3})[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{4}$/;

            return phoneRegex.test(val);
        },
        {
            message: "Invalid phone number.",
        }
    ),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});
