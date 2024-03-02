import { LoginButton } from "@/components/auth/login-button";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
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
        </main>
    );
}
