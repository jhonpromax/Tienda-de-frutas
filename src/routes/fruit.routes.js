const express = require('express');
const router = express.Router();
const fruitController = require('../controllers/fruit.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Cajeros pueden ver frutas
router.get('/', authMiddleware(['ADMIN', 'CASHIER']), fruitController.getAll);
router.get('/:id', authMiddleware(['ADMIN', 'CASHIER']), fruitController.getById);

// Solo Admins pueden modificar el inventario
router.post('/', authMiddleware(['ADMIN']), fruitController.create);
router.put('/:id', authMiddleware(['ADMIN']), fruitController.update);
router.delete('/:id', authMiddleware(['ADMIN']), fruitController.delete);

module.exports = router;
