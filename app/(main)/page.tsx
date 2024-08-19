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
                {/* //todo: add a better car search functionnality */}
                <div className="bg-neutral-200 dark:bg-neutral-700 rounded-xl py-6 z-10 absolute bottom-0 -mb-24  mx-32 lg:mx-0 flex flex-col justify-center items-center">
                    <h2
                        className={cn(
                            "text-center md:text-left text-3xl pb-5 dark:text-white",
                            font.className
                        )}
                    >
                        Search for your dream car
                    </h2>
                    <div className="flex items-center justify-center mx-16 text-black">
                        <HomePageCarSearch />
                    </div>
                </div>
            </div>
            <section className="pt-44 xl:pt-32 bg-neutral-50 dark:bg-background w-full pb-12">
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
