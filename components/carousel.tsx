"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface CarouselProps {
    images: {
        id: string;
        saleId?: string | null;
        auctionId?: string | null;
        url: string;
        order: number;
    }[];
}

const Carousel = ({ images }: CarouselProps) => {
    const [imageIndex, setImageIndex] = useState(0);
    return (
        <div className="w-full h-full relative prevent-select">
            <Image
                src={
                    images.filter((image) => image.order === imageIndex)[0].url
                }
                width={1280}
                height={720}
                alt="car images"
                className="object-cover w-full h-full block rounded-lg"
            />
            <div
                className="absolute items-center flex top-0 bottom-0 h-full hover:backdrop-brightness-75 transition-all duration-150 left-0 p-2 cursor-pointer"
                onClick={() => {
                    if (imageIndex > 0) {
                        setImageIndex(imageIndex - 1);
                    } else {
                        setImageIndex(images.length - 1);
                    }
                }}
            >
                <ChevronLeft className=" stroke-white" />
            </div>
            <div
                className="absolute items-center flex top-0 bottom-0 h-full hover:backdrop-brightness-75 transition-all duration-150 right-0 p-2 cursor-pointer"
                onClick={() => {
                    if (imageIndex < images.length - 1) {
                        setImageIndex(imageIndex + 1);
                    } else {
                        setImageIndex(0);
                    }
                }}
            >
                <ChevronRight className="stroke-white" />
            </div>
        </div>
    );
};

export default Carousel;
