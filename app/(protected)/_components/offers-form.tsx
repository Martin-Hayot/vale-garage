"use client";

import * as z from "zod";
import axios from "axios";
import { OffersSchema } from "@/schemas";
import { useEffect, useState, useTransition } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import Link from "next/link";
import { Car } from "@prisma/client";

import {
    CAR_BODIES as carBodies,
    CAR_COLORS as colors,
    FUEL_TYPES as fuelTypes,
    GEARBOX_TYPES as gearBoxes,
    CAR_STATES as states,
    TRANSMISSION_TYPES as transmissions,
} from "@/constants/cars";

export const OffersForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [selectedMake, setSelectedMake] = useState<string>("");
    const [cars, setCars] = useState<Car[]>([]);
    const [makes, setMakes] = useState<string[]>([]);

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

    const onSubmit = (values: z.infer<typeof OffersSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            axios
                .post("/api/offers", values)
                .then((res) => {
                    setSuccess(res.data.message);
                })
                .catch((err) => {
                    setError(err.response.data);
                });
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-start gap-x-6">
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
                                                        "w-[200px] justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? field.value
                                                        : "Select a make..."}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search Car Make..."
                                                    className="h-9"
                                                />
                                                <CommandEmpty>
                                                    No Make found.
                                                </CommandEmpty>
                                                <ScrollArea className="h-64">
                                                    <CommandGroup>
                                                        {makes.map((make) => (
                                                            <CommandItem
                                                                value={make}
                                                                key={make}
                                                                onSelect={() => {
                                                                    field.onChange(
                                                                        make
                                                                    );
                                                                    setSelectedMake(
                                                                        make
                                                                    );
                                                                }}
                                                            >
                                                                {make}
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
                                                        ))}
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
                                                        "w-[200px] justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value
                                                        ? field.value
                                                        : "Select a Model..."}
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-full h-96 p-0">
                                            <Command>
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
                                                                key={make}
                                                                heading={make}
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
                    <FormDescription>
                        {"Can't find a car model ? Create a new one "}
                        <Link
                            href="/cars/models"
                            className="text-black underline"
                        >
                            here
                        </Link>
                    </FormDescription>
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col md:flex-row justify-start gap-x-6">
                        <FormField
                            name="carBody"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Car Body</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mr-2">
                                                <SelectValue placeholder="Car Body" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="mr-2">
                                            {carBodies.map((carBody) => (
                                                <SelectItem
                                                    key={carBody}
                                                    value={carBody}
                                                    onSelect={field.onChange}
                                                >
                                                    {carBody}
                                                </SelectItem>
                                            ))}
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
                                    <FormLabel>Mileage (Km)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Mileage of the car"
                                            type="number"
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
                    <div className="flex flex-col md:flex-row justify-start gap-x-10">
                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mr-2">
                                                <SelectValue placeholder="State of the car" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="mr-2">
                                            {states.map((state) => (
                                                <SelectItem
                                                    key={state}
                                                    value={state}
                                                    onSelect={field.onChange}
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
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mr-2">
                                                <SelectValue placeholder="Fuel type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="mr-2">
                                            {fuelTypes.map((fuelType) => (
                                                <SelectItem
                                                    key={fuelType}
                                                    value={fuelType}
                                                    onSelect={field.onChange}
                                                >
                                                    {fuelType}
                                                </SelectItem>
                                            ))}
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
                                    <FormLabel>Transmission</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mr-2">
                                                <SelectValue placeholder="Transmission" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="mr-2">
                                            {transmissions.map(
                                                (transmission) => (
                                                    <SelectItem
                                                        key={transmission}
                                                        value={transmission}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                    >
                                                        {transmission}
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
                    <div className="flex flex-col md:flex-row justify-start gap-x-10">
                        <FormField
                            name="power"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Power (hp)</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Power of the car"
                                            type="number"
                                            step={10}
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
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mr-2">
                                                <SelectValue placeholder="Color" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="mr-2">
                                            {colors.map((color) => (
                                                <SelectItem
                                                    key={color}
                                                    value={color}
                                                    onSelect={field.onChange}
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
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="mr-2">
                                                <SelectValue placeholder="Gear Box" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="mr-2">
                                            {gearBoxes.map((gearBox) => (
                                                <SelectItem
                                                    key={gearBox}
                                                    value={gearBox}
                                                    onSelect={field.onChange}
                                                >
                                                    {gearBox}
                                                </SelectItem>
                                            ))}
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
                                <FormLabel>Circulation Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            captionLayout="dropdown-buttons"
                                            fromYear={1950}
                                            toYear={new Date().getFullYear()}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            onDayClick={field.onChange}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    Enter the date of the first day the car was
                                    put into circulation
                                </FormDescription>
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
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                    Send Offer
                </Button>
            </form>
        </Form>
    );
};
