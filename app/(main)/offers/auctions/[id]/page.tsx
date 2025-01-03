import Carousel from "@/components/carousel";
import CurrentBid from "@/components/offers/auctions/current-bid";
import TimeLeft from "@/components/offers/auctions/time-left";
import { currentUser } from "@/lib/auth";

import { db } from "@/lib/db";
import { Info } from "lucide-react";

interface AuctionsIdPageProps {
    params: Promise<{ id: string }>;
}

const AuctionsIdPage = async ({ params }: AuctionsIdPageProps) => {
    const { id } = await params;
    const user = await currentUser();
    const offer = await db.auctions.findUnique({
        where: {
            id: id,
        },
        include: {
            car: true,
            offerImages: true,
        },
    });

    return (
        <div className="mt-10 lg:mx-32">
            {offer?.currentBidderId === user?.id && (
                <div className="w-[90%] mx-auto flex text-center p-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg my-4">
                    <Info size={24} className="inline-block" />
                    <p className=" flex-grow">
                        You are the highest current bidder
                    </p>
                </div>
            )}

            <div className="flex flex-col xl:flex-row gap-x-8 gap-y-5 px-5">
                <div className="w-full lg:w-[50%]">
                    <Carousel images={offer?.offerImages || []} />
                </div>

                <div>
                    <h2 className="font-semibold text-4xl">
                        {offer?.car.make + " " + offer?.car.model}
                    </h2>
                    <div className="text-blue-500/80 text-lg flex flex-row gap-x-4">
                        <p>
                            {new Date(
                                offer?.circulationDate ?? ""
                            ).getFullYear()}
                        </p>
                        <p>{offer?.mileage} km</p>
                    </div>
                    <TimeLeft auction={offer} />
                    {offer && <CurrentBid auction={offer} />}
                    <div className="flex flex-wrap gap-2 w-full">
                        <div className="flex flex-row gap-x-4">
                            <span className="inline-block px-2 py-1 rounded text-neutral-800 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-sm">
                                {offer?.state}
                            </span>
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <span className="inline-block px-2 py-1 rounded text-neutral-800 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-sm">
                                {offer?.fuelType}
                            </span>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <span className="inline-block px-2 py-1 rounded text-neutral-800 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-sm">
                                {offer?.power} HP
                            </span>
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <span className="inline-block px-2 py-1 rounded text-neutral-800 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-sm">
                                {offer?.gearBox}
                            </span>
                        </div>

                        {/*not seen on drawer */}
                        <div className="flex flex-row gap-x-4">
                            <span className="inline-block px-2 py-1 rounded text-neutral-800 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-sm">
                                {offer?.carBody}
                            </span>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <span className="inline-block px-2 py-1 rounded text-neutral-800 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-sm">
                                {offer?.color}
                            </span>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <span className="inline-block px-2 py-1 rounded text-neutral-800 bg-neutral-200 dark:bg-neutral-800 dark:text-white text-sm">
                                {offer?.transmission}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionsIdPage;
