"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { MerchantsSchema } from "@/schemas";
import axios from "axios";

export const MerchantsForm = () => {
    const form = useForm<z.infer<typeof MerchantsSchema>>({
        resolver: zodResolver(MerchantsSchema),
        defaultValues: {
            name: "",
            vatNumber: "",
        },
    });

    async function onSubmit(values: z.infer<typeof MerchantsSchema>) {
        const { vatNumber } = values;
        const url = `https://controleerbtwnummer.eu/api/validate/${vatNumber}.json`;

        const res = await axios.get(url);

        if (res.data.error) {
            return toast({
                title: "Error",
                description: "An error occurred. Please try again later.",
                variant: "destructive",
            });
        }
        if (res.data.valid === false) {
            return toast({
                title: "Invalid VAT Number",
                description: "Please enter a valid VAT number",
                variant: "destructive",
            });
        }

        axios.post("/api/merchants", values).then(() => {});
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Company name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VAT Number</FormLabel>
                            <FormControl>
                                <Input
                                    maxLength={12}
                                    placeholder="Your VAT number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
