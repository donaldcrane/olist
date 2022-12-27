// use script to test queries
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();
export * from "@prisma/client";
