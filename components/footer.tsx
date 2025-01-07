import Image from "next/image";
import { Separator } from "./ui/separator";

const Footer = () => {
    return (
        <footer>
            <div className="w-[80%] mx-auto m-6 p-8 dark:bg-neutral-800 bg-neutral-100 rounded-lg md:p-16">
                <div className=" flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl md:text-4xl font-bold mb-2">
                            Vale Garage
                        </h3>
                        <p className="text-sm md:text-base">
                            The best place to find your next car
                        </p>
                    </div>
                    <div>
                        <Image
                            src={"/vale-garage-logo.png"}
                            alt="VaLe Garage Logo"
                            width={150}
                            height={150}
                            className="dark:bg-white rounded-full py-4 w-24 h-24"
                        />
                    </div>
                </div>
                <Separator className="bg-neutral-700 my-8 mt-12" />
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <ul className="flex flex-1 flex-col gap-8 mt-8 lg:flex-row justify-start items-center  md:mt-0">
                        <li>
                            <a
                                href="mailto:m.hayot@students.ephec.be"
                                className="hover:text-accent transition-colors"
                            >
                                Support
                            </a>
                        </li>
                        <li>
                            <a
                                href="/privacy-policy"
                                className="hover:text-accent transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/terms-of-service"
                                className="hover:text-accent transition-colors"
                            >
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                    <p className="text-sm md:text-base">
                        © {new Date().getFullYear()} VaLe Garage. All rights
                        reserved.
                    </p>
                </div>
            </div>
            <div className="h-1" />
        </footer>
    );
};

export default Footer;
