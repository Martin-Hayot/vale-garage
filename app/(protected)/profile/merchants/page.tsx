import { MerchantsForm } from "@/components/forms/merchants-form";
import { Separator } from "@/components/ui/separator";

const MerchantsSettingsPage = async () => {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Merchants Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your merchant account status.
                </p>
            </div>
            <Separator />
            <MerchantsForm />
        </div>
    );
};

export default MerchantsSettingsPage;
