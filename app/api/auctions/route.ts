import { NextResponse } from "next/server";
import { AuctionsSchema } from "@/schemas";
import { db } from "@/lib/db";
import {
    MILEAGE_OPTIONS,
    POWER_OPTIONS,
    PRICE_OPTIONS,
    YEAR_OPTIONS,
} from "@/constants/filters";
import { Filters } from "@/store/filters";

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
        const body = await req.json();

        const { images } = body;
        const {
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
            startDate,
            endDate,
            startPrice,
            reservePrice,
            maxPrice,
            onlyForMerchants,
            bidIncrement,
        } = AuctionsSchema.parse(body);

        if (images.length == 0) {
            return new NextResponse("Images are required", { status: 400 });
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

        if (!startDate) {
            return new NextResponse("Start date is required", { status: 400 });
        }

        if (!endDate) {
            return new NextResponse("End date is required", { status: 400 });
        }

        if (!startPrice) {
            return new NextResponse("Start price is required", { status: 400 });
        }

        if (!maxPrice) {
            return new NextResponse("Max price is required", { status: 400 });
        }

        if (!reservePrice) {
            return new NextResponse("Reserve price is required", {
                status: 400,
            });
        }

        if (!bidIncrement) {
            return new NextResponse("Bid increment is required", {
                status: 400,
            });
        }

        if (bidIncrement < 100) {
            return new NextResponse("Minimum bid is 100", { status: 400 });
        }

        if (startPrice < 1) {
            return new NextResponse("Start price is required", { status: 400 });
        }

        if (maxPrice < 1) {
            return new NextResponse("Max price is required", { status: 400 });
        }

        if (reservePrice < 1) {
            return new NextResponse("Reserve price is required", {
                status: 400,
            });
        }

        if (startDate < new Date()) {
            return new NextResponse("Start date is required", { status: 400 });
        }

        if (endDate < new Date()) {
            return new NextResponse("End date is required", { status: 400 });
        }

        if (endDate < startDate) {
            return new NextResponse("End date must be after start date", {
                status: 400,
            });
        }

        if (startPrice >= maxPrice) {
            return new NextResponse(
                "Max price must be higher than start price",
                {
                    status: 400,
                }
            );
        }

        if (maxPrice <= reservePrice) {
            return new NextResponse(
                "Max price must be higher than reserve price",
                {
                    status: 400,
                }
            );
        }

        if (reservePrice <= startPrice) {
            return new NextResponse(
                "Reserve price must be higher than start price",
                {
                    status: 400,
                }
            );
        }

        if (onlyForMerchants === undefined) {
            return new NextResponse("Only for merchants is required", {
                status: 400,
            });
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

        const auction = await db.auctions.create({
            data: {
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
                startPrice,
                reservePrice,
                startDate,
                endDate,
                onlyForMerchants,
                bidIncrement,
                maxPrice,
                currentBid: startPrice,
                car: {
                    connect: {
                        id: car.id,
                    },
                },
                offerImages: {
                    createMany: {
                        data: images,
                    },
                },
            },
        });

        if (!auction) {
            return new NextResponse("Error creating auction", {
                status: 500,
            });
        }

        return NextResponse.json({ message: "Auction created successfully" });
    } catch (error) {
        console.log("[AUCTION POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

type status = "ACTIVE" | "INACTIVE" | "ARCHIVED";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") as Filters["sort"] | "newest";
    const priceRange = searchParams.get("price");
    const mileageRange = searchParams.get("mileage");
    const yearRange = searchParams.get("year");
    const powerRange = searchParams.get("power");
    const status = searchParams.get("status") as status;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;

    let orderBy = {};

    const [minPrice, maxPrice] = priceRange?.split("-").map(Number) || [
        PRICE_OPTIONS.min,
        PRICE_OPTIONS.max,
    ];

    const [minMileage, maxMileage] = mileageRange?.split("-").map(Number) || [
        MILEAGE_OPTIONS.min,
        MILEAGE_OPTIONS.max,
    ];

    const [minYear, maxYear] = yearRange?.split("-").map((item) => {
        let date = new Date(item);
        date.setFullYear(date.getFullYear(), 11, 31); // Set to December 31
        return date;
    }) || [
        new Date(YEAR_OPTIONS.min).setFullYear(YEAR_OPTIONS.min, 11, 31),
        new Date(YEAR_OPTIONS.max).setFullYear(YEAR_OPTIONS.max, 11, 31),
    ];

    const [minPower, maxPower] = powerRange?.split("-").map(Number) || [
        POWER_OPTIONS.min,
        POWER_OPTIONS.max,
    ];

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

    const totalItems = await db.auctions.count({
        where: {
            currentBid: {
                gte: minPrice,
                lte: maxPrice,
            },
            mileage: {
                gte: minMileage,
                lte: maxMileage,
            },
            circulationDate: {
                gte: new Date(minYear),
                lte: new Date(maxYear),
            },
            power: {
                gte: minPower,
                lte: maxPower,
            },
            status: status,
        },
    });

    const auctions = await db.auctions.findMany({
        where: {
            currentBid: {
                gte: minPrice,
                lte: maxPrice,
            },
            mileage: {
                gte: minMileage,
                lte: maxMileage,
            },
            circulationDate: {
                gte: new Date(minYear),
                lte: new Date(maxYear),
            },
            power: {
                gte: minPower,
                lte: maxPower,
            },
            status: status,
        },
        orderBy: orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: { car: true, offerImages: true },
    });

    if (auctions.length === 0) {
        return new Response("No Auction found", { status: 404 });
    }

    return NextResponse.json({
        data: auctions,
        meta: {
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit),
        },
    });
};
