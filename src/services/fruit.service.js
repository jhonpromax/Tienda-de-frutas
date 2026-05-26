const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class FruitService {
  async getAllFruits(search) {
    const where = search ? {
      OR: [
        { name: { contains: search } },
        { category: { contains: search } }
      ]
    } : {};
    return prisma.fruit.findMany({ where });
  }

  async getFruitById(id) {
    return prisma.fruit.findUnique({ where: { id: parseInt(id) } });
  }

  async createFruit(data) {
    return prisma.fruit.create({ data });
  }

  async updateFruit(id, data) {
    return prisma.fruit.update({
      where: { id: parseInt(id) },
      data
    });
  }

  async deleteFruit(id) {
    return prisma.fruit.delete({ where: { id: parseInt(id) } });
  }
}

module.exports = new FruitService();
