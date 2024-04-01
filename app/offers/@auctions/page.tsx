import OffersCard from "@/components/offers/offers-card";
import OffersList from "@/components/offers/offers-list";
import OffersSidebar from "@/components/offers/offers-sidebar";
import { db } from "@/lib/db";

const AuctionsPage = async () => {
    const offers = await db.carBid.findMany({
        include: {
            car: true,
        },
    });

    if (!offers) {
        return <div>No offers found</div>;
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="hidden xl:block pr-16">
                <OffersSidebar />
            </div>

            <div className="">
                <OffersList>
                    {offers.map((offer) => (
                        <OffersCard
                            key={offer.id}
                            details={{ ...offer.car, ...offer }}
                        />
                    ))}
                </OffersList>
            </div>
        </div>
    );
};

export default AuctionsPage;
