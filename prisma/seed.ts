import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { parseArgs } from "node:util";

const options = {
    environment: { type: "string" as const },
};

async function main() {
    const {
        values: { environment },
    } = parseArgs({ options });

    switch (environment) {
        case "development":
            await prisma.user.create({
                data: {
                    email: "m.hayot@students.ephec.be",
                    name: "Martin Hayot",
                    password: "martin123321",
                    role: "ADMIN",
                    isTwoFactorEnabled: false,
                },
            });
            break;
        case "test":
            /** data for your test environment */
            break;
        default:
            await prisma.user.create({
                data: {
                    email: "m.hayot@students.ephec.be",
                    name: "Martin Hayot",
                    password: "martin123321",
                    role: "ADMIN",
                    isTwoFactorEnabled: false,
                },
            });
            break;
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
