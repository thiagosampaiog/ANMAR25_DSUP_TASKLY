import { prisma } from "../database/prisma";

export class TaskRepository {
  static async create(data: { title: string; description: string }) {
    // criar
    return prisma.task.create({ data });
  }

  static async findAll() {
    // listar todos
    return prisma.task.findmany();
  }

  static async findById(id: string) {
    return prisma.task.findUnique({ where: { id } }); // achar um
  }

  static async delete(id: string) {  // deletar
    return prisma.task.delete({ where: { id } });
  }
}
