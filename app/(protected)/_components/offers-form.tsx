"use client";

import * as z from "zod";
import { OffersSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { register } from "@/actions/register";

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
import { format, set } from "date-fns";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const makes = [
    "Audi",
    "BMW",
    "Chevrolet",
    "Citroën",
    "Dacia",
    "Fiat",
    "Ford",
    "Honda",
    "Hyundai",
    "Kia",
    "Mazda",
    "Mercedes-Benz",
    "Mitsubishi",
    "Nissan",
    "Opel",
    "Peugeot",
    "Renault",
    "Seat",
    "Skoda",
    "Suzuki",
    "Toyota",
    "Volkswagen",
    "Volvo",
];

const models = [
    {
        make: "Audi",
        models: [
            "A1",
            "A2",
            "A3",
            "A4",
            "A5",
            "A6",
            "A7",
            "A8",
            "Q2",
            "Q3",
            "Q4",
            "Q5",
            "Q6",
            "Q7",
            "Q8",
            "Q9",
            "R8",
            "RS3",
            "RS4",
            "RS5",
            "RS6",
            "RS7",
            "S1",
            "S3",
            "S4",
            "S5",
            "S6",
            "S7",
            "S8",
            "SQ2",
            "SQ5",
            "SQ7",
            "SQ8",
            "TT",
            "TTS",
            "TT RS",
            "e-tron",
            "e-tron GT",
            "e-tron S",
            "e-tron Sportback",
            "e-tron S Sportback",
        ],
    },
    {
        make: "BMW",
        models: [
            "1 Series",
            "2 Series",
            "3 Series",
            "4 Series",
            "5 Series",
            "6 Series",
            "7 Series",
            "8 Series",
            "M2",
            "M3",
            "M4",
            "M5",
            "M6",
            "X1",
            "X2",
            "X3",
            "X4",
            "X5",
            "X6",
            "X7",
            "Z3",
            "Z4",
            "i3",
            "i4",
            "i8",
        ],
    },
    {
        make: "Chevrolet",
        models: [
            "Alero",
            "Astro",
            "Avalanche",
            "Aveo",
            "Beretta",
            "Blazer",
            "Camaro",
            "Captiva",
            "Cavalier",
            "Chevy Van",
            "Colorado",
            "Corsica",
            "Corvette",
            "Cruze",
            "Epica",
            "Equinox",
            "Evanda",
            "Express",
            "HHR",
            "Impala",
            "Kalos",
            "Lacetti",
            "Lumina",
            "Malibu",
            "Matiz",
            "Monte Carlo",
            "Niva",
            "Nubira",
            "Orlando",
            "Rezzo",
            "S-10",
            "Silverado",
            "Spark",
            "Suburban",
            "Tacuma",
            "Tahoe",
            "Tavera",
            "TrailBlazer",
        ],
    },
];

const fuelTypes = ["Diesel", "Petrol", "Electric", "Hybrid", "LPG", "CNG"];

const states = ["New", "Used", "Damaged", "Nearly New", "Reconditioned"];

const transmissions = ["Automatic", "Manual"];
const carBodies = [
    "Sedan",
    "SUV",
    "Coupe",
    "Hatchback",
    "Pickup",
    "Minivan",
    "Cabriolet",
    "Sport",
    "Roadster",
];

export const OffersForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [selectedMake, setSelectedMake] = useState<string>("");

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

    const onSubmit = (values: z.infer<typeof OffersSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {});
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
                                                {models.map(
                                                    (make) =>
                                                        make.make ===
                                                            selectedMake && (
                                                            <CommandGroup
                                                                key={make.make}
                                                                heading={
                                                                    make.make
                                                                }
                                                            >
                                                                <CommandList className="">
                                                                    {make.models.map(
                                                                        (
                                                                            model
                                                                        ) => (
                                                                            <CommandItem
                                                                                value={
                                                                                    model
                                                                                }
                                                                                key={
                                                                                    model
                                                                                }
                                                                                onSelect={() =>
                                                                                    field.onChange(
                                                                                        model
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    model
                                                                                }
                                                                                <CheckIcon
                                                                                    className={cn(
                                                                                        "ml-auto h-4 w-4",
                                                                                        model ===
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
                                    <FormLabel>Mileage</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Mileage of the car"
                                            type="number"
                                            step={100}
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
                                            <SelectItem
                                                value="Automatic"
                                                onSelect={field.onChange}
                                            >
                                                Automatic
                                            </SelectItem>
                                            <SelectItem
                                                value="Manual"
                                                onSelect={field.onChange}
                                            >
                                                Manual
                                            </SelectItem>
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
                                            <SelectItem
                                                value="Automatic"
                                                onSelect={field.onChange}
                                            >
                                                Automatic
                                            </SelectItem>
                                            <SelectItem
                                                value="Manual"
                                                onSelect={field.onChange}
                                            >
                                                Manual
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date("1900-01-01")
                                            }
                                            initialFocus
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
                                                step={100}
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
