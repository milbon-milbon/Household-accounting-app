import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dotenv from "dotenv";

dotenv.config(); // .env ファイルを読み込む

async function main() {
  // User データ作成
  await prisma.user.createMany({
    data: [
      {
        mail: "alice@example.com",
        name: "Alice",
        member: "regular",
        password_hash: "hashedPassword1",
      },
      {
        mail: "bob@example.com",
        name: "Bob",
        member: "premium",
        password_hash: "hashedPassword2",
      },
    ],
  });

  // Payment データ作成
  await prisma.payment.createMany({
    data: [
      { user_id: 1, payment_items: "Credit Card" },
      { user_id: 2, payment_items: "Cash" },
    ],
  });

  // Category データ作成
  await prisma.category.createMany({
    data: [
      { payment_id: 1, contents: "Food" },
      { payment_id: 2, contents: "Entertainment" },
    ],
  });

  // Transaction データ作成
  await prisma.transaction.createMany({
    data: [
      {
        user_id: 1,
        category_id: 1,
        payment_id: 1,
        member: "regular",
        name: "Deposit",
        payment_items: "Credit Card",
        payment_type: "online",
        day: new Date(),
        amount: 1000.00,
        contents: "Initial Deposit",
      },
      {
        user_id: 2,
        category_id: 2,
        payment_id: 2,
        member: "premium",
        name: "Groceries",
        payment_items: "Cash",
        payment_type: "offline",
        day: new Date(),
        amount: 500.00,
        contents: "Grocery Shopping",
      },
    ],
  });

  // income_and_expenditure データ作成
  await prisma.income_and_expenditure.createMany({
    data: [
      {
        category_id: 1,
        user_id: 1,
        transaction_id: 1,
        payment_type: "online",
        day: new Date(),
        amount: 1000.00,
      },
      {
        category_id: 2,
        user_id: 2,
        transaction_id: 2,
        payment_type: "offline",
        day: new Date(),
        amount: 500.00,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
