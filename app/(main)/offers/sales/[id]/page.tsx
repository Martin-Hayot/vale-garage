import Carousel from "@/components/carousel";
import AppointmentsForm from "@/components/forms/appointments-form";
import TestDriveForm from "@/components/forms/test-drive-form";
import OffersLike from "@/components/offers/offers-like";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

interface SalesIdPageProps {
    params: Promise<{ id: string }>;
}

const SalesIdPage = async ({ params }: SalesIdPageProps) => {
    const { id } = await params;
    const offer = await db.sales.findUnique({
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
                        <p className="text-xl">
                            €{" "}
                            <span className="text-xl font-bold">
                                {offer?.price}
                            </span>
                        </p>
                        <div>Price include TVA</div>
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
                    <div className="my-4 flex flex-col gap-4 w-full">
                        <AppointmentsForm>
                            <Button className="bg-blue-700 hover:bg-blue-800">
                                Take an appointment
                            </Button>
                        </AppointmentsForm>
                        <div className="flex flex-row gap-x-4">
                            <TestDriveForm>
                                <Button className="flex-1 bg-neutral-800 hover:bg-neutral-700">
                                    Ask for a test drive
                                </Button>
                            </TestDriveForm>

                            <OffersLike offerId={id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesIdPage;
