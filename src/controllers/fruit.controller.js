const fruitService = require('../services/fruit.service');

exports.getAll = async (req, res) => {
  try {
    const search = req.query.search;
    const fruits = await fruitService.getAllFruits(search);
    res.status(200).json(fruits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const fruit = await fruitService.getFruitById(req.params.id);
    if (!fruit) return res.status(404).json({ message: 'Fruit not found' });
    res.status(200).json(fruit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const fruit = await fruitService.createFruit(req.body);
    res.status(201).json(fruit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const fruit = await fruitService.updateFruit(req.params.id, req.body);
    res.status(200).json(fruit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await fruitService.deleteFruit(req.params.id);
    res.status(200).json({ message: 'Fruit deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
