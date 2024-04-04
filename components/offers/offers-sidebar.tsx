import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Slider } from "@/components/ui/slider";
import { COLOR_OPTIONS } from "@/constants/filters";
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
        <div className="hidden dark:bg-neutral-800 bg-neutral-200 rounded-lg p-5 w-64 lg:block">
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
                    <CommandInput
                        className="dark:bg-neutral-800"
                        placeholder="Search Filter..."
                    />
                    <CommandGroup>
                        <CommandItem className="dark:text-white transition-all py-2 pb-4 duration-200 flex flex-col items-start text-black relative  cursor-default select-none rounded-sm px-2 text-sm outline-none dark:aria-selected:bg-neutral-800 aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <h3 className="text-md font-semibold pb-4">
                                Price
                            </h3>
                            <Slider
                                step={100}
                                minStepsBetweenThumbs={1}
                                min={500}
                                max={50000}
                                className=""
                            />
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </div>
        </div>
    );
};

export default OffersSidebar;
