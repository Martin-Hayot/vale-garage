import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const sales = await db.carBid.findMany({
        include: {
            car: true,
        },
    });

    if (!sales) {
        return new Response("No sales found", { status: 404 });
    }

    return NextResponse.json(sales);
};
