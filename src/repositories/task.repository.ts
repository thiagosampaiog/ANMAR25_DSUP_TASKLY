import prisma from "../database/prisma.js";
import pkg from '@prisma/client';

const { Priority, Status } = pkg;
type Prior = (typeof Priority)[keyof typeof Priority];
type Stat = (typeof Status)[keyof typeof Status];

export class TaskRepository {
  static async create(data: { title: string; description: string }) {
    return prisma.task.create({ data });
  }

  static async findAll(skip: number, take: number, where: any = {}) {
    return prisma.task.findMany({
      skip,
      take,
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  static async findById(id: number) {
    return prisma.task.findUnique({ where: { id } });
  }

  static async delete(id: number) {
    return prisma.task.delete({ where: { id } });
  }

  static async update(
    id: number,
    data: { title: string; description: string; status: Stat; priority: Prior }
  ) {
    return prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
      },
    });
  }
  static async countAll(where: any = {}) {  
    return prisma.task.count({ where });
  }

}
