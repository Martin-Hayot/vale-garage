import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation/navigation-sidebar";
import { useState } from "react";

export const MobileToggle = () => {
    const [open, setOpen] = useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger onClick={() => setOpen(!open)} asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSidebar setOpen={setOpen} />
                </div>
            </SheetContent>
        </Sheet>
    );
};
