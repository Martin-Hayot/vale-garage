import { Separator } from "./ui/separator";

const Footer = () => {
    return (
        <footer className="mx-6 xl:mx-64 py-8">
            <div className="dark:bg-neutral-800 bg-neutral-100 rounded-lg p-8 md:p-16">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-4xl font-bold mb-2">
                        Vale Garage
                    </h3>
                    <p className="text-sm md:text-base">© 2024 Vale Garage</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div>
                        <h4 className="text-xl md:text-2xl font-semibold mb-2">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl md:text-2xl font-semibold mb-2">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl md:text-2xl font-semibold mb-2">
                            Community
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Forum
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent transition-colors"
                                >
                                    Meetups
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="bg-neutral-700 my-8 mt-12" />

                <div>
                    <p className="text-center text-sm md:text-base">
                        Built with{" "}
                        <a
                            href="https://nextjs.org"
                            className="text-accent hover:underline"
                        >
                            Next.js
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://tailwindcss.com"
                            className="text-accent hover:underline"
                        >
                            Tailwind CSS
                        </a>
                    </p>
                </div>
            </div>

            <div className="h-10" />
        </footer>
    );
};

export default Footer;
