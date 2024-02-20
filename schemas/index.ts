import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email(),
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
});

export const OffersSchema = z.object({
    carMake: z.string().min(1, { message: "Car Make is required" }),
    carModel: z.string().min(1, { message: "Car Model is required" }),
    price: z.number().min(500, { message: "Price is required" }),
    mileage: z.number().min(1, { message: "Mileage is required" }),
    state: z.string().min(1, { message: "State of the car is required" }),
    circulationDate: z
        .date()
        .min(new Date(), { message: "Circulation date is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    fuelType: z.string().min(1, { message: "Fuel type is required" }),
    transmission: z.string().min(1, { message: "Transmission is required" }),
    power: z.number().min(1, { message: "Power is required" }),
    carBody: z.string().min(1, { message: "Car body is required" }),
    gearBox: z.string().min(1, { message: "Gear box is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    doors: z.number().min(1, { message: "Doors is required" }),
    seats: z.number().min(1, { message: "Seats is required" }),

    // Optional
    isBidding: z.optional(z.boolean()),
    images: z.optional(z.array(z.string())),
    minPrice: z.optional(z.number()),
    maxPrice: z.optional(z.number()),
    startDate: z.optional(z.date()),
    endDate: z.optional(z.date()),
});
