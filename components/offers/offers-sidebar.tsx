import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Slider } from "@/components/ui/slider";
import { COLOR_OPTIONS, FUEL_OPTIONS } from "@/constants/filters";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFilters } from "@/store/filters";

const OffersSidebar = () => {
    const { color, setFilter } = useFilters();

    return (
        <div className="hidden dark:bg-neutral-800 bg-neutral-200 rounded-lg p-5 w-72 lg:block">
            <div className="flex flex-row items-center justify-between">
                <h2 className="font-semibold text-2xl">Filters</h2>
                <Button
                    variant="link"
                    type="reset"
                    className="text-accent text-md"
                >
                    Reset
                </Button>
            </div>
            <div>
                <Command className="dark:bg-neutral-800 bg-neutral-200">
                    <div className="hover:bg-neutral-100 transition-colors duration-200 focus-within:bg-neutral-100 dark:focus-within:bg-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700">
                        <CommandInput placeholder="Search Filter..." />
                    </div>
                    <CommandGroup>
                        <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <h3 className="text-md font-semibold pb-4">
                                Price | €
                            </h3>
                            <Slider
                                step={100}
                                minStepsBetweenThumbs={1}
                                min={500}
                                max={50000}
                                className=""
                            />
                        </CommandItem>
                        <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <h3 className="text-md font-semibold pb-4">
                                Mileage | Km
                            </h3>
                            <Slider
                                step={5000}
                                minStepsBetweenThumbs={1}
                                min={0}
                                max={300000}
                                className=""
                            />
                        </CommandItem>
                        <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <h3 className="text-md font-semibold pb-4">Year</h3>
                            <Slider
                                step={1}
                                minStepsBetweenThumbs={1}
                                min={1970}
                                max={new Date().getFullYear()}
                                className=""
                            />
                        </CommandItem>
                        <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <h3 className="text-md font-semibold pb-4">
                                Power | HP
                            </h3>
                            <Slider
                                step={20}
                                minStepsBetweenThumbs={1}
                                min={20}
                                max={500}
                                className=""
                            />
                        </CommandItem>
                        <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <h3 className="text-md font-semibold pb-4">
                                Fuel Type
                            </h3>
                            <div className="flex flex-col gap-y-2 w-full">
                                {FUEL_OPTIONS.map((option) => (
                                    <div
                                        key={option}
                                        className="flex flex-row-reverse items-center justify-between w-full"
                                    >
                                        <Checkbox
                                            id={option}
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
                        </CommandItem>
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
