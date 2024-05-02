import { NextResponse } from "next/server";
import { OffersSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(req: Request) {
    try {
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
            images,
        } = OffersSchema.parse(await req.json());

        if (images.length == 0) {
            return new NextResponse("Images are required", { status: 400 });
        }
        if (!price) {
            return new NextResponse("Price is required", { status: 400 });
        }

        if (!power) {
            return new NextResponse("Power is required", { status: 400 });
        }

        if (!carMake) {
            return new NextResponse("Car make is required", { status: 400 });
        }

        if (!carModel) {
            return new NextResponse("Car model is required", { status: 400 });
        }

        if (!carBody) {
            return new NextResponse("Car body is required", { status: 400 });
        }

        if (!fuelType) {
            return new NextResponse("Fuel type is required", { status: 400 });
        }

        if (!circulationDate) {
            return new NextResponse("Circulation date is required", {
                status: 400,
            });
        }

        if (!mileage) {
            return new NextResponse("Mileage is required", { status: 400 });
        }

        if (!gearBox) {
            return new NextResponse("Gear box is required", { status: 400 });
        }

        if (!transmission) {
            return new NextResponse("Transmission is required", {
                status: 400,
            });
        }

        if (!color) {
            return new NextResponse("Color is required", { status: 400 });
        }

        if (!seats) {
            return new NextResponse("Seats is required", { status: 400 });
        }

        if (!state) {
            return new NextResponse("State is required", { status: 400 });
        }

        if (!doors) {
            return new NextResponse("Doors is required", { status: 400 });
        }

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
                images,
                car: {
                    connect: {
                        id: car.id,
                    },
                },
            },
        });

        if (!carBid) {
            return new NextResponse("Error creating car offer", {
                status: 500,
            });
        }

        return NextResponse.json({ message: "Car Offer created successfully" });
    } catch (error) {
        console.log("[OFFERS POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}
