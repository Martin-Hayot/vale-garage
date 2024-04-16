import {
    MILEAGE_OPTIONS,
    POWER_OPTIONS,
    PRICE_OPTIONS,
    YEAR_OPTIONS,
} from "@/constants/filters";
import { db } from "@/lib/db";
import { Filters } from "@/store/filters";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") as Filters["sort"] | "newest";
    const priceRange = searchParams.get("price");
    const mileageRange = searchParams.get("mileage");
    const yearRange = searchParams.get("year");
    const powerRange = searchParams.get("power");

    let orderBy = {};

    const [minPrice, maxPrice] = priceRange?.split("-").map(Number) || [
        PRICE_OPTIONS.min,
        PRICE_OPTIONS.max,
    ];

    const [minMileage, maxMileage] = mileageRange?.split("-").map(Number) || [
        MILEAGE_OPTIONS.min,
        MILEAGE_OPTIONS.max,
    ];

    const [minYear, maxYear] = yearRange?.split("-").map((item) => {
        return new Date(item);
    }) || [new Date(YEAR_OPTIONS.min), new Date(YEAR_OPTIONS.max)];

    const [minPower, maxPower] = powerRange?.split("-").map(Number) || [
        POWER_OPTIONS.min,
        POWER_OPTIONS.max,
    ];

    switch (sort) {
        case "newest":
            orderBy = { createdAt: "desc" };
            break;
        case "oldest":
            orderBy = { createdAt: "asc" };
            break;
        case "price_asc":
            orderBy = { price: "asc" };
            break;
        case "price_desc":
            orderBy = { price: "desc" };
            break;
        default:
            return new Response("Invalid sort option", { status: 400 });
    }

    const sales = await db.carBid.findMany({
        where: {
            price: {
                gte: minPrice,
                lte: maxPrice,
            },
            mileage: {
                gte: minMileage,
                lte: maxMileage,
            },
            circulationDate: {
                gte: minYear,
                lte: maxYear,
            },
            power: {
                gte: minPower,
                lte: maxPower,
            },
        },
        orderBy: orderBy,
        include: { car: true },
    });

    if (!sales) {
        return new Response("No sales found", { status: 404 });
    }

    return NextResponse.json(sales);
};
