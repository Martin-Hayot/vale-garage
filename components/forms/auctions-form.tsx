"use client";

import * as z from "zod";
import axios from "axios";
import { OffersSchema } from "@/schemas";
import { useEffect, useState, useTransition, Fragment } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Textarea } from "@/components/ui/textarea";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { format, set } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Car } from "@prisma/client";

import {
    CAR_BODIES as carBodies,
    CAR_COLORS as colors,
    FUEL_TYPES as fuelTypes,
    GEARBOX_TYPES as gearBoxes,
    CAR_STATES as states,
    TRANSMISSION_TYPES as transmissions,
} from "@/constants/cars";
import { useMulitstepForm } from "@/hooks/use-multistep-form";
import FormsButton from "./forms-button";
import FileUpload from "./file-upload-modal";
import DragAndDropImageSorter from "./drag&drop-image-sorter";
import { useImages } from "@/store/images";

const steps = [
    {
        id: "step-1",
        title: "Car Model",
        fields: ["carMake", "carModel"],
    },
    {
        id: "step-2",
        title: "Car Details",
        fields: [
            "carBody",
            "mileage",
            "state",
            "circulationDate",
            "color",
            "fuelType",
            "transmission",
            "power",
            "gearBox",
            "seats",
            "doors",
        ],
    },
    {
        id: "step-3",
        title: "Car Images & Models",
        fields: [],
    },
    {
        id: "step-4",
        title: "Offers Details",
        fields: ["price", "description"],
    },
];

export const AuctionsForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [selectedMake, setSelectedMake] = useState<string>("");
    const [cars, setCars] = useState<Car[]>([]);
    const [makes, setMakes] = useState<string[]>([]);

    const { images, setObjects } = useImages();

    const form = useForm<z.infer<typeof OffersSchema>>({
        resolver: zodResolver(OffersSchema),
        defaultValues: {
            carMake: "",
            carModel: "",
            price: 0,
            mileage: 0,
            state: "",
            circulationDate: new Date(),
            description: "",
            fuelType: "",
            transmission: "",
            power: 0,
            carBody: "",
            gearBox: "",
            color: "",
            doors: 0,
            seats: 0,
        },
    });

    const {
        currentStepIndex,
        setCurrentStepIndex,
        next,
        back,
        isFirstStep,
        isLastStep,
        // @ts-ignore
    } = useMulitstepForm(steps, OffersSchema, form);

    const onSubmit = (values: z.infer<typeof OffersSchema>) => {
        setError("");
        setSuccess("");
        console.log("submit", values);
        startTransition(() => {
            axios
                .post("/api/offers", {
                    ...values,
                    images: images,
                })
                .then((res) => {
                    setSuccess(res.data.message);
                    setTimeout(() => {
                        form.reset();
                        setCurrentStepIndex(0);
                        setSuccess("");
                    }, 2000);
                })
                .catch((err) => {
                    setError(err.response.data);
                });
        });

        setObjects([]);
    };

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
        <div>
            <div className="flex flex-row justify-evenly pb-10 px-5">
                {steps.map((step, index) => (
                    <Fragment key={index}>
                        <div
                            key={index}
                            className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary-foreground dark:border-primary-background",
                                index <= currentStepIndex
                                    ? "bg-primary-foreground dark:bg-primary-background text-black"
                                    : "bg-transparent border-muted-foreground dark:border-muted-background text-muted-foreground dark:text-muted-background"
                            )}
                        >
                            {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                key={index + 1}
                                className={cn(
                                    "flex-1 h-0.5 mt-3 bg-primary-foreground dark:bg-primary-background",
                                    index <= currentStepIndex
                                        ? "w-1/2 "
                                        : "w-full bg-muted-foreground dark:bg-muted-background"
                                )}
                            ></div>
                        )}
                    </Fragment>
                ))}
            </div>
            <div className="pb-5">
                {steps.map(
                    (step, index) =>
                        // show title of the current step
                        index === currentStepIndex && (
                            <h1
                                key={index}
                                className="text-2xl font-semibold text-left"
                            >
                                {step.title}
                            </h1>
                        )
                )}
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        {currentStepIndex === 0 && (
                            <div className="flex flex-col md:flex-row justify-start gap-x-6 gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="carMake"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Make</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-[200px] justify-between dark:bg-gray-200 border-0 hover:bg-primary hover:text-primary-foreground dark:hover:text-black",
                                                                !field.value &&
                                                                    "text-muted-foreground",
                                                                field.value &&
                                                                    "text-black"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? field.value
                                                                : "Select a make..."}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-full p-0 border-0">
                                                    <Command className="dark:bg-white dark:text-black ">
                                                        <CommandInput
                                                            placeholder="Search Car Make..."
                                                            className="h-9"
                                                        />
                                                        <CommandEmpty>
                                                            No Make found.
                                                        </CommandEmpty>
                                                        <ScrollArea className="h-64">
                                                            <CommandGroup>
                                                                {makes.map(
                                                                    (make) => (
                                                                        <CommandItem
                                                                            value={
                                                                                make
                                                                            }
                                                                            key={
                                                                                make
                                                                            }
                                                                            className="dark:hover:bg-neutral-200 text-black relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                                            onSelect={() => {
                                                                                field.onChange(
                                                                                    make
                                                                                );
                                                                                setSelectedMake(
                                                                                    make
                                                                                );
                                                                            }}
                                                                        >
                                                                            {
                                                                                make
                                                                            }
                                                                            <CheckIcon
                                                                                className={cn(
                                                                                    "ml-auto h-4 w-4",
                                                                                    make ===
                                                                                        field.value
                                                                                        ? "opacity-100"
                                                                                        : "opacity-0"
                                                                                )}
                                                                            />
                                                                        </CommandItem>
                                                                    )
                                                                )}
                                                            </CommandGroup>
                                                        </ScrollArea>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="carModel"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Model</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-[200px] justify-between dark:bg-gray-200 border-0 hover:bg-primary hover:text-primary-foreground dark:hover:text-black",
                                                                !field.value &&
                                                                    "text-muted-foreground",
                                                                field.value &&
                                                                    "text-black"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? field.value
                                                                : "Select a Model..."}
                                                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>

                                                <PopoverContent className="w-full h-56 p-0 border-0">
                                                    <Command className="dark:bg-white dark:text-black ">
                                                        <CommandInput
                                                            placeholder="Search Car Model..."
                                                            className="h-9"
                                                        />
                                                        <CommandEmpty>
                                                            No Model found.
                                                        </CommandEmpty>
                                                        {makes.map(
                                                            (make) =>
                                                                make ===
                                                                    selectedMake && (
                                                                    <CommandGroup
                                                                        key={
                                                                            make
                                                                        }
                                                                        heading={
                                                                            make
                                                                        }
                                                                    >
                                                                        <CommandList className="">
                                                                            {cars
                                                                                .filter(
                                                                                    (
                                                                                        car
                                                                                    ) =>
                                                                                        car.make ===
                                                                                        make
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        car
                                                                                    ) => (
                                                                                        <CommandItem
                                                                                            value={
                                                                                                car.model
                                                                                            }
                                                                                            key={
                                                                                                car.model
                                                                                            }
                                                                                            className="dark:hover:bg-neutral-200 text-black relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-neutral-200 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                                                            onSelect={() =>
                                                                                                field.onChange(
                                                                                                    car.model
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                car.model
                                                                                            }
                                                                                            <CheckIcon
                                                                                                className={cn(
                                                                                                    "ml-auto h-4 w-4",
                                                                                                    car.model ===
                                                                                                        field.value
                                                                                                        ? "opacity-100"
                                                                                                        : "opacity-0"
                                                                                                )}
                                                                                            />
                                                                                        </CommandItem>
                                                                                    )
                                                                                )}
                                                                        </CommandList>
                                                                    </CommandGroup>
                                                                )
                                                        )}
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}
                        {currentStepIndex === 1 && (
                            <>
                                <div className="flex flex-col md:flex-row justify-start gap-6">
                                    <FormField
                                        name="carBody"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Car Body</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="mr-2 border-0 dark:bg-neutral-200 text-black ">
                                                            <SelectValue placeholder="Car Body" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="border-0 dark:bg-neutral-200 text-black">
                                                        {carBodies.map(
                                                            (carBody) => (
                                                                <SelectItem
                                                                    key={
                                                                        carBody
                                                                    }
                                                                    value={
                                                                        carBody
                                                                    }
                                                                    onSelect={
                                                                        field.onChange
                                                                    }
                                                                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                                >
                                                                    {carBody}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="mileage"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Mileage (Km)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Mileage of the car"
                                                        type="number"
                                                        className="border-0 dark:bg-neutral-200 text-black min-w-44"
                                                        value={field.value}
                                                        inputMode="numeric"
                                                        max={1000000}
                                                        min={0}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row justify-start gap-x-10 gap-y-6">
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                            <SelectValue placeholder="State of the car" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                        {states.map((state) => (
                                                            <SelectItem
                                                                key={state}
                                                                value={state}
                                                                onSelect={
                                                                    field.onChange
                                                                }
                                                                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                            >
                                                                {state}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fuelType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fuel Type</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                            <SelectValue placeholder="Fuel type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                        {fuelTypes.map(
                                                            (fuelType) => (
                                                                <SelectItem
                                                                    key={
                                                                        fuelType
                                                                    }
                                                                    value={
                                                                        fuelType
                                                                    }
                                                                    onSelect={
                                                                        field.onChange
                                                                    }
                                                                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                                >
                                                                    {fuelType}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="transmission"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Transmission
                                                </FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                            <SelectValue placeholder="Transmission" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                        {transmissions.map(
                                                            (transmission) => (
                                                                <SelectItem
                                                                    key={
                                                                        transmission
                                                                    }
                                                                    value={
                                                                        transmission
                                                                    }
                                                                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                                    onSelect={
                                                                        field.onChange
                                                                    }
                                                                >
                                                                    {
                                                                        transmission
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row justify-start gap-x-10 gap-y-6">
                                    <FormField
                                        name="power"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem className="">
                                                <FormLabel>
                                                    Power (hp)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Power of the car"
                                                        className="border-0 dark:bg-neutral-200 text-black"
                                                        type="number"
                                                        max={1000}
                                                        min={0}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="color"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Color</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                            <SelectValue placeholder="Color" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                        {colors.map((color) => (
                                                            <SelectItem
                                                                key={color}
                                                                value={color}
                                                                onSelect={
                                                                    field.onChange
                                                                }
                                                                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                            >
                                                                {color}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="gearBox"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gear Box</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                            <SelectValue placeholder="Gear Box" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent className="mr-2 border-0 dark:bg-neutral-200 text-black">
                                                        {gearBoxes.map(
                                                            (gearBox) => (
                                                                <SelectItem
                                                                    key={
                                                                        gearBox
                                                                    }
                                                                    value={
                                                                        gearBox
                                                                    }
                                                                    onSelect={
                                                                        field.onChange
                                                                    }
                                                                    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                                                >
                                                                    {gearBox}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <FormField
                                        name="seats"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Seats</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Number of seats"
                                                        type="number"
                                                        className="border-0 dark:bg-neutral-200 text-black"
                                                        step={1}
                                                        max={10}
                                                        min={0}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        name="doors"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Doors</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        placeholder="Number of doors"
                                                        type="number"
                                                        className="border-0 dark:bg-neutral-200 text-black"
                                                        step={1}
                                                        max={10}
                                                        min={0}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="circulationDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Circulation Date
                                            </FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal border-0 dark:bg-neutral-200 text-black hover:bg-neutral-300",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "PPP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0 border-0 dark:bg-neutral-200 text-black"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        captionLayout="dropdown-buttons"
                                                        fromYear={1950}
                                                        toYear={new Date().getFullYear()}
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        onDayClick={
                                                            field.onChange
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}

                        {currentStepIndex === 2 && (
                            <>
                                <FileUpload />

                                {JSON.stringify(images)}
                                {images.length > 0 && (
                                    <DragAndDropImageSorter
                                        key={JSON.stringify(images)}
                                    />
                                )}

                                {/* <FileUpload /> */}
                            </>
                        )}
                        {currentStepIndex === 3 && (
                            <>
                                <FormField
                                    name="description"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    placeholder="Description of the car..."
                                                    disabled={isPending}
                                                    className="dark:bg-gray-200 dark:text-black border-0"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex flex-col md:flex-row justify-start gap-x-6">
                                    <FormField
                                        name="price"
                                        control={form.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <span className="relative">
                                                        <Input
                                                            {...field}
                                                            disabled={isPending}
                                                            placeholder="Price of the car"
                                                            type="number"
                                                            className="border-0 dark:bg-neutral-200 text-black min-w-44"
                                                            max={1000000}
                                                            min={0}
                                                        />
                                                        <span className="absolute inset-y-0 right-0 pt-[22px] flex items-center mr-8 text-muted-foreground">
                                                            €
                                                        </span>
                                                    </span>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <FormsButton
                        currentStepIndex={currentStepIndex}
                        isFirstStep={isFirstStep}
                        isLastStep={isLastStep}
                        disabled={isPending}
                        next={next}
                        back={back}
                    />
                </form>
            </Form>
        </div>
    );
};
