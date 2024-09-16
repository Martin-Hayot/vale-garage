import { Menu } from "lucide-react";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import OffersSidebar from "./offers/offers-sidebar";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Command, CommandGroup, CommandInput, CommandItem } from "./ui/command";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import FiltersSlider from "./offers/filters-slider";
import {
    FUEL_OPTIONS,
    MILEAGE_OPTIONS,
    POWER_OPTIONS,
    PRICE_OPTIONS,
    YEAR_OPTIONS,
} from "@/constants/filters";
import { useFilters } from "@/store/filters";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

export const MobileFiltersToggle = () => {
    const [open, setOpen] = useState(false);

    const { filters, setFilter, resetFilters } = useFilters();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger onClick={() => setOpen(!open)} asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="lg:hidden dark:bg-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-white hover:bg-neutral-100"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="">
                <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <ScrollArea className="w-full mt-2 h-[90%] overflow-y-auto">
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
                                                                filters
                                                                    .fuel[0] ===
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
                                                                            (
                                                                                f
                                                                            ) =>
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
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
