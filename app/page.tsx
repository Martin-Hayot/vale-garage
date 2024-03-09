import { LoginButton } from "@/components/auth/login-button";
import NewOffers from "@/components/offers/new-offers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center mt-44">
            <div className="space-y-6 text-center">
                <h1
                    className={cn(
                        "text-6xl font-semibold drop-shadow-md",
                        font.className
                    )}
                >
                    Vale Garage
                </h1>
                <p className="text-lg">A car bidding website</p>
                <div>
                    <LoginButton mode="redirect">
                        <Button variant="secondary" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
            <div className="py-16 bg-neutral-800 w-full mt-32">
                <h2 className="text-center md:text-left text-4xl md:ml-20 pb-16">
                    New offers
                </h2>
                <div className="flex items-center justify-center mx-16 md:mx-32 mb-6">
                    <NewOffers />
                </div>
            </div>
        </main>
    );
}
