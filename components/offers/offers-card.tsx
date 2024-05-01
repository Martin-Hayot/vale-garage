import { Fuel, Heart } from "lucide-react";
import { TbAutomaticGearbox, TbManualGearbox } from "react-icons/tb";
import Image from "next/image";
import { Car, CarBid } from "@prisma/client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useDrawer } from "@/store/drawer";

import { Maximize2 } from "lucide-react";
import Link from "next/link";

type CarDetails = Car & CarBid;

interface OffersCardProps {
    details: CarDetails;
}

const OffersCard = ({ details }: OffersCardProps) => {
    const { id, toggleDrawer, isOpen, setId } = useDrawer();
    let params = new URLSearchParams(window.location.search);
    let drawer = params.get("drawer");

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
                <div className="dark:bg-neutral-800 bg-neutral-200/50 rounded-xl flex flex-col w-72 max-h-72 outline-none shadow-sm">
                    <div className="relative">
                        <div className="bg-neutral-700/50 rounded-full p-2 absolute z-10 top-3 left-3">
                            <Heart className="text-white w-5 h-5" />
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
                                src="/car_placeholder2.jpg"
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
                                <h3 className="font-semibold text-sm ">
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
            <DrawerContent className="border-0 h-[80%] outline-none focus-within:ring-0">
                <div className="px-8 pt-2 pb-8 w-7">
                    <Link href={`/offers/${details.id}`}>
                        <Maximize2 className="w-6 h-6 rotate-90 hover:scale-125 transition-all duration-100" />
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row gap-x-8 gap-y-5 px-5">
                    <Image
                        src={"/car_placeholder2.jpg"}
                        alt={details.make}
                        width={720}
                        height={480}
                        className="rounded-lg"
                        draggable={false}
                    />
                    <div>
                        <h2 className="font-semibold text-4xl">
                            {details.make + " " + details.model}
                        </h2>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default OffersCard;
