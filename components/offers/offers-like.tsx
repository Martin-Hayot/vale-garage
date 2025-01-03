"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useSaleLikes } from "@/store/likes";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect } from "react";

interface OffersLikeProps {
    offerId: string;
}

const OffersLike = ({ offerId }: OffersLikeProps) => {
    const user = useCurrentUser();
    const { getSaleLikes, saleLikes, addSaleLike, removeSaleLike } =
        useSaleLikes();

    useEffect(() => {
        if (user) {
            getSaleLikes();
        }
    }, [user, getSaleLikes]);

    return (
        <Button
            onClick={() => {
                if (!user) {
                    window.location.href = "/login";
                    return;
                }
                if (saleLikes.find((like) => like.saleId === offerId)) {
                    removeSaleLike(offerId);
                } else {
                    addSaleLike(offerId);
                }
            }}
            className="bg-neutral-800 hover:bg-neutral-700"
        >
            {
                <Heart
                    className={cn(
                        "text-white w-5 h-5",
                        saleLikes.find((like) => like.saleId === offerId)
                            ? " fill-red-500 text-red-500"
                            : "text-neutral-300"
                    )}
                />
            }
        </Button>
    );
};

export default OffersLike;
