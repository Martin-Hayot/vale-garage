"use client";

import Image from "next/image";
import { useState } from "react";

const CarCategories = () => {
    const [seeMore, setSeeMore] = useState(false);
    const onClick = () => {
        const el = document.getElementsByClassName("see-more");
        Array.from(el).forEach((element: Element) => {
            element.classList.toggle("hidden");
        });
        setSeeMore(!seeMore);
    };

    return (
        <div>
            <div className="flex flex-col text-white justify-between w-full space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
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
                        <h5 className="text-3xl font-bold mb-4">Family Cars</h5>
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
                        <h5 className="text-3xl font-bold mb-4">Sports Cars</h5>
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
                <div className="see-more hidden lg:block group relative overflow-hidden h-64 lg:h-full lg:w-1/3">
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
                <button
                    onClick={onClick}
                    className="w-full lg:hidden px-10 py-2 my-0 font-bold tracking-[0.5em] uppercase border-2 border-black dark:border-white dark:hover:bg-white dark:text-white text-black hover:bg-black dark:hover:text-black hover:text-white"
                >
                    {seeMore ? "Show less" : "Show more"}
                </button>
            </div>
        </div>
    );
};

export default CarCategories;
