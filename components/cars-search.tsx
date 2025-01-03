"use client";

import { Car } from "@prisma/client";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CarsSearchProps {
    carsData: Car[] | [];
    canDelete?: boolean;
}

const CarsSearch = ({ carsData, canDelete }: CarsSearchProps) => {
    const cars = carsData;
    // sort cars array by make
    cars.sort((a, b) => a.make.localeCompare(b.make));
    const { toast } = useToast();
    const router = useRouter();
    const makes = Array.from(new Set(cars.map((car) => car.make)));

    const onClick = (model: string, make: string) => {
        axios
            .delete("/api/cars/", {
                data: { model, make },
            })
            .then((res) => {
                toast({
                    title: "Car Model deleted",
                    description: res.data.message,
                    variant: "default",
                });
                router.refresh();
            })
            .catch((error) => {
                console.error(error);
                toast({
                    title: "Error deleting car model",
                    description: error.message,
                    variant: "destructive",
                });
            });
    };
    return (
        <div className="flex items-center overflow-auto h-60">
            <Command className="dark:bg-neutral-200 dark:text-black">
                <CommandInput placeholder="Search a car model" />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {makes.map((make) => (
                        <CommandGroup key={make} heading={make}>
                            {cars
                                .sort((a, b) => a.model.localeCompare(b.model))
                                .filter((car): car is Car => car.make === make)
                                .map((car) => (
                                    <CommandItem
                                        key={car.model}
                                        className="w-full dark:text-black flex flex-row items-center justify-between aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-700 dark:aria-selected:text-white"
                                    >
                                        <div>
                                            <span className="hidden">
                                                {car.make}{" "}
                                            </span>
                                            {car.model}
                                        </div>
                                        <div>
                                            {canDelete && (
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <X className="w-5 h-5 text-neutral-800 bg-neutral-100 rounded-sm hover:bg-neutral-300 transition-colors" />
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Are you
                                                                absolutely sure?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action
                                                                cannot be
                                                                undone. This
                                                                will permanently
                                                                delete the car
                                                                model.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="hover:bg-primary hover:text-primary-foreground">
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    onClick(
                                                                        car.model,
                                                                        car.make
                                                                    )
                                                                }
                                                                className="bg-red-600 hover:bg-red-700"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            )}
                                        </div>
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    ))}
                </CommandList>
            </Command>
        </div>
    );
};
export default CarsSearch;
