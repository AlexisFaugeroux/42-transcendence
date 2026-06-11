import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma/client';

const DATABASE_URL = `${process.env.DATABASE_URL}`; // on recupere l'url de la database dans le .env

const adapter = new PrismaPg(DATABASE_URL); // on instancie une connection a la database
const prisma = new PrismaClient({ adapter }); // on instancie le client qui servira a faire les requetes sur la database

export { prisma };
