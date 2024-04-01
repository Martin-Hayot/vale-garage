import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Slider } from "@/components/ui/slider";

const OffersSidebar = () => {
    return (
        <div className="hidden dark:bg-neutral-800 rounded-lg p-5 w-96 lg:block">
            <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"></ul>

            <Accordion type="multiple" className="animate-none">
                {/* Color filter */}
                <AccordionItem value="color">
                    <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Color</span>
                    </AccordionTrigger>

                    <AccordionContent className="pt-6 animate-none">
                        <ul className="space-y-4"></ul>
                    </AccordionContent>
                </AccordionItem>

                {/* Size filters */}
                <AccordionItem value="size">
                    <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Size</span>
                    </AccordionTrigger>

                    <AccordionContent className="pt-6 animate-none">
                        <ul className="space-y-4"></ul>
                    </AccordionContent>
                </AccordionItem>

                {/* Price filter */}
                <AccordionItem value="price">
                    <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Price</span>
                    </AccordionTrigger>

                    <AccordionContent className="pt-6 animate-none">
                        <ul className="space-y-4">
                            <li className="flex justify-center flex-col gap-2">
                                <div>
                                    <input
                                        type="radio"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label className="ml-3 text-sm text-gray-600">
                                        Custom
                                    </label>
                                </div>

                                <div className="flex justify-between">
                                    <p className="font-medium">Price</p>
                                    <div>0€ - 10000€ €</div>
                                </div>

                                <Slider min={0} step={5} />
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default OffersSidebar;
