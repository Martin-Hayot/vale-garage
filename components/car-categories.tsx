"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const categories = [
    {
        name: "Family Cars",
        description: "Safe, spacious and comfortable",
        image: "/car-type-family.jpg",
        alt: "Family Cars",
    },
    {
        name: "Sports Cars",
        description: "Powerful & Performant",
        image: "/hero.jpg",
        alt: "Sports Cars",
    },
    {
        name: "Electric Cars",
        description: "Eco-friendly & Efficient",
        image: "/car-type-family.jpg",
        alt: "Electric Cars",
    },
    {
        name: "Economic Cars",
        description: "Affordable & Reliable",
        image: "/car-type-family.jpg",
        alt: "Economic Cars",
    },
    {
        name: "Economic Cars",
        description: "Affordable & Reliable",
        image: "/car-type-family.jpg",
        alt: "Economic Cars",
    },
];

const CarCategories = () => {
    const [seeMore, setSeeMore] = useState(true);
    const onClick = () => {
        const el = document.getElementsByClassName("see-more");
        Array.from(el).forEach((element: Element) => {
            element.classList.toggle("hidden");
        });
        setSeeMore(!seeMore);
    };

    return (
        <div>
            <div className="lg:grid lg:gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-center text-white w-full space-y-6 lg:space-y-0">
                {categories.map((category, index) => (
                    <div
                        className={cn(
                            "group relative overflow-hidden h-64 lg:h-full min-w-1/4",
                            index >= 3 && seeMore
                                ? "hidden lg:block"
                                : "lg:block"
                        )}
                        key={category.name}
                    >
                        <Image
                            src={category.image}
                            width={720}
                            height={480}
                            alt={category.alt}
                            className="w-full duration-200 group-hover:scale-110 object-cover h-full  lg:aspect-square lg:object-cover"
                        />
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-neutral-900/75 group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-primary/80 "></div>
                        <div className="absolute px-4 md:px-10 duration-200 w-full bottom-8 ">
                            <h3 className="text-xl md:text-3xl font-bold md:mb-4">
                                {category.name}
                            </h3>
                            <p className="w-full text-sm md:text-xl font-semibold">
                                {category.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10 lg:hidden">
                <button
                    onClick={onClick}
                    className="w-full lg:hidden px-10 py-2 my-0 font-bold tracking-[0.5em] uppercase border-2 border-black dark:border-white dark:hover:bg-white dark:text-white text-black hover:bg-black dark:hover:text-black hover:text-white"
                >
                    {!seeMore ? "Show less" : "Show more"}
                </button>
            </div>
        </div>
    );
};

export default CarCategories;
