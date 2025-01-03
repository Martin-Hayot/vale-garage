import DashboardCard from "./dashboard-card";
import CarModels from "./car-models";
import { OffersForm } from "@/components/forms/offers-form";
import { AuctionsForm } from "@/components/forms/auctions-form";
import { Car, GavelIcon } from "lucide-react";

export function Dashboard() {
    return (
        <div className="flex flex-col flex-grow p-8">
            <div className="space-y-8">
                {/* Row 1: Car Offers & Auctions */}
                <div className="flex flex-col xl:flex-row gap-8">
                    <div className="flex-1 flex flex-col">
                        <DashboardCard
                            Form={OffersForm}
                            Icon={<Car className="ml-2 h-8 w-8 text-accent" />}
                            title="Car Offers"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <DashboardCard
                            Form={AuctionsForm}
                            Icon={
                                <GavelIcon className="ml-2 h-8 w-8 text-accent" />
                            }
                            title="Auctions"
                        />
                    </div>
                </div>

                {/* Row 2: Car Models */}

                <CarModels />
            </div>
        </div>
    );
}
