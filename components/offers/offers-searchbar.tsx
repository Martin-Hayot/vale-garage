import { Input } from "../ui/input";

const OffersSearchBar = () => {
    return (
        <div className="max-w-[800px] w-full relative flex">
            <Input
                className="dark:bg-neutral-700 bg-neutral-200 dark:text-white dark:placeholder:text-neutral-300 placeholder:text-neutral-600 border-0 rounded-r-none h-full focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                type="text"
                placeholder="Search offers..."
            />
            <span
                className="flex items-center whitespace-nowrap px-3 py-[0.25rem] text-surface dark:border-neutral-400 dark:text-white [&>svg]:h-5 [&>svg]:w-5 cursor-pointer dark:bg-neutral-700 bg-neutral-200  border-0 h-full rounded-r-md"
                id="button-addon2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </span>
        </div>
    );
};

export default OffersSearchBar;
