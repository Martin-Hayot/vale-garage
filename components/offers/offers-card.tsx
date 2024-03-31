import { Fuel, Heart } from "lucide-react";
import { TbManualGearbox } from "react-icons/tb";
import Image from "next/image";

const OffersCard = () => {
    return (
        <div className="dark:bg-neutral-800 bg-neutral-200/50 rounded-xl flex flex-col w-72">
            <div className="relative">
                <div className="bg-neutral-700/50 rounded-full p-2 absolute z-10 top-3 left-3">
                    <Heart className="w-5 h-5" />
                </div>
                <div className="bg-neutral-700/50 rounded-full p-2 absolute z-10 top-3 right-3 flex flex-row gap-x-2">
                    <Fuel className="w-4 h-4 text-green-400" />
                    <TbManualGearbox className="w-4 h-4 text-violet-300" />
                </div>
                <Image
                    src="/car_placeholder2.jpg"
                    width={720}
                    height={480}
                    alt="car offer"
                    className="w-full rounded-xl object-cover h-[200px]"
                />
            </div>

            <div className="p-3 flex flex-row justify-between items-center gap-y-1 ">
                <div>
                    <h3 className="font-bold text-sm">Ford F-150</h3>
                    <p className="dark:text-neutral-500 text-xs">
                        2021, 5000 km
                    </p>
                </div>
                <p className="font-bold">13000 €</p>
            </div>
        </div>
    );
};

export default OffersCard;
