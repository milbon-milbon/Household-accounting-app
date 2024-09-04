import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from 'dotenv';

dotenv.config(); // これを追加して .env ファイルを読み込

async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' },
    ],
  });

  await prisma.transaction.createMany({
    data: [
      { date: new Date(), amount: 1000, type: '入金', details: 'Initial Deposit', userId: 1 },
      { date: new Date(), amount: 500, type: '出金', details: 'Grocery Shopping', userId: 2 },

    ],
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
