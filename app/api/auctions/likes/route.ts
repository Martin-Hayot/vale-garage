import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const likes = await db.auctionLike.findMany({
            where: {
                userId: user.id,
            },
        });

        return NextResponse.json(likes);
    } catch (error) {
        console.log("[LIKES GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const { auctionId } = await req.json();

        const user = await currentUser();

        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        console.log("user", user);

        // Your existing POST logic here...
        const existingLike = await db.auctionLike.findFirst({
            where: {
                userId: user.id,
                auctionId: auctionId,
            },
        });

        if (existingLike) {
            return new NextResponse("Already liked", { status: 400 });
        }

        if (!user.id) {
            return new NextResponse("User ID not found", { status: 400 });
        }

        const likes = await db.auctionLike.create({
            data: {
                userId: user.id,
                auctionId: auctionId,
            },
        });
        return NextResponse.json(likes);
    } catch (error) {
        // Safer error logging
        console.error(
            "[LIKES POST]",
            error instanceof Error ? error.message : "Unknown error"
        );
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const DELETE = async (req: Request) => {
    const { auctionId } = await req.json();

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const existingLike = await db.auctionLike.findFirst({
            where: {
                userId: user.id,
                auctionId: auctionId,
            },
        });

        if (!existingLike) {
            return new NextResponse("Like not found", { status: 404 });
        }

        const like = await db.auctionLike.delete({
            where: {
                id: existingLike.id,
            },
        });

        return NextResponse.json(like);
    } catch (error) {
        console.log("[LIKES DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};
