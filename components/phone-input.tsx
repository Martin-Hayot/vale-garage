import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import Image from "next/image";

interface Country {
    value: string;
    label: string;
    callingCode: string;
}

const FlagComponent = ({
    country,
    countryName,
}: {
    country: string;
    countryName: string;
}) => {
    return (
        <span className="flex items-center gap-2">
            <Image
                src={`https://flagcdn.com/16x12/${country}.png`}
                alt={`${countryName} flag`}
                width={16}
                height={12}
            />
        </span>
    );
};

const PhoneInput = ({
    disabled,
    children,
    fieldValue,
}: {
    disabled?: boolean;
    children: React.ReactNode;
    fieldValue: string;
}) => {
    const [selectedCountry, setSelectedCountry] = useState<Country>({
        value: "us",
        label: "United States",
        callingCode: "1",
    });

    useEffect(() => {
        const countryList: Country[] = [
            { value: "us", label: "United States", callingCode: "+1" },
            { value: "ca", label: "Canada", callingCode: "+1" },
            { value: "gb", label: "United Kingdom", callingCode: "+44" },
            { value: "be", label: "Belgium", callingCode: "+32" },
            { value: "fr", label: "France", callingCode: "+33" },
            { value: "de", label: "Germany", callingCode: "+49" },
            { value: "it", label: "Italy", callingCode: "+39" },
            { value: "es", label: "Spain", callingCode: "+34" },
            { value: "pt", label: "Portugal", callingCode: "+351" },
            { value: "nl", label: "Netherlands", callingCode: "+31" },
            { value: "ch", label: "Switzerland", callingCode: "+41" },
            { value: "at", label: "Austria", callingCode: "+43" },
            { value: "se", label: "Sweden", callingCode: "+46" },
            { value: "no", label: "Norway", callingCode: "+47" },
            { value: "dk", label: "Denmark", callingCode: "+45" },
            { value: "fi", label: "Finland", callingCode: "+358" },
            { value: "pl", label: "Poland", callingCode: "+48" },
            { value: "cz", label: "Czech Republic", callingCode: "+420" },
            { value: "lu", label: "Luxembourg", callingCode: "+352" },
            // Add more countries as needed
        ];
        if (!fieldValue) {
            setSelectedCountry({
                value: "be",
                label: "Belgium",
                callingCode: "+32",
            });
        } else if (fieldValue.startsWith("+")) {
            const country = countryList.find((country) =>
                fieldValue.startsWith(country.callingCode)
            );
            if (country) {
                setSelectedCountry(country);
            }
        }
    }, [fieldValue]);

    return (
        <div className="flex gap-2">
            <FlagComponent
                country={selectedCountry.value}
                countryName={selectedCountry.label}
            />
            {children}
        </div>
    );
};

export default PhoneInput;
