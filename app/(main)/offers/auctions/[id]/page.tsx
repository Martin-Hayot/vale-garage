import Carousel from "@/components/carousel";

import { db } from "@/lib/db";

interface AuctionsIdPageProps {
    params: {
        id: string;
    };
}

const AuctionsIdPage = async ({ params }: AuctionsIdPageProps) => {
    const { id } = params;
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
        <div className="mt-16 lg:mx-32">
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

                    <div className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg my-4 inline-block">
                        Current Bid :
                        <p className="text-xl">
                            €{" "}
                            <span className="text-xl font-bold">
                                {offer?.currentBid}
                            </span>
                        </p>
                    </div>
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
