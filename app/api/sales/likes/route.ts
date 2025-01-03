import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const likes = await db.saleLike.findMany({
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
    const { saleId } = await req.json();

    const user = await currentUser();

    console.log("user", user);

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const existingLike = await db.saleLike.findFirst({
            where: {
                userId: user.id,
                saleId: saleId,
            },
        });

        if (existingLike) {
            return new NextResponse("Already liked", { status: 400 });
        }

        if (!user.id) {
            return new NextResponse("User ID not found", { status: 400 });
        }

        const likes = await db.saleLike.create({
            data: {
                userId: user.id,
                saleId: saleId,
            },
        });
        return NextResponse.json(likes);
    } catch (error) {
        console.log("[LIKES POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const DELETE = async (req: Request) => {
    const { saleId } = await req.json();

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const existingLike = await db.saleLike.findFirst({
            where: {
                userId: user.id,
                saleId: saleId,
            },
        });

        if (!existingLike) {
            return new NextResponse("Like not found", { status: 404 });
        }

        const like = await db.saleLike.delete({
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
