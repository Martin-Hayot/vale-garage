import Carousel from "@/components/carousel";
import { db } from "@/lib/db";

interface OffersIdPageProps {
    params: {
        id: string;
    };
}

const OffersIdPage = async ({ params }: OffersIdPageProps) => {
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

                    <div className="flex flex-col gap-x-2 w-full">
                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Price:</p>
                            <p>{offer?.currentBid} €</p>
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">State:</p>
                            <p>{offer?.state}</p>
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Fuel Type:</p>
                            <p>{offer?.fuelType}</p>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Power:</p>
                            <p>{offer?.power} HP</p>
                        </div>
                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Gear Box:</p>
                            <p>{offer?.gearBox}</p>
                        </div>

                        {/*not seen on drawer */}
                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Car Body:</p>
                            <p>{offer?.carBody}</p>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Color:</p>
                            <p>{offer?.color}</p>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Doors:</p>
                            <p>{offer?.doors}</p>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Seats:</p>
                            <p>{offer?.seats}</p>
                        </div>

                        <div className="flex flex-row gap-x-4">
                            <p className="font-semibold">Transmission:</p>
                            <p>{offer?.transmission}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffersIdPage;
