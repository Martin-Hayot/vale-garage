import HomePageCarSearch from "@/components/forms/homepage-car-search";
import HeroSection from "@/components/hero-section";
import NewOffers from "@/components/offers/new-offers";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <HeroSection />
            <div className="relative w-full flex items-center justify-center z-10 ">
                {/* //todo: add a better car search functionnality */}
                <div className="bg-neutral-400 dark:bg-neutral-700 rounded py-6 a z-10 absolute bottom-0 -mb-24  mx-32 lg:mx-0 flex flex-col justify-center items-center">
                    <h2
                        className={cn(
                            "text-center md:text-left text-4xl pb-5 dark:text-white",
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
            <section id="creations" className="pt-16 mx-12">
                <div className="container mx-auto my-32 px-6 md:px-0">
                    <h2 className="text-center lg:text-left text-4xl pb-12 font-semibold">
                        What type of car are you looking for ?
                    </h2>
                    <div className="flex flex-col justify-between w-full space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
                        <div className="group relative overflow-hidden h-64 lg:h-full lg:w-1/3">
                            <Image
                                src="/car-type-family.jpg"
                                width={720}
                                height={480}
                                alt=""
                                className="w-full duration-200 group-hover:scale-110 lg:aspect-square object-none object-bottom lg:object-cover"
                            />
                            <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-neutral-900/75 group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-primary/80 "></div>
                            <div className="absolute px-10 duration-200 w-full bottom-8 md:px-6">
                                <h5 className="text-3xl font-bold mb-4">
                                    Family Cars
                                </h5>
                                <p className="w-full text-xl font-semibold">
                                    Safe, spacious and comfortable
                                </p>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden h-64 lg:h-full lg:w-1/3">
                            <Image
                                src="/hero.jpg"
                                width={720}
                                height={480}
                                alt=""
                                className="w-full duration-200 md:block group-hover:scale-110 lg:aspect-square object-none object-bottom lg:object-cover"
                            />
                            <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-neutral-900/75 group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-primary/80 "></div>
                            <div className="absolute px-10 duration-200 w-full bottom-8 md:px-6">
                                <h5 className="text-3xl font-bold mb-4">
                                    Sports Cars
                                </h5>
                                <p className="w-full text-xl font-semibold">
                                    Powerful & performant
                                </p>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden h-64 lg:h-full lg:w-1/3">
                            <Image
                                src="/car-type-family.jpg"
                                width={720}
                                height={480}
                                alt=""
                                className="w-full duration-200 md:block group-hover:scale-110 lg:aspect-square object-none object-bottom lg:object-cover"
                            />
                            <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-neutral-900/75 group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-primary/80 "></div>
                            <div className="absolute px-10 duration-200 w-full bottom-8 md:px-6">
                                <h5 className="text-3xl font-bold mb-4">
                                    Best value cars
                                </h5>
                                <p className="w-full text-xl font-semibold">
                                    Affordable & reliable
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10 lg:hidden">
                        <button className="w-full lg:hidden px-10 py-2 my-0 font-bold tracking-[0.5em] uppercase border-2 border-black bg-white text-black hover:bg-black hover:text-white">
                            See all
                        </button>
                    </div>
                </div>
            </section>
            <section className="pt-32 xl:pt-16 bg-neutral-200 dark:bg-background w-full">
                <h2 className="text-center md:text-left text-4xl md:mx-32  pb-12">
                    New offers
                </h2>
                <div className="flex items-center justify-center mx-16 md:mx-32 mb-6">
                    <NewOffers />
                </div>
            </section>
        </main>
    );
}
