"use client";

import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
    Command,
    CommandInput,
    CommandEmpty,
    CommandGroup,
    CommandList,
    CommandItem,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Car } from "@prisma/client";
import axios from "axios";

const HomePageCarSearch = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [makes, setMakes] = useState<string[]>([]);
    const [selectedMake, setSelectedMake] = useState<string | null>(null);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);

    useEffect(() => {
        const getCars = () => {
            axios
                .get("/api/cars")
                .then((res) => {
                    setCars(res.data);
                    setMakes(
                        Array.from(
                            new Set(res.data.map((car: Car) => car.make))
                        )
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getCars();
    }, []);
    return (
        <div className="bg-neutral-200 dark:bg-neutral-800 py-8 px-6 md:px-16 rounded-lg shadow-lg mx-auto max-w-4xl">
            <h2 className="text-center dark:text-white text-2xl md:text-3xl font-semibold mb-6">
                Search for your dream car
            </h2>
            <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
                <div className="flex flex-col md:flex-row gap-5">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-[200px] justify-between dark:bg-gray-200 border-0 hover:bg-primary hover:text-primary-foreground dark:hover:text-black",
                                    !selectedMake && "text-muted-foreground",
                                    selectedMake && "text-black"
                                )}
                            >
                                {selectedMake
                                    ? selectedMake
                                    : "Select a make..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            side="bottom"
                            className="w-full h-56 p-0 border-0"
                        >
                            <Command className="dark:bg-white dark:text-black ">
                                <CommandInput
                                    placeholder="Search Car Make..."
                                    className="h-9"
                                />
                                <CommandEmpty>No Make found.</CommandEmpty>
                                <ScrollArea className="h-64">
                                    <CommandGroup>
                                        {makes.map((make) => (
                                            <CommandItem
                                                value={make}
                                                key={make}
                                                className="dark:hover:bg-neutral-200 text-black relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                onSelect={() => {
                                                    setSelectedMake(make);
                                                }}
                                            >
                                                {make}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        make === selectedMake
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </ScrollArea>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <Popover>
                        <PopoverTrigger disabled={!selectedMake} asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                    "w-[200px] justify-between dark:bg-gray-200 border-0 hover:bg-primary hover:text-primary-foreground dark:hover:text-black",
                                    !selectedModel && "text-muted-foreground",
                                    selectedModel && "text-black"
                                )}
                            >
                                {selectedModel
                                    ? selectedModel
                                    : "Select a Model..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent
                            side="bottom"
                            className="w-full h-56 p-0 border-0"
                        >
                            <Command className="dark:bg-white dark:text-black ">
                                <CommandInput
                                    placeholder="Search Car Model..."
                                    className="h-9"
                                />
                                <CommandEmpty>No Model found.</CommandEmpty>
                                {makes.map(
                                    (make) =>
                                        make === selectedMake && (
                                            <CommandGroup
                                                key={make}
                                                heading={make}
                                            >
                                                <CommandList className="">
                                                    {cars
                                                        .filter(
                                                            (car) =>
                                                                car.make ===
                                                                make
                                                        )
                                                        .map((car) => (
                                                            <CommandItem
                                                                value={
                                                                    car.model
                                                                }
                                                                key={car.model}
                                                                className="dark:hover:bg-neutral-200 text-black relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                                onSelect={() =>
                                                                    setSelectedModel(
                                                                        car.model
                                                                    )
                                                                }
                                                            >
                                                                {car.model}
                                                                <CheckIcon
                                                                    className={cn(
                                                                        "ml-auto h-4 w-4",
                                                                        car.model ===
                                                                            selectedModel
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                </CommandList>
                                            </CommandGroup>
                                        )
                                )}
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>

                <Button
                    type="submit"
                    className="w-full md:w-1/6 px-6 py-3 -mb-2 mt-2 md:-mb-0 md:mt-0 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 shadow-md"
                >
                    <div className="flex flex-row items-center">
                        <Search className="w-4 h-4 mr-2" />
                        <span>Search</span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default HomePageCarSearch;
