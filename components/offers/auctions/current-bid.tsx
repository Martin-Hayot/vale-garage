"use client";

import { useWebSocketContext } from "@/components/providers/websocket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useWebSocketStore } from "@/store/websocket";
import { Auctions, Car, OfferImages } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CurrentBidProps {
    auction: Auctions & {
        car: Car;
        offerImages: OfferImages[];
    };
}

const CurrentBid = ({ auction }: CurrentBidProps) => {
    const user = useCurrentUser();
    const router = useRouter();
    const wsCtx = useWebSocketContext();

    const [bid, setBid] = useState("");
    const [status, setStatus] = useState<
        "idle" | "active" | "loading" | "error" | "ended"
    >("idle");
    const [currentBid, setCurrentBid] = useState(auction.currentBid);
    const { messages } = useWebSocketStore();

    const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, ""); // Remove non-numeric characters
        setBid(value ? `€ ${value}` : "");
    };

    const handleClick = () => {
        if (status === "loading") {
            return;
        }
        if (!user) {
            console.log("You must be logged in to bid.");
            router.push("/auth/login");
            return;
        }
        if (!wsCtx) {
            console.log("WebSocket is not connected.");
            toast({
                title: "WebSocket is not connected.",
                description: "Please try again later.",
            });
            return;
        }

        if (currentBid >= parseInt(bid.replace("€", ""))) {
            console.log("Your bid must be higher than the current bid.");
            toast({
                title: "Your bid must be higher than the current bid.",
                description: "Please try again.",
                variant: "destructive",
            });
            return;
        }

        if (auction.maxPrice < parseInt(bid.replace("€", ""))) {
            console.log("Your bid must be lower than the max price.");
            toast({
                title: "Your bid must be lower than the max price.",
                description: "Please try again.",
                variant: "destructive",
            });
            return;
        }

        if (auction.endDate < new Date()) {
            console.log("This auction has ended.");
            toast({
                title: "This auction has ended.",
                description: "You can no longer bid on this auction.",
                variant: "destructive",
            });
            return;
        }

        if (auction.startDate > new Date()) {
            console.log("This auction has not started yet.");
            toast({
                title: "This auction has not started yet.",
                description: "You can no longer bid on this auction.",
                variant: "destructive",
            });
            return;
        }

        setStatus("loading");
        wsCtx.sendMessage({
            type: "bid",
            data: JSON.stringify({
                auction_id: auction.id,
                amount: parseInt(bid.replace("€", "")),
            }),
        });
        toast({
            title: "Your bid has been placed",
            description: "Good luck!",
        });
        setBid("");
        setStatus("idle");
    };

    useEffect(() => {
        const handleNewBid = (message: any, auction: any) => {
            if (message?.type === "bid") {
                if (message.data.auction_id !== auction.id) {
                    return;
                }
                if (message.data.amount <= currentBid) {
                    return;
                }
                const newBid = message.data.amount;
                setCurrentBid(newBid);
            }

            if (message?.type === "error") {
                console.log("An error occured", message.data);
                toast({
                    title: "An error occured",
                    description: message.data,
                    variant: "destructive",
                });
            }
        };
        // take the last message and update the current bid
        const lastMessage = messages[messages.length - 1];
        if (lastMessage) {
            handleNewBid(lastMessage, auction);
        }
    }, [messages, auction, currentBid]);

    return (
        <div className="p-3 bg-neutral-200 dark:bg-neutral-800 rounded-lg my-4 inline-block">
            Current Bid :
            <p className="text-xl">
                € <span className="text-xl font-bold">{currentBid}</span>
            </p>
            <div className="flex flex-row gap-x-4 mt-4">
                <Input
                    placeholder="€ Your bid..."
                    type="text"
                    value={bid}
                    onChange={handleBidChange}
                    className=""
                />
                <Button
                    onClick={handleClick}
                    disabled={status === "loading" || status === "ended"}
                    className="bg-blue-700 hover:bg-blue-800"
                >
                    Validate
                </Button>
            </div>
        </div>
    );
};

export default CurrentBid;
