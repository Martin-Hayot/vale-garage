import { Separator } from "./ui/separator";

const Footer = () => {
    return (
        <footer className="m-16 xl:mx-64">
            <div className="dark:bg-neutral-800 bg-neutral-100 rounded-md p-16">
                <h3 className="text-4xl">Vale Garage</h3>
                <p>© 2024 Vale Garage</p>
                <div className="flex lg:flex-row flex-col mt-6">
                    <div className="flex-1">
                        <h4 className="text-2xl mb-2">Company</h4>
                        <ul>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Contact</a>
                            </li>
                            <li>
                                <a href="#">Careers</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-2xl mb-2">Resources</h4>
                        <ul>
                            <li>
                                <a href="#">Support</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-2xl mb-2">Community</h4>
                        <ul>
                            <li>
                                <a href="#">Blog</a>
                            </li>
                            <li>
                                <a href="#">Forum</a>
                            </li>
                            <li>
                                <a href="#">Meetups</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <Separator className="bg-neutral-700 my-8 mt-12" />
                <div>
                    <p className="text-center mt-6">
                        Built with{" "}
                        <a href="https://nextjs.org" className="text-accent">
                            Next.js
                        </a>{" "}
                        and{" "}
                        <a
                            href="https://tailwindcss.com"
                            className="text-accent"
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
