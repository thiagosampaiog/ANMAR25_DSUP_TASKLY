import { prisma } from "../database/prisma";

export class TaskRepository {
  static async create(data: { title: string; description: string }) {
    return prisma.task.create({ data });
  }

  static async findAll() {
    return prisma.task.findmany();
  }

  static async findById(id: number) {
    return prisma.task.findUnique({ where: { id } }); 
  }

  static async delete(id: number) {
    return prisma.task.delete({ where: { id } });
  }

  static async update(data: { title: string; description: string; id: number }){
     return prisma.task.update({
          where: { id: data.id },
          data: {
               title: data.title,
               description: data.description
          }
     });
  }
}

