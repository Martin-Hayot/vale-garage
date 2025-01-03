import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OffersPaginationProps {
    currentPage: number;
    totalPages: number | undefined;
    handlePageChange: (page: number) => void;
    itemsPerPage: number;
    dataLength: number | undefined;
}

const OffersPagination = ({
    currentPage,
    totalPages,
    handlePageChange,
    itemsPerPage,
    dataLength,
}: OffersPaginationProps) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        className="bg-transparent"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={(dataLength ?? 0) < itemsPerPage}
                    >
                        <ChevronLeft className="mr-2 w-5 h-5" />
                        Previous
                    </Button>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>{currentPage}</PaginationLink>
                </PaginationItem>
                {totalPages &&
                    totalPages > 1 &&
                    Array.from(
                        {
                            length: Math.min(3, totalPages),
                        },
                        (_, index) => currentPage + index
                    ).map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                {totalPages && totalPages > 4 && (
                    <>
                        <PaginationLink
                            onClick={() => handlePageChange(totalPages)}
                        >
                            {totalPages}
                        </PaginationLink>
                        <PaginationEllipsis />
                    </>
                )}
                <PaginationItem>
                    <Button
                        className="bg-transparent"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={(dataLength ?? 0) < itemsPerPage}
                    >
                        Next
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default OffersPagination;
