const saleService = require('../services/sale.service');

exports.create = async (req, res) => {
  try {
    const sale = await saleService.createSale(req.user.userId, req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const sales = await saleService.getAllSales();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const sale = await saleService.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
