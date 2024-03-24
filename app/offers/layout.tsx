interface OffersLayoutProps {
    children: React.ReactNode;
}

const OffersLayout = ({ children }: OffersLayoutProps) => {
    return <div className="w-full h-full mt-32">{children}</div>;
};

export default OffersLayout;
