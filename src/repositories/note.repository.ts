import prisma from "../database/prisma.js";

export class NoteRepository {
  static async create(taskId: number, data: { content: string }) {
    return prisma.note.create({
      data: {
        content: data.content,
        taskId,
      },
    });
  }

  static async findById(id: number) {
    return prisma.note.findUnique({
      where: { id },
    });
  }

  static async findAllByTask(taskId: number, skip: number = 0, take: number = 10) {
    return prisma.note.findMany({
      where: { taskId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  static async delete(id: number) {
    return prisma.note.delete({ where: { id } });
  }

  static async update(id: number, data: { content: string }) {
    return prisma.note.update({
      where: { id },
      data,
    });
  }
}
