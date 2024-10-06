/*
  Warnings:

  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mail]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_items` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `member` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Transaction` DROP COLUMN `date`,
    DROP COLUMN `details`,
    DROP COLUMN `type`,
    DROP COLUMN `userId`,
    ADD COLUMN `category_id` INTEGER NOT NULL,
    ADD COLUMN `contents` VARCHAR(191) NULL,
    ADD COLUMN `day` DATE NOT NULL,
    ADD COLUMN `member` VARCHAR(50) NOT NULL,
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `payment_id` INTEGER NOT NULL,
    ADD COLUMN `payment_items` VARCHAR(100) NOT NULL,
    ADD COLUMN `payment_type` VARCHAR(20) NOT NULL,
    ADD COLUMN `remarks` VARCHAR(191) NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    MODIFY `amount` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `email`,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `mail` VARCHAR(100) NOT NULL,
    ADD COLUMN `member` VARCHAR(50) NOT NULL,
    ADD COLUMN `password_hash` VARCHAR(255) NOT NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL,
    MODIFY `name` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `income_and_expenditure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `transaction_id` INTEGER NOT NULL,
    `payment_type` VARCHAR(20) NOT NULL,
    `day` DATE NOT NULL,
    `amount` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_id` INTEGER NOT NULL,
    `contents` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `payment_items` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_mail_key` ON `User`(`mail`);

-- AddForeignKey
ALTER TABLE `income_and_expenditure` ADD CONSTRAINT `income_and_expenditure_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_and_expenditure` ADD CONSTRAINT `income_and_expenditure_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `Transaction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `income_and_expenditure` ADD CONSTRAINT `income_and_expenditure_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Category` ADD CONSTRAINT `Category_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
