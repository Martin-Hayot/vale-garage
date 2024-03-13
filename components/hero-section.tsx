import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

const HeroSection = () => {
    return (
        <section className="relative w-full h-[1000px] overflow-x-hidden">
            <Image
                src="/hero-cover.jpeg"
                alt="Car in a garage"
                width={2840}
                height={1440}
                className="aspect-video object-cover w-full h-full brightness-50 md:brightness-100"
            />
            <div className="space-y-6 z-10 absolute top-0 left-0 lg:left-[20%] w-full h-full rounded flex flex-col pt-32 md:justify-center p-4 md:p-6 lg:p-10 text-white">
                <h2
                    className={cn(
                        "text-7xl font-semibold w-[20rem] lg:w-[40rem] ",
                        font.className
                    )}
                >
                    The best place to buy{" "}
                    <span className="text-accent">cars</span>
                </h2>
                <p
                    className={cn(
                        "text-lg w-[20rem] lg:w-[30rem]",
                        font.className
                    )}
                >
                    Find your dream car at a dream price with our special blend
                    of auctions and sales, for individuals and B2B clients
                    seeking premium value.
                </p>
                <div className="flex flex-row gap-6">
                    <Button
                        size="lg"
                        className="w-56 h-16 rounded-md text-xl font-semibold"
                    >
                        See offers
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
