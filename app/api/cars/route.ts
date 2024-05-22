import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const user = await currentUser();

    if (!user || user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { make, model } = await req.json();

        if (!make || !model) {
            return new NextResponse("Make and model are required", {
                status: 400,
            });
        }

        const existingCar = await db.car.findFirst({
            where: {
                make,
                model,
            },
        });

        if (existingCar) {
            return new NextResponse("Car Model already exists", {
                status: 400,
            });
        }

        await db.car.create({
            data: {
                make,
                model,
            },
        });

        return NextResponse.json({ message: "Car Model created" });
    } catch (error) {
        console.log("[CARS POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const cars = await db.car.findMany({
            select: {
                make: true,
                model: true,
            },
        });

        if (!cars) {
            return new NextResponse("No cars found", { status: 404 });
        }

        return NextResponse.json(cars);
    } catch (error) {
        console.log("[CARS GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const user = await currentUser();

    if (!user || user?.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    try {
        const { make, model } = await req.json();

        if (!make || !model) {
            return new NextResponse("Make and model are required", {
                status: 400,
            });
        }

        await db.car.deleteMany({
            where: {
                make,
                model,
            },
        });

        return NextResponse.json({ message: "Car Model deleted" });
    } catch (error) {
        console.log("[CARS DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
