-- AlterTable
ALTER TABLE `task` MODIFY `status` ENUM('Todo', 'InProgress', 'Done') NOT NULL DEFAULT 'Todo';
