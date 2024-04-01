import SortDropdown from "@/components/offers/sort-dropdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

const OffersLayout = ({
    children,
    sales,
    auctions,
}: {
    children: ReactNode;
    sales: ReactNode;
    auctions: ReactNode;
}) => {
    return (
        <Tabs defaultValue="sales" className="w-full h-full mt-24">
            <div className="flex flex-row gap-x-6 border-b border-neutral-800 pb-4 pl-12">
                <TabsList className="dark:bg-neutral-800">
                    <TabsTrigger value="sales">Sales</TabsTrigger>
                    <TabsTrigger value="auctions">Auctions</TabsTrigger>
                </TabsList>
                <SortDropdown />
            </div>

            <TabsContent className="w-full" value="sales">
                {sales}
            </TabsContent>
            <TabsContent className="w-full" value="auctions">
                {auctions}
            </TabsContent>
        </Tabs>
    );
};

export default OffersLayout;
