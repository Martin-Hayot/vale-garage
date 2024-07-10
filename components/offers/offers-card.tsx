"use client";

import { Fuel, Heart } from "lucide-react";
import { TbAutomaticGearbox, TbManualGearbox } from "react-icons/tb";
import Image from "next/image";
import { Car, CarBid, OfferImages } from "@prisma/client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useDrawer } from "@/store/drawer";

import { Maximize2 } from "lucide-react";
import Carousel from "../carousel";
import { useLikes } from "@/store/likes";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";

type CarDetails = Car & CarBid & { offerImages: OfferImages[] };

interface OffersCardProps {
    details: CarDetails;
}

const OffersCard = ({ details }: OffersCardProps) => {
    const { id, toggleDrawer, isOpen, setId } = useDrawer();
    const { addLike, removeLike, likes, getLikes } = useLikes();
    const user = useCurrentUser();
    let params;
    let drawer;
    if (typeof window !== "undefined") {
        params = new URLSearchParams(window.location.search);
        drawer = params.get("drawer");
    }

    useEffect(() => {
        if (user) {
            getLikes();
        }
    }, [getLikes, user]);

    return (
        <Drawer
            open={id === details.id || drawer === details.id}
            onOpenChange={(value) => {
                if (value) {
                    toggleDrawer(details.id);
                    setId(details.id);
                } else {
                    setId("");
                }
            }}
        >
            <TooltipProvider>
                <div className="dark:bg-neutral-800 bg-neutral-200/50 rounded-xl flex flex-col max-w-72 w-72 max-h-72 outline-none shadow-sm prevent-select">
                    <div className="relative">
                        <div
                            onClick={() => {
                                if (!user) {
                                    window.location.href = "/login";
                                    return;
                                }
                                if (
                                    likes.find(
                                        (like) => like.carBidId === details.id
                                    )
                                ) {
                                    removeLike(details.id);
                                } else {
                                    addLike(details.id);
                                }
                            }}
                            className="bg-neutral-700/50 rounded-full p-2 absolute z-10 top-3 left-3 hover:scale-105 transition-all duration-100"
                        >
                            <Heart
                                className={cn(
                                    "text-white w-5 h-5",
                                    likes.find(
                                        (like) => like.carBidId === details.id
                                    )
                                        ? " fill-red-500 text-red-500"
                                        : "text-neutral-300"
                                )}
                            />
                        </div>
                        <div className="bg-neutral-700/50 rounded-full p-2 absolute z-10 top-3 right-3 flex flex-row gap-x-2">
                            {(details.fuelType === "Diesel" ||
                                details.fuelType === "Petrol") && (
                                <>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Fuel className="w-4 h-4 text-green-400" />
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={-100}>
                                            {details.fuelType}
                                        </TooltipContent>
                                    </Tooltip>
                                </>
                            )}
                            {details.gearBox === "Manual" ? (
                                <>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <TbManualGearbox className="w-4 h-4 text-violet-300" />
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={-100}>
                                            {details.gearBox}
                                        </TooltipContent>
                                    </Tooltip>
                                </>
                            ) : (
                                <>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <TbAutomaticGearbox className="w-4 h-4 text-violet-300" />
                                        </TooltipTrigger>
                                        <TooltipContent sideOffset={-100}>
                                            {details.gearBox}
                                        </TooltipContent>
                                    </Tooltip>
                                </>
                            )}
                        </div>
                        <DrawerTrigger>
                            <Image
                                src={
                                    details.offerImages.filter(
                                        (image) => image.order === 0
                                    )[0].url
                                }
                                width={720}
                                height={480}
                                alt="car offer image"
                                className="w-full rounded-xl object-cover"
                                draggable={false}
                            />
                        </DrawerTrigger>
                    </div>
                    <DrawerTrigger>
                        <div className="p-3 flex flex-row justify-between items-center gap-y-1 text-start">
                            <div>
                                <h3 className="font-semibold text-md ">
                                    {details.make + " " + details.model}
                                </h3>
                                <p className="text-blue-500/80 text-xs">
                                    {new Date(
                                        details.circulationDate
                                    ).getFullYear()}
                                    , {details.mileage} km
                                </p>
                            </div>
                            <p className="font-bold">{details.price} €</p>
                        </div>
                    </DrawerTrigger>
                </div>
            </TooltipProvider>
            <DrawerContent className="border-0 h-[80vh] outline-none focus-within:ring-0">
                <div className="px-8 pt-2 pb-8 w-7">
                    <a href={`/offers/${details.id}`}>
                        <Maximize2 className="w-6 h-6 rotate-90 hover:scale-125 transition-all duration-100" />
                    </a>
                </div>
                <div className="flex flex-col xl:flex-row gap-x-8 gap-y-5 px-5">
                    <div className="w-full lg:w-[50%] max-h-56 md:max-h-96 lg:max-h-[600px] xl:max-h-[600px]">
                        <Carousel images={details.offerImages} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-4xl">
                            {details.make + " " + details.model}
                        </h2>
                        <div className="text-blue-500/80 text-lg flex flex-row gap-x-4">
                            <p>
                                {new Date(
                                    details.circulationDate
                                ).getFullYear()}
                            </p>
                            <p>{details.mileage} km</p>
                        </div>

                        <div className="flex flex-col gap-x-2 w-full">
                            <div className="flex flex-row gap-x-4">
                                <p className="font-semibold">Price:</p>
                                <p>{details.price} €</p>
                            </div>
                            <div className="flex flex-row gap-x-4">
                                <p className="font-semibold">State:</p>
                                <p>{details.state}</p>
                            </div>
                            <div className="flex flex-row gap-x-4">
                                <p className="font-semibold">Fuel Type:</p>
                                <p>{details.fuelType}</p>
                            </div>

                            <div className="flex flex-row gap-x-4">
                                <p className="font-semibold">Power:</p>
                                <p>{details.power} HP</p>
                            </div>
                            <div className="flex flex-row gap-x-4">
                                <p className="font-semibold">Gear Box:</p>
                                <p>{details.gearBox}</p>
                            </div>

                            {/*not seen on drawer */}
                            {/* <div className="flex flex-row gap-x-4">
                                    <p className="font-semibold">Car Body:</p>
                                    <p>{details.carBody}</p>
                                </div>

                                <div className="flex flex-row gap-x-4">
                                    <p className="font-semibold">Color:</p>
                                    <p>{details.color}</p>
                                </div>

                                <div className="flex flex-row gap-x-4">
                                    <p className="font-semibold">Doors:</p>
                                    <p>{details.doors}</p>
                                </div>

                                <div className="flex flex-row gap-x-4">
                                    <p className="font-semibold">Seats:</p>
                                    <p>{details.seats}</p>
                                </div>

                                <div className="flex flex-row gap-x-4">
                                    <p className="font-semibold">
                                        Transmission:
                                    </p>
                                    <p>{details.transmission}</p>
                                </div> */}
                        </div>
                    </div>
                    <div></div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default OffersCard;
