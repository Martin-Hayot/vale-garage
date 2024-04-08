import { db } from "@/lib/db";
import { Filters } from "@/store/filters";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") as Filters["sort"] | "newest";
    const priceRange = searchParams.get("price");
    const mileageRange = searchParams.get("mileage");

    let orderBy = {};

    if (!priceRange) {
        return new Response("Price range is required", { status: 400 });
    }

    if (!mileageRange) {
        return new Response("Mileage range is required", { status: 400 });
    }

    const [minPrice, maxPrice] = priceRange.split("-").map(Number);

    const [minMileage, maxMileage] = mileageRange.split("-").map(Number);

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
        },
        orderBy: orderBy,
        include: { car: true },
    });

    if (!sales) {
        return new Response("No sales found", { status: 404 });
    }

    return NextResponse.json(sales);
};
