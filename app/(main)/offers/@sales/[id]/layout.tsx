import { ReactNode } from "react";

interface OffersDetailLayoutProps {
    children: ReactNode;
}

const OffersDetailLayout = ({ children }: OffersDetailLayoutProps) => {
    return <div>{children}</div>;
};

export default OffersDetailLayout;
