import { SettingsForm } from "@/components/forms/settings-form";
import { Separator } from "@/components/ui/separator";

const SettingsPage = async () => {
    return (
        <div className="h-full w-full space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile Settings</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>
            <Separator />
            <SettingsForm />
        </div>
    );
};

export default SettingsPage;
