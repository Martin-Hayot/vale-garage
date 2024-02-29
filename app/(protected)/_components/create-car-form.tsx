"use client";

import * as z from "zod";
import axios from "axios";
import { CreateCarSchema } from "@/schemas";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useRouter } from "next/navigation";

export const CreateCarForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateCarSchema>>({
        resolver: zodResolver(CreateCarSchema),
        defaultValues: {
            make: "",
            model: "",
        },
    });

    const onSubmit = (values: z.infer<typeof CreateCarSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            axios
                .post("/api/cars", values)
                .then((res) => {
                    setSuccess(res.data.message);
                    form.reset();
                    router.refresh();
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
                    <FormField
                        name="make"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Make</FormLabel>
                                <Input
                                    {...field}
                                    placeholder="Make"
                                    type="text"
                                    className="w-full"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="model"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model</FormLabel>
                                <Input
                                    {...field}
                                    placeholder="Model"
                                    type="text"
                                    className="w-full"
                                />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                    Create Car Model
                </Button>
            </form>
        </Form>
    );
};
