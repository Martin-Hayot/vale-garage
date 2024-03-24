import OffersCard from "@/components/offers/offers-card";
import OffersList from "@/components/offers/offers-list";
import OffersSidebar from "@/components/offers/offers-sidebar";

const OffersPage = () => {
    return (
        <div className="flex flex-row justify-center">
            <div className="basis-1/4">
                <OffersSidebar />
            </div>

            <div className="basis-1/2">
                <OffersList>
                    <OffersCard />
                </OffersList>
            </div>
        </div>
    );
};

export default OffersPage;
