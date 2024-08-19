import React, { useEffect, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = {
    className?: string;
    min: number;
    max: number;
    minStepsBetweenThumbs: number;
    step: number;
    formatLabel?: (value: number) => string;
    value?: number[] | readonly number[];
    onValueChange?: (values: number[]) => void;
};

const Slider = React.forwardRef(
    (
        {
            className,
            min,
            max,
            step,
            formatLabel,
            value,
            onValueChange,
            ...props
        }: SliderProps,
        ref
    ) => {
        const initialValue = Array.isArray(value) ? value : [min, max];
        const [localValues, setLocalValues] = useState(initialValue);
        const [activateBackground, setActivateBackground] = useState(false);

        const handleTouch = () => {
            setActivateBackground(true);
        };

        useEffect(() => {
            // Update localValues when the external value prop changes
            setLocalValues(Array.isArray(value) ? value : [min, max]);
        }, [min, max, value]);

        const handleValueChange = (newValues: number[]) => {
            setLocalValues(newValues);
            if (onValueChange) {
                onValueChange(newValues);
            }
        };

        return (
            <SliderPrimitive.Root
                ref={ref as React.RefObject<HTMLDivElement>}
                min={min}
                max={max}
                step={step}
                value={localValues}
                onValueChange={handleValueChange}
                className={cn(
                    "relative flex w-full touch-none select-none mb-6 items-center",
                    className
                )}
                {...props}
            >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white">
                    <SliderPrimitive.Range className="absolute h-full bg-blue-600" />
                </SliderPrimitive.Track>
                {localValues.map((value, index) => (
                    <React.Fragment key={index}>
                        <SliderPrimitive.Thumb
                            className="block h-4 w-4 rounded-full border-0 bg-blue-700 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            onTouchStart={handleTouch}
                            onTouchEnd={() => setActivateBackground(false)}
                            onPointerDown={handleTouch}
                            onPointerUp={() => setActivateBackground(false)}
                        />
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
        );
    }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
