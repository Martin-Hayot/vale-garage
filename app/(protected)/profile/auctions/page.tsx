import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileAuctionsPage = async () => {
    const user = await currentUser();
    if (!user) {
        return <div>User not found</div>;
    }

    const biddings = await db.bid.findMany({
        where: {
            userId: user.id,
        },
    });

    const auctions = await db.auctions.findMany({
        where: {
            id: {
                in: biddings.map((bidding) => bidding.auctionId),
            },
        },
        select: {
            id: true,
            endDate: true,
            offerImages: true,
        },
    });

    if (!auctions) {
        return <div>No auction linked with your biddings</div>;
    }

    console.log(biddings);

    if (biddings.length === 0) {
        return (
            <div className="w-full h-full text-center text-4xl">
                No biddings found
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">My Auctions</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your auction biddings.
                </p>
            </div>
            <Separator />
            <li className="text-white list-none flex flex-col gap-4 ">
                {biddings.map((bidding) => (
                    <ul
                        key={bidding.id}
                        className="flex gap-4 items-center bg-neutral-800 rounded-md p-2"
                    >
                        <Image
                            src={
                                auctions
                                    .map((auction) => {
                                        if (auction.id === bidding.auctionId) {
                                            return auction.offerImages[0];
                                        }
                                        return undefined;
                                    })
                                    .filter((src) => src !== undefined)[0]
                                    .url || ""
                            }
                            width={100}
                            height={100}
                            className="rounded-md"
                            alt="Auction Image"
                        />
                        <div className="flex flex-row items-center gap-x-5 flex-1 justify-evenly">
                            <h3>{bidding.auctionId}</h3>
                            <p>{bidding.price} €</p>
                            <p>
                                {bidding.createdAt.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                            Toggle menu
                                        </span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="bg-neutral-900 border-none"
                                >
                                    <DropdownMenuLabel>
                                        Actions
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem>
                                        <Link
                                            href={`/offers/auctions/${bidding.auctionId}`}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="flex items-center gap-1"
                                            >
                                                <span>View</span>
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </ul>
                ))}
            </li>
        </div>
    );
};

export default ProfileAuctionsPage;
