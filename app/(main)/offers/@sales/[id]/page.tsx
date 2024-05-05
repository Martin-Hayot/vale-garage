interface OffersIdPageProps {
    params: {
        id: string;
    };
}

const OffersIdPage = ({ params }: OffersIdPageProps) => {
    return (
        <div>
            <h1>Offer ID: {params.id}</h1>
        </div>
    );
};

export default OffersIdPage;
