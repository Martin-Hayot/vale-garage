"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectItem,
} from "@/components/ui/select";
import { format, setMonth } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium hidden",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary/50 [&:has([aria-selected])]:bg-primary [&:has([aria-selected])]:rounded-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-neutral-300 aria-selected:bg-primary"
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground hover:bg-neutral-300 aria-selected:bg-primary",
                day_today:
                    "bg-accent hover:bg-primary hover:text-primary-foreground text-accent-foreground",
                day_outside:
                    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                caption_dropdowns: "flex gap-2",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => (
                    <ChevronRight className="h-4 w-4" />
                ),
                Dropdown: (props) => {
                    const {
                        fromDate,
                        fromMonth,
                        fromYear,
                        toDate,
                        toMonth,
                        toYear,
                    } = useDayPicker();
                    const { goToMonth, currentMonth } = useNavigation();
                    if (props.name === "months") {
                        const selectItems = Array.from(
                            { length: 12 },
                            (_, i) => ({
                                value: i.toString(),
                                label: format(setMonth(new Date(), i), "MMM"),
                            })
                        );
                        return (
                            <Select
                                onValueChange={(newValue) => {
                                    const newDate = new Date(currentMonth);
                                    newDate.setMonth(parseInt(newValue));
                                    goToMonth(newDate);
                                }}
                                value={props.value?.toString()}
                            >
                                <SelectTrigger className="focus:ring-offset-0 focus:ring-0 focus:outline-none dark:bg-neutral-200 text-black border-neutral-400">
                                    {format(currentMonth, "MMM")}
                                </SelectTrigger>
                                <SelectContent className="dark:bg-neutral-200 text-black border-0">
                                    {selectItems.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        );
                    } else if (props.name === "years") {
                        const earliestYear =
                            fromYear ||
                            fromMonth?.getFullYear() ||
                            fromDate?.getFullYear();

                        const latestYear =
                            toYear ||
                            toMonth?.getFullYear() ||
                            toDate?.getFullYear();

                        let selectItems: { label: string; value: string }[] =
                            [];

                        if (earliestYear && latestYear) {
                            const yearsLength = latestYear - earliestYear + 1;
                            selectItems = Array.from(
                                { length: yearsLength },
                                (_, i) => ({
                                    value: (earliestYear + i).toString(),
                                    label: (earliestYear + i).toString(),
                                })
                            );
                        }
                        return (
                            <Select
                                onValueChange={(newValue) => {
                                    const newDate = new Date(currentMonth);
                                    newDate.setFullYear(parseInt(newValue));
                                    goToMonth(newDate);
                                }}
                                value={props.value?.toString()}
                            >
                                <SelectTrigger className="focus:ring-offset-0 focus:ring-0 focus:outline-none dark:bg-neutral-200 text-black border-neutral-400">
                                    {currentMonth.getFullYear()}
                                </SelectTrigger>
                                <SelectContent className="dark:bg-neutral-200 text-black border-0">
                                    {selectItems.map((item) => (
                                        <SelectItem
                                            key={item.value}
                                            value={item.value}
                                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-300 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        );
                    }
                    return null;
                },
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
