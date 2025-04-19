-- AlterTable
ALTER TABLE `task` ADD COLUMN `Priority` ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium';
