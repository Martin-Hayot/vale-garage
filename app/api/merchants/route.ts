import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await currentUser();

    if (!user || user?.role === "MERCHANT") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const merchant = await db.user.update({
        where: {
            id: user.id,
        },
        data: {},
    });
}
