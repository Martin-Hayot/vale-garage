import DashboardCard from "./dashboard-card";
import CarModels from "./car-models";
import { OffersForm } from "@/components/forms/offers-form";
import { AuctionsForm } from "@/components/forms/auctions-form";
import { Car, GavelIcon } from "lucide-react";

export function Dashboard() {
    return (
        <div className="py-8">
            <main className="max-w-6xl space-y-8">
                {/* Row 1: Car Offers & Auctions */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 flex-wrap">
                    <DashboardCard
                        Form={OffersForm}
                        Icon={<Car className="ml-2 h-8 w-8 text-accent" />}
                        title="Car Offers"
                    />
                    <DashboardCard
                        Form={AuctionsForm}
                        Icon={
                            <GavelIcon className="ml-2 h-8 w-8 text-accent" />
                        }
                        title="Auctions"
                    />
                </div>

                {/* Row 2: Car Models */}
                <div className="">
                    <CarModels />
                </div>
            </main>
        </div>
    );
}
