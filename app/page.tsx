import HeroSection from "@/components/hero-section";
import NewOffers from "@/components/offers/new-offers";

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <HeroSection />
            <div className="pt-16 bg-neutral-200 dark:bg-neutral-800 w-full">
                <h2 className="text-center md:text-left text-4xl md:mx-32  pb-16">
                    New offers
                </h2>
                <div className="flex items-center justify-center mx-16 md:mx-32 mb-6">
                    <NewOffers />
                </div>
            </div>
        </main>
    );
}
