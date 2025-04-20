-- AlterTable
ALTER TABLE `Task` ADD COLUMN `Priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium';
