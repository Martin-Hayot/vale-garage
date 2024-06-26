"use client";

import { useState } from "react";
import Image from "next/image";
import { useImages } from "@/store/images";

const DragAndDropImageSorter = () => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const { images, setImages, setObjects } = useImages();

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        targetIndex: number
    ) => {
        e.preventDefault();
        if (draggedIndex === null) return;

        // Assuming images is an array of objects with 'url' and 'order' properties
        const newImages = [...images];
        const target = newImages.find((image) => image.order === targetIndex);

        const item = newImages.splice(draggedIndex, 1)[0];
        item.order = targetIndex;

        if (target === undefined) return; // Added this line to prevent errors
        target.order = draggedIndex;
        newImages.splice(targetIndex, 0, item);

        // Assuming setImages expects an array of objects with 'url' and 'order' properties
        setObjects(newImages);
        console.log(images);
        setDraggedIndex(null); // Reset dragged index
    };

    return (
        <div className="w-full whitespace-nowrap bg-neutral-800 rounded-md py-4 cursor-pointer">
            <div className="flex w-max space-x-4 p-4">
                {images
                    .sort((a, b) => a.order - b.order) // Fixed sorting function
                    .map((image, index) => (
                        <div
                            className="relative flex justify-center items-center"
                            draggable
                            key={index}
                            onDragStart={() => handleDragStart(image.order)}
                            onDragOver={handleDragOver} // Removed unnecessary parameter
                            onDrop={(e) => handleDrop(e, image.order)}
                        >
                            <div className="absolute bg-white text-black rounded-full px-2">
                                {image.order + 1}
                            </div>
                            <Image
                                src={image.url}
                                alt="car"
                                width={200}
                                height={200}
                                className="w-32 h-32 object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DragAndDropImageSorter;
