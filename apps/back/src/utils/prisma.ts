import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../src/generated/prisma/client';

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) throw new Error('POSTGRES_URL is not set');

const adapter = new PrismaPg(connectionString); // on instancie une connection a la database
const prisma = new PrismaClient({ adapter }); // on instancie le client qui servira a faire les requetes sur la database

export { prisma };
