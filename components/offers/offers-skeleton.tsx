import { Skeleton } from "@/components/ui/skeleton";

const OffersSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="dark:bg-neutral-800 bg-neutral-200 h-48 w-72 rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="dark:bg-neutral-800 bg-neutral-200 h-4 w-[250px]" />
                <Skeleton className="dark:bg-neutral-800 bg-neutral-200 h-4 w-[200px]" />
            </div>
        </div>
    );
};

export default OffersSkeleton;
