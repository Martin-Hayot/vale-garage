#!/bin/bash

echo "Starting entrypoint.sh";
npx prisma db push;
echo "Prisma db push done";
npm run db:seed;
echo "Seeding done";
npm run start;
echo "Started server";