const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sale.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Cajeros y Admins pueden registrar ventas
router.post('/', authMiddleware(['ADMIN', 'CASHIER']), saleController.create);

// Cajeros y Admins pueden ver una venta específica
router.get('/:id', authMiddleware(['ADMIN', 'CASHIER']), saleController.getById);

// Solo Admin puede ver todas las ventas globales
router.get('/', authMiddleware(['ADMIN']), saleController.getAll);

module.exports = router;
