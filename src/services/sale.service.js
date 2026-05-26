const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SaleService {
  async createSale(userId, data) {
    const { customerName, items } = data; // items: [{ fruitId, quantity }]
    
    let totalAmount = 0;
    const saleDetails = [];

    // Calculate total and prepare details
    for (const item of items) {
      const fruit = await prisma.fruit.findUnique({ where: { id: item.fruitId } });
      if (!fruit) throw new Error(`Fruit with ID ${item.fruitId} not found`);
      if (fruit.stock < item.quantity) throw new Error(`Not enough stock for ${fruit.name}`);

      const subtotal = fruit.price * item.quantity;
      totalAmount += subtotal;

      saleDetails.push({
        fruitId: fruit.id,
        quantity: item.quantity,
        price: fruit.price,
        subtotal
      });

      // Reduce stock
      await prisma.fruit.update({
        where: { id: fruit.id },
        data: { stock: fruit.stock - item.quantity }
      });
    }

    // Create Sale and SaleDetails in a transaction
    return prisma.sale.create({
      data: {
        totalAmount,
        customerName,
        userId,
        details: {
          create: saleDetails
        }
      },
      include: { details: true }
    });
  }

  async getAllSales() {
    return prisma.sale.findMany({
      include: {
        user: { select: { name: true } },
        details: { include: { fruit: { select: { name: true } } } }
      }
    });
  }

  async getSaleById(id) {
    return prisma.sale.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: { select: { name: true } },
        details: { include: { fruit: { select: { name: true } } } }
      }
    });
  }
}

module.exports = new SaleService();
