-- AlterTable
ALTER TABLE `Task` MODIFY `status` ENUM('Todo', 'InProgress', 'Done') NOT NULL DEFAULT 'Todo';
