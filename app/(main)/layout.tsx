import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div>
            <Navigation />
            {children}
            <Footer />
        </div>
    );
};

export default MainLayout;
