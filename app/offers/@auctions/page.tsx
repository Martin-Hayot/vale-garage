import OffersCard from "@/components/offers/offers-card";
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
            <div className="grid md:grid-cols-2 md:gap-5 2xl:grid-cols-4 gap-y-5">
                {offers.map((offer) => (
                    <OffersCard
                        key={offer.id}
                        details={{ ...offer.car, ...offer }}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuctionsPage;
