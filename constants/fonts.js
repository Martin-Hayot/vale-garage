import { Poppins, Inter } from "next/font/google";

export const font = {
    Poppins: {
        100: Poppins({ subsets: ["latin"], weight: ["100"] }),
        200: Poppins({ subsets: ["latin"], weight: ["200"] }),
        300: Poppins({ subsets: ["latin"], weight: ["300"] }),
        400: Poppins({ subsets: ["latin"], weight: ["400"] }),
        500: Poppins({ subsets: ["latin"], weight: ["500"] }),
        600: Poppins({ subsets: ["latin"], weight: ["600"] }),
        700: Poppins({ subsets: ["latin"], weight: ["700"] }),
        800: Poppins({ subsets: ["latin"], weight: ["800"] }),
        900: Poppins({ subsets: ["latin"], weight: ["900"] }),
    },
    Inter: {
        100: Inter({ subsets: ["latin"], weight: ["100"] }),
        200: Inter({ subsets: ["latin"], weight: ["200"] }),
        300: Inter({ subsets: ["latin"], weight: ["300"] }),
        400: Inter({ subsets: ["latin"], weight: ["400"] }),
        500: Inter({ subsets: ["latin"], weight: ["500"] }),
        600: Inter({ subsets: ["latin"], weight: ["600"] }),
        700: Inter({ subsets: ["latin"], weight: ["700"] }),
        800: Inter({ subsets: ["latin"], weight: ["800"] }),
        900: Inter({ subsets: ["latin"], weight: ["900"] }),
    },
};
