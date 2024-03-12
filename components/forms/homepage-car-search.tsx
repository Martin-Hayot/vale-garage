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
import { CheckIcon } from "lucide-react";
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
        <div className="flex flex-col gap-5 justify-center items-center">
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
                            {selectedMake ? selectedMake : "Select a make..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-full p-0 border-0">
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
                    <PopoverTrigger asChild>
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

                    <PopoverContent className="w-full h-56 p-0 border-0">
                        <Command className="dark:bg-white dark:text-black ">
                            <CommandInput
                                placeholder="Search Car Model..."
                                className="h-9"
                            />
                            <CommandEmpty>No Model found.</CommandEmpty>
                            {makes.map(
                                (make) =>
                                    make === selectedMake && (
                                        <CommandGroup key={make} heading={make}>
                                            <CommandList className="">
                                                {cars
                                                    .filter(
                                                        (car) =>
                                                            car.make === make
                                                    )
                                                    .map((car) => (
                                                        <CommandItem
                                                            value={car.model}
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
            <Button size="lg" className="max-w-32">
                Search
            </Button>
        </div>
    );
};

export default HomePageCarSearch;
