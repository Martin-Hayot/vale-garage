"use client";

import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { settings, getSettingsByUserId } from "@/actions/settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const SettingsForm = () => {
    const { update, data } = useSession();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: data?.user.name || "",
            isTwoFactorEnabled: data?.user.isTwoFactorEnabled || false,
        },
    });

    useEffect(() => {
        if (data?.user) {
            getSettingsByUserId(data.user.id!).then((settings) => {
                form.reset({
                    name: settings?.name || "",
                    isTwoFactorEnabled: settings?.isTwoFactorEnabled,
                });
            });
        }
    }, [form, data?.user]);

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            startTransition(() => {
                settings({
                    name: values.name,
                    isTwoFactorEnabled: values.isTwoFactorEnabled,
                })
                    .then(() => {
                        update();
                        setSuccess("Settings updated");
                    })
                    .catch(() => {
                        setError("Something went wrong! Please try again.");
                    });
            });
        });
    };

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-6">
                        <FormField
                            name="name"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-md">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="w-44 md:w-72 bg-neutral-200 text-black"
                                            placeholder="John Doe"
                                            disabled={isPending}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {data?.user.provider !== "github" &&
                            data?.user.provider !== "google" && (
                                <FormField
                                    name="isTwoFactorEnabled"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row w-full max-w-xl justify-between items-center">
                                            <FormLabel className="text-md">
                                                Enable Two Factor Authentication
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    {...field}
                                                    className="ml-2 data-[state=checked]:bg-primary data-[state=unchecked]:bg-neutral-300 "
                                                    disabled={isPending}
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                    value={
                                                        field.value
                                                            ? "true"
                                                            : "false"
                                                    } // Fix: Convert boolean value to string
                                                    aria-readonly
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isPending} type="submit">
                        Update
                    </Button>
                </form>
            </Form>
        </div>
    );
};
