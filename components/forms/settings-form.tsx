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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { CheckCircle, Settings } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { MerchantsForm } from "./merchants-form";

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
            getSettingsByUserId(data.user.id).then((settings) => {
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
        <Card className="w-[300px] md:w-[500px] lg:w-[600px]  bg-neutral-700">
            <CardHeader className="text-2xl font-semibold flex justify-center items-center flex-row">
                <Settings className="mr-2 h-8 w-8" />
                Settings
            </CardHeader>
            <CardContent>
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
                                            <FormItem className="flex flex-row justify-between items-center">
                                                <FormLabel className="text-md">
                                                    Enable Two Factor
                                                    Authentication
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
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Update
                        </Button>
                    </form>
                </Form>
                <div className="mt-6">
                    {data?.user.role === "MERCHANT" ? (
                        <div className="flex flex-row justify-between items-center bg-green-300 bg-opacity-20 p-3 rounded">
                            <p className="text-">
                                You already have a merchant account
                            </p>
                            <CheckCircle className="h-6 w-6 text-green-600 " />
                        </div>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button type="button">
                                    Become a B2B Merchant
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogTitle>Become a B2B Merchant</DialogTitle>
                                <MerchantsForm />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
                <div className="mt-10 space-x-4">
                    <Button variant="outline">Sign out</Button>
                    <Button className="" variant="destructive">
                        Delete Account
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
