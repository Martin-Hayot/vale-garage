import HomePageCarSearch from "@/components/forms/homepage-car-search";
import HeroSection from "@/components/hero-section";
import NewOffers from "@/components/offers/new-offers";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import CarCategories from "@/components/car-categories";
import { db } from "@/lib/db";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default async function Home() {
    const offers = await db.carBid.findMany({
        where: {
            status: "ACTIVE",
        },
        include: {
            car: true,
            offerImages: true,
        },
    });

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <HeroSection />
            <div className="relative w-full flex items-center justify-center z-10 ">
                <div className="absolute flex items-center justify-center mx-16 text-black">
                    <HomePageCarSearch />
                </div>
            </div>
            <section className="pt-48 bg-neutral-50 dark:bg-background w-full pb-12">
                <div className="flex items-center justify-center mx-16 md:mx-32">
                    <NewOffers offers={offers} />
                </div>
            </section>
            <section id="creations" className="lg:mx-32">
                <div className="my-32 px-6 md:px-0">
                    <h2 className="text-center lg:text-left text-4xl pb-16 font-semibold">
                        What type of car are you looking for ?
                    </h2>
                    <CarCategories />
                </div>
            </section>
        </main>
    );
}
