import { db } from "@/lib/db";
import { Filters } from "@/store/filters";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    // get all params from the request
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") as Filters["sort"] | "newest";
    let orderBy = {};

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

    // get all sales from the database and sort them
    const sales = await db.carBid.findMany({
        orderBy: orderBy,
        include: { car: true },
    });

    if (!sales) {
        return new Response("No sales found", { status: 404 });
    }

    return NextResponse.json(sales);
};
