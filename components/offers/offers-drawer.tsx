"use client";

import { ReactNode, useEffect, useState } from "react";

// import { Drawer } from "vaul";
import { Button } from "../ui/button";
import { Car, CarBid } from "@prisma/client";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import Link from "next/link";
import { useDrawer } from "@/store/drawer";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";

type CarDetails = Car & CarBid;

interface OffersDrawerProps {
    children: ReactNode;
    details: CarDetails;
}

const OffersDrawer = ({ children, details }: OffersDrawerProps) => {
    const { id, toggleDrawer, isOpen, setId } = useDrawer();
    let params = new URLSearchParams(window.location.search);
    let drawer = params.get("drawer");
    const router = useRouter();

    return (
        <Drawer
            open={id === details.id || drawer === details.id}
            onOpenChange={(value) => {
                if (value) {
                    toggleDrawer(details.id);
                    setId(details.id);
                } else {
                    setId("");
                }
            }}
        >
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="border-0 h-[80%] outline-none focus-within:ring-0">
                <div className="px-8 pt-2 pb-8 w-7">
                    <Link href={`/offers/${details.id}`}>
                        <Maximize2 className="w-6 h-6 rotate-90 hover:scale-125 transition-all duration-100" />
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row gap-x-8">
                    <Image
                        src={"/car_placeholder2.jpg"}
                        alt={details.make}
                        width={400}
                        height={300}
                        className="rounded-lg"
                        draggable={false}
                    />
                    <div>
                        <h2 className="font-semibold text-4xl">
                            {details.make + " " + details.model}
                        </h2>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default OffersDrawer;
