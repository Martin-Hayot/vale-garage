"use client";

import { MoreHorizontal } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Car, CarBid, OfferImages } from "@prisma/client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

type Offer = CarBid & { car: Car } & { offerImages: OfferImages[] };

interface OffersTableProps {
    offers: Offer[];
}

const OffersTable = ({ offers }: OffersTableProps) => {
    const router = useRouter();

    const changeStatus = async (
        offerId: string,
        status: "ACTIVE" | "INACTIVE" | "ARCHIVED"
    ) => {
        const response = await axios.patch(`/api/offers/status`, {
            data: {
                offerId: offerId,
                status: status,
            },
        });

        router.refresh();
    };

    return (
        <Card className="bg-background">
            <CardHeader>
                <CardTitle className="">Offers</CardTitle>
                <CardDescription>
                    Manage your products and view their sales performance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden w-[100px] sm:table-cell">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>

                            <TableHead className="hidden md:table-cell">
                                Created at
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offers.map((offer) => (
                            <TableRow key={offer.id}>
                                <TableCell className="hidden sm:table-cell">
                                    <Image
                                        alt="Product image"
                                        className="aspect-square rounded-md object-cover"
                                        height="64"
                                        src={
                                            offer.offerImages.filter(
                                                (image) => image.order === 0
                                            )[0].url
                                        }
                                        width="64"
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {offer.car.make} {offer.car.model}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">
                                        {offer.status == "ACTIVE" && (
                                            <span className="text-green-500">
                                                Active
                                            </span>
                                        )}
                                        {offer.status == "INACTIVE" && (
                                            <span className="text-yellow-500">
                                                Inactive
                                            </span>
                                        )}
                                        {offer.status == "ARCHIVED" && (
                                            <span className="text-red-500">
                                                Archived
                                            </span>
                                        )}
                                    </Badge>
                                </TableCell>
                                <TableCell>{offer.price} €</TableCell>

                                <TableCell className="hidden md:table-cell">
                                    {new Date(
                                        offer.createdAt
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
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
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                Edit
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    changeStatus(
                                                        offer.id,
                                                        "INACTIVE"
                                                    )
                                                }
                                                disabled={
                                                    offer.status == "INACTIVE"
                                                }
                                            >
                                                Deactivate
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    changeStatus(
                                                        offer.id,
                                                        "ACTIVE"
                                                    )
                                                }
                                                disabled={
                                                    offer.status == "ACTIVE"
                                                }
                                            >
                                                Activate
                                            </DropdownMenuItem>

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    changeStatus(
                                                        offer.id,
                                                        "ARCHIVED"
                                                    )
                                                }
                                                disabled={
                                                    offer.status == "ARCHIVED"
                                                }
                                            >
                                                Archive
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of{" "}
                    <strong>{offers.length}</strong> offers
                </div>
            </CardFooter>
        </Card>
    );
};

export default OffersTable;
