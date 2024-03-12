import HomePageCarSearch from "@/components/forms/homepage-car-search";
import HeroSection from "@/components/hero-section";
import NewOffers from "@/components/offers/new-offers";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <HeroSection />
            <div className="relative w-full flex items-center justify-center z-10 ">
                <div className="bg-neutral-700 rounded-xl py-6 a z-10 absolute bottom-0 -mb-24  mx-32 lg:mx-0 flex flex-col justify-center items-center">
                    <h2
                        className={cn(
                            "text-center md:text-left text-4xl pb-5",
                            font.className
                        )}
                    >
                        Search for your dream car
                    </h2>
                    <div className="flex items-center justify-center mx-16 md:mx-32 text-black">
                        <HomePageCarSearch />
                    </div>
                </div>
            </div>

            <div className="pt-32 xl:pt-16 bg-neutral-200 dark:bg-neutral-800 w-full">
                <h2 className="text-center md:text-left text-4xl md:mx-32  pb-12">
                    New offers
                </h2>
                <div className="flex items-center justify-center mx-16 md:mx-32 mb-6">
                    <NewOffers />
                </div>
            </div>
        </main>
    );
}
