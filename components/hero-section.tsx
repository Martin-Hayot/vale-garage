"use client";

import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

const HeroSection = () => {
    return (
        <section className="relative w-full h-[1000px] overflow-x-hidden overflow-y-hidden">
            <Image
                src="/hero-cover.jpeg"
                alt="Car in a garage"
                width={2840}
                height={1440}
                priority
                className="aspect-video object-cover w-full h-full brightness-50 md:brightness-100"
            />
            <div className="space-y-6 z-10 absolute top-0 left-0 lg:left-[20%] w-full h-full rounded flex flex-col mt-16 p-4 md:p-6 lg:p-10 text-white">
                <motion.div
                    animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.8,
                            ease: "easeInOut",
                        },
                    }}
                    initial={{
                        y: 100,
                        opacity: 0,
                    }}
                >
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
                        Find your dream car at a dream price <br />
                        For{" "}
                        <span className="text-accent text-xl">
                            individuals{" "}
                        </span>{" "}
                        and <span className="text-accent text-xl">B2B</span>{" "}
                        clients seeking premium value.
                    </p>
                </motion.div>
                <motion.div
                    animate={{
                        x: 0,
                        opacity: 1,
                        transition: {
                            delay: 0.6,
                            duration: 0.8,
                            ease: "easeInOut",
                        },
                    }}
                    initial={{
                        x: -100,
                        opacity: 0,
                    }}
                    className="flex flex-row gap-6"
                >
                    <Button
                        asChild
                        size="lg"
                        className="px-5 py-4 mt-6 text-lg font-semibold text-white bg-blue-700 hover:bg-blue-800 transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105"
                    >
                        <Link href={"/offers"}>
                            See offers
                            <div>
                                <ArrowUpRight className="w-7 h-7 ml-4 -mr-2" />
                            </div>
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
