import { currentUser } from "@/lib/auth";
import { CheckCircle } from "lucide-react";

import { MerchantsForm } from "@/components/forms/merchants-form";

const MerchantsSettingsPage = async () => {
    const user = await currentUser();
    return (
        <div className="mt-6">
            <div>
                <MerchantsForm />
            </div>
        </div>
    );
};

export default MerchantsSettingsPage;
