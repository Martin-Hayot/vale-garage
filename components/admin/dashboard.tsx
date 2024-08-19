import CreateOffer from "./create-offer";
import CarModels from "./car-models";

export function Dashboard() {
    return (
        <div>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <div className="w-96">
                    <CreateOffer />
                </div>
                <div>
                    <CarModels />
                </div>
            </main>
        </div>
    );
}
