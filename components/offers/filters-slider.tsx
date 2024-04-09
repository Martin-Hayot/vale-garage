"use client";

import { Slider } from "@/components/ui/slider";
import { Filters, useFilters } from "@/store/filters";
import { Input } from "../ui/input";
import { useState } from "react";
import {
    MILEAGE_OPTIONS,
    POWER_OPTIONS,
    PRICE_OPTIONS,
    YEAR_OPTIONS,
} from "@/constants/filters";

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
    let defaultValues: { min: number; max: number; step: number };
    const [sliderValue, setSliderValue] = useState([
        filters[filterType].min,
        filters[filterType].max,
    ]);

    switch (filterType) {
        case "price":
            defaultValues = PRICE_OPTIONS;
            break;
        case "mileage":
            defaultValues = MILEAGE_OPTIONS;
            break;
        case "power":
            defaultValues = POWER_OPTIONS;
            break;
        case "year":
            defaultValues = YEAR_OPTIONS;
            break;
    }

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
            <div className="flex flex-row gap-x-6 relative">
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
                {defaultValues.max === sliderValue[1] && (
                    <div className="absolute right-4 top-[5px] text-lg">+</div>
                )}
            </div>
        </div>
    );
};

export default FiltersSlider;
