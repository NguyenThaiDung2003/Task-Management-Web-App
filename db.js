import { PrismaClient } from "./generated/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "test_express_db"
});


const prisma = new PrismaClient({ adapter });

export  default prisma
