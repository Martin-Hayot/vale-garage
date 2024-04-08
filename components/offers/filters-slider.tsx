"use client";

import { Slider } from "@/components/ui/slider";
import { Filters, useFilters } from "@/store/filters";
import { Input } from "../ui/input";
import { useState } from "react";

interface FiltersSliderProps {
    step: number;
    min: number;
    max: number;
    minStepsBetweenThumbs: number;
    className?: string;
    filters: Filters["filters"];
    filterType: "price" | "mileage" | "power" | "year";
    onValueChange: (value: number[]) => void;
}

const FiltersSlider = ({
    step,
    min,
    max,
    minStepsBetweenThumbs,
    className,
    filters,
    filterType,
    onValueChange,
}: FiltersSliderProps) => {
    const [sliderValue, setSliderValue] = useState([
        filters[filterType].min,
        filters[filterType].max,
    ]);

    return (
        <div>
            <Slider
                step={step}
                min={min}
                max={max}
                minStepsBetweenThumbs={minStepsBetweenThumbs}
                onValueChange={(value) => {
                    setSliderValue(value);
                    onValueChange(value);
                }}
                value={sliderValue}
                className={className}
            />
            <div className="flex flex-row gap-x-6">
                <Input
                    className="w-1/2 border-none bg-neutral-700 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    type="text"
                    value={Number(sliderValue[0]).toString()}
                    onChange={(e) =>
                        setSliderValue([+e.target.value, sliderValue[1]])
                    }
                />
                <Input
                    type="text"
                    className="w-1/2 border-none bg-neutral-700 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={Number(sliderValue[1]).toString()}
                    onChange={(e) =>
                        setSliderValue([sliderValue[0], +e.target.value])
                    }
                />
            </div>
        </div>
    );
};

export default FiltersSlider;
