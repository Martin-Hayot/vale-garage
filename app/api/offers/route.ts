import { NextResponse } from "next/server";
import { OffersSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
    const user = await currentUser();
    if (!user) {
        return NextResponse.redirect("/login");
    }

    if (user.role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
        price,
        power,
        carMake,
        carModel,
        carBody,
        fuelType,
        circulationDate,
        mileage,
        gearBox,
        transmission,
        color,
        seats,
        state,
        doors,
    } = OffersSchema.parse(await req.json());

    const car = await db.car.findFirst({
        where: {
            make: carMake,
            model: carModel,
        },
    });

    if (!car) {
        return new NextResponse("Car not found", { status: 404 });
    }

    const carBid = await db.carBid.create({
        data: {
            price,
            power,
            carBody,
            fuelType,
            circulationDate,
            mileage,
            gearBox,
            transmission,
            color,
            seats,
            doors,
            state,
            car: {
                connect: {
                    id: car.id,
                },
            },
        },
    });

    if (!carBid) {
        return new NextResponse("Error creating car offer", { status: 500 });
    }

    return NextResponse.json({ message: "Car Offer created successfully" });
}
