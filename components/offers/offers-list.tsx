interface OffersListProps {
    children: React.ReactNode;
}

const OffersList = ({ children }: OffersListProps) => {
    return (
        <div className="grid md:grid-cols-2 md:gap-5 2xl:grid-cols-3 gap-y-5">
            {children}
        </div>
    );
};

export default OffersList;
