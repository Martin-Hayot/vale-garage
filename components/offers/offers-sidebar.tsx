"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    COLOR_OPTIONS,
    FUEL_OPTIONS,
    PRICE_OPTIONS,
    MILEAGE_OPTIONS,
    YEAR_OPTIONS,
    POWER_OPTIONS,
} from "@/constants/filters";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../ui/command";
import { useFilters } from "@/store/filters";
import FiltersSlider from "./filters-slider";
import { useRouter } from "next/navigation";

const OffersSidebar = () => {
    const { filters, setFilter, resetFilters } = useFilters();
    const router = useRouter();

    return (
        <div className="hidden dark:bg-neutral-800 bg-neutral-200 rounded-b-lg py-5 px-4 w-96 xl:block">
            <div className="flex flex-row items-center justify-between">
                <h2 className="font-semibold text-2xl">Filters</h2>
                <Button
                    variant="link"
                    onClick={() => {
                        resetFilters();
                        router.refresh();
                    }}
                    className="text-accent text-md"
                >
                    Reset
                </Button>
            </div>
            <div className="mt-2">
                <Command className="dark:bg-neutral-800 bg-neutral-200 ">
                    <div className="hover:bg-neutral-100 transition-colors duration-200 focus-within:bg-neutral-100 dark:focus-within:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                        <CommandInput placeholder="Search Filter..." />
                    </div>
                    <CommandGroup>
                        <Accordion className="w-full" type="multiple">
                            <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                <AccordionItem
                                    className="w-full border-none"
                                    value="price"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <h3 className="text-md font-semibold">
                                            Price | €
                                        </h3>
                                    </AccordionTrigger>
                                    <AccordionContent className="py-2">
                                        <div>
                                            <FiltersSlider
                                                step={PRICE_OPTIONS.step}
                                                minStepsBetweenThumbs={1}
                                                min={PRICE_OPTIONS.min}
                                                max={PRICE_OPTIONS.max}
                                                onValueChange={(value) => {
                                                    setFilter("price", {
                                                        min: value[0],
                                                        max: value[1],
                                                    });
                                                }}
                                                filterType="price"
                                                filters={filters}
                                                className=""
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </CommandItem>
                            <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                <AccordionItem
                                    className="w-full border-none"
                                    value="mileage"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <h3 className="text-md font-semibold">
                                            Mileage | Km
                                        </h3>
                                    </AccordionTrigger>
                                    <AccordionContent className="py-4">
                                        <FiltersSlider
                                            step={MILEAGE_OPTIONS.step}
                                            minStepsBetweenThumbs={1}
                                            min={MILEAGE_OPTIONS.min}
                                            max={MILEAGE_OPTIONS.max}
                                            onValueChange={(value) => {
                                                setFilter("mileage", {
                                                    min: value[0],
                                                    max: value[1],
                                                });
                                            }}
                                            filterType="mileage"
                                            filters={filters}
                                        />
                                    </AccordionContent>
                                </AccordionItem>
                            </CommandItem>
                            <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                <AccordionItem
                                    className="w-full border-none"
                                    value="year"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <h3 className="text-md font-semibold">
                                            Circulation Date
                                        </h3>
                                    </AccordionTrigger>
                                    <AccordionContent className="py-2">
                                        <div>
                                            <FiltersSlider
                                                step={YEAR_OPTIONS.step}
                                                minStepsBetweenThumbs={1}
                                                min={YEAR_OPTIONS.min}
                                                max={YEAR_OPTIONS.max}
                                                onValueChange={(value) => {
                                                    setFilter("year", {
                                                        min: value[0],
                                                        max: value[1],
                                                    });
                                                }}
                                                filterType="year"
                                                filters={filters}
                                                className=""
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </CommandItem>
                            <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                <AccordionItem
                                    className="w-full border-none"
                                    value="power"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <h3 className="text-md font-semibold">
                                            Power | HP
                                        </h3>
                                    </AccordionTrigger>
                                    <AccordionContent className="py-2">
                                        <div>
                                            <FiltersSlider
                                                step={POWER_OPTIONS.step}
                                                minStepsBetweenThumbs={1}
                                                min={POWER_OPTIONS.min}
                                                max={POWER_OPTIONS.max}
                                                onValueChange={(value) => {
                                                    setFilter("power", {
                                                        min: value[0],
                                                        max: value[1],
                                                    });
                                                }}
                                                filterType="power"
                                                filters={filters}
                                                className=""
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </CommandItem>
                            <CommandItem className="dark:text-white w-full transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                <AccordionItem
                                    className="w-full border-none"
                                    value="fuelTypes"
                                >
                                    <AccordionTrigger className="hover:no-underline">
                                        <h3 className="text-md font-semibold">
                                            Fuel Type
                                        </h3>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="flex flex-col gap-y-2 w-full">
                                            {FUEL_OPTIONS.map((option) => (
                                                <div
                                                    key={option}
                                                    className="flex flex-row-reverse items-center justify-between w-full"
                                                >
                                                    <Checkbox
                                                        id={option}
                                                        checked={filters.fuel.includes(
                                                            option
                                                        )}
                                                        defaultChecked={
                                                            filters.fuel[0] ===
                                                            option
                                                        }
                                                        onCheckedChange={(
                                                            value
                                                        ) => {
                                                            if (value) {
                                                                setFilter(
                                                                    "fuel",
                                                                    [
                                                                        ...filters.fuel,
                                                                        option,
                                                                    ]
                                                                );
                                                            } else {
                                                                setFilter(
                                                                    "fuel",
                                                                    filters.fuel.filter(
                                                                        (f) =>
                                                                            f !==
                                                                            option
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                        className="border-black dark:border-white aria-checked:bg-blue-600 w-7 h-7"
                                                    />
                                                    <label
                                                        htmlFor={option}
                                                        className="text-md font-medium"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </CommandItem>
                        </Accordion>
                    </CommandGroup>
                </Command>
                <Button
                    className="mx-auto w-full bg-blue-600 hover:bg-blue-700 mt-5"
                    size={"lg"}
                >
                    Apply
                </Button>
            </div>
        </div>
    );
};

export default OffersSidebar;
