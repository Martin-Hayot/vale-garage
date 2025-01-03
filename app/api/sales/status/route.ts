import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    const body = await req.json();

    const offerId = body.data.offerId;
    const status = body.data.status;

    if (!offerId || !status) {
        return new NextResponse("Offer ID and status are required", {
            status: 400,
        });
    }

    const user = await currentUser();

    if (!user || user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedOffer = await db.sales.update({
        where: { id: offerId },
        data: { status: status },
    });

    return NextResponse.json(updatedOffer);
}
