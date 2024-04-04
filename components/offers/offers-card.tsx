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

type CarDetails = Car & CarBid;

interface OffersCardProps {
    details: CarDetails;
}

const OffersCard = ({ details }: OffersCardProps) => {
    return (
        <TooltipProvider>
            <div className="dark:bg-neutral-800 bg-neutral-200/50 rounded-xl flex flex-col w-72 max-h-72">
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
                                    <TooltipContent>
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
                                    <TooltipContent>
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
                                    <TooltipContent>
                                        {details.gearBox}
                                    </TooltipContent>
                                </Tooltip>
                            </>
                        )}
                    </div>
                    <Image
                        src="/car_placeholder2.jpg"
                        width={720}
                        height={480}
                        alt="car offer image"
                        className="w-full rounded-xl object-cover h-[200px]"
                    />
                </div>

                <div className="p-3 flex flex-row justify-between items-center gap-y-1 ">
                    <div>
                        <h3 className="font-semibold text-sm">
                            {details.make + " " + details.model}
                        </h3>
                        <p className="text-blue-500/80 text-xs">
                            {new Date(details.circulationDate).getFullYear()},{" "}
                            {details.mileage} km
                        </p>
                    </div>
                    <p className="font-bold">{details.price} €</p>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default OffersCard;
