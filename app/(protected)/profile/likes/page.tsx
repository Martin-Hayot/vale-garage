import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ArrowRight, ListFilter, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileLikesPage = async () => {
    const user = await currentUser();
    if (!user) {
        return <div>User not found</div>;
    }

    const AuctionsLike = await db.auctionLike.findMany({
        where: {
            userId: user.id,
        },
    });

    const SalesLike = await db.saleLike.findMany({
        where: {
            userId: user.id,
        },
    });

    const auctions = await db.auctions.findMany({
        where: {
            id: {
                in: AuctionsLike.map((like) => like.auctionId),
            },
        },
        select: {
            id: true,
            currentBid: true,
            endDate: true,
            offerImages: true,
            createdAt: true,
        },
    });

    const sales = await db.sales.findMany({
        where: {
            id: {
                in: SalesLike.map((like) => like.saleId),
            },
        },
        include: {
            car: true,
            offerImages: true,
        },
    });

    return (
        <Tabs defaultValue="sales">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-medium">My Likes</h3>
                        <p className="text-sm text-muted-foreground">
                            Manage your likes.
                        </p>
                    </div>
                    <div>
                        <TabsList>
                            <TabsTrigger value="sales">Sales</TabsTrigger>
                            <TabsTrigger value="auction">Auctions</TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                <Separator />
                <TabsContent value="sales">
                    <li className="text-white list-none flex flex-col gap-4 ">
                        {sales.map((sale) => (
                            <ul
                                key={sale.id}
                                className="flex gap-4 items-center bg-neutral-800 rounded-md p-2"
                            >
                                <Image
                                    src={sale.offerImages[0].url}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                    alt="car image"
                                />
                                <div className="flex flex-row items-center gap-x-5 flex-1 justify-evenly">
                                    <h3>
                                        {sale.car.make} {sale.car.model}
                                    </h3>
                                    <p>{sale.price} €</p>
                                    <p>
                                        {sale.createdAt.toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "numeric",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
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
                                                    href={`/offers/sales/${sale.id}`}
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
                </TabsContent>
                <TabsContent value="auction">
                    <li className="text-white list-none flex flex-col gap-4 ">
                        {auctions.map((auction) => (
                            <ul
                                key={auction.id}
                                className="flex gap-4 items-center bg-neutral-800 rounded-md p-2"
                            >
                                <Image
                                    src={auction.offerImages[0].url}
                                    width={100}
                                    height={100}
                                    className="rounded-md"
                                    alt="Auction Image"
                                />
                                <div className="flex flex-row items-center gap-x-5 flex-1 justify-evenly">
                                    <h3>{auction.id}</h3>
                                    <p>{auction.currentBid} €</p>
                                    <p>
                                        {auction.createdAt.toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "numeric",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
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
                                                    href={`/offers/auctions/${auction.id}`}
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
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default ProfileLikesPage;
