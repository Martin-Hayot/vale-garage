import { Poppins } from "next/font/google";
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

const HeroSection = () => {
    return (
        <section className="relative flex flex-col md:flex-row-reverse justify-center gap-12 w-full pt-32 pb-32">
            <div>
                <Image
                    src="/hero.jpg"
                    alt="Car in a garage"
                    width={1280}
                    height={720}
                    className="rounded-lg shadow-lg z-0 w-[600px]"
                />
            </div>
            <div className="space-y-6 w-[30%]">
                <h2
                    className={cn(
                        "text-6xl font-semibold w-[30rem]",
                        font.className
                    )}
                >
                    The best place to buy{" "}
                    <span className="text-accent">cars</span>
                </h2>
                <p className={cn("w-96", font.className)}>
                    Discover your dream car at a dream price through our unique
                    blend of limited-time auctions and classic sales, catering
                    to both individual enthusiasts and B2B clients seeking the
                    best value for premium vehicles.
                </p>
                <div className="flex flex-row gap-6">
                    <Button size="lg">See offers</Button>
                    <LoginButton mode="redirect">
                        <Button variant="secondary" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
