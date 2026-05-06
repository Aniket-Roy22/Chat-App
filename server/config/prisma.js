// lib/prisma.js
import "dotenv";
import {PrismaClient} from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

export default prisma;