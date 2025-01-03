"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { motion } from "framer-motion";

import { AppointmentSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import PhoneInput from "../phone-input";
import { sendAppointmentEmail } from "@/lib/mail";
import { appointment } from "@/actions/appointments";
import { useState } from "react";

interface AppointmentsFormProps {
    children: React.ReactNode;
}

const AppointmentsForm = ({ children }: AppointmentsFormProps) => {
    const [status, setStatus] = useState<
        "idle" | "loading" | "error" | "success"
    >("idle");
    const user = useCurrentUser();

    const name = user?.name?.split(" ");
    const form = useForm<z.infer<typeof AppointmentSchema>>({
        resolver: zodResolver(AppointmentSchema),
        defaultValues: {
            gender: "",
            firstname: name ? name[0] : "",
            lastname: name ? name[1] : "",
            email: user?.email || "",
            phone: "+32",
            message: "Hi, I would like to take an appointment",
        },
    });

    const onSubmit = (data: z.infer<typeof AppointmentSchema>) => {
        setStatus("loading");
        appointment(data)
            .then((response) => {
                if (response.error) {
                    setStatus("error");
                }
                if (response.success) {
                    setStatus("success");
                }
            })
            .catch(() => {
                setStatus("error");
            });
        setTimeout(() => {
            setStatus("idle");
        }, 5000);
    };
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="w-full max-w-full sm:max-w-[540px] md:max-w-[640px] lg:max-w-[720px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Take an appointment</SheetTitle>
                    <SheetDescription>
                        Please fill the form below to take an appointment
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex flex-row gap-4"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="He" />
                                                    </FormControl>
                                                    <FormLabel>He</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="She" />
                                                    </FormControl>
                                                    <FormLabel>She</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value="Other" />
                                                    </FormControl>
                                                    <FormLabel>Other</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <PhoneInput
                                                fieldValue={field.value}
                                            >
                                                <Input
                                                    className="w-full"
                                                    type="tel"
                                                    {...field}
                                                />
                                            </PhoneInput>
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                className="inline-block h-32 md:h-44 max-h-44 overflow-y-auto"
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full">
                                <Button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-blue-700 hover:bg-blue-800"
                                >
                                    {status === "idle" && (
                                        <motion.div>Send</motion.div>
                                    )}
                                    {status === "loading" && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="22"
                                            height="22"
                                            viewBox="0 0 38 38"
                                            stroke="#fff"
                                        >
                                            <g fill="none" fill-rule="evenodd">
                                                <g
                                                    transform="translate(1 1)"
                                                    stroke-width="2"
                                                >
                                                    <circle
                                                        stroke-opacity=".5"
                                                        cx="18"
                                                        cy="18"
                                                        r="18"
                                                    />
                                                    <path d="M36 18c0-9.94-8.06-18-18-18">
                                                        <animateTransform
                                                            attributeName="transform"
                                                            type="rotate"
                                                            from="0 18 18"
                                                            to="360 18 18"
                                                            dur="1s"
                                                            repeatCount="indefinite"
                                                        />
                                                    </path>
                                                </g>
                                            </g>
                                        </svg>
                                    )}
                                    {status === "error" && (
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{
                                                    duration: 0.5,
                                                    type: "tween",
                                                    ease: "easeOut",
                                                }}
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M6 18 17.94 6M18 18 6.06 6"
                                            />
                                        </svg>
                                    )}
                                    {status === "success" && (
                                        <svg
                                            className="w-6 h-6 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <motion.path
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{
                                                    duration: 0.3,
                                                    type: "tween",
                                                    ease: "easeOut",
                                                }}
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 11.917 9.724 16.5 19 7.5"
                                            />
                                        </svg>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AppointmentsForm;
