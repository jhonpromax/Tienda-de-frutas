const express = require('express');
const router = express.Router();
const saleController = require('../controllers/sale.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Cajeros y Admins pueden registrar ventas
/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Gestión de ventas y pedidos
 */

/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Registrar una nueva venta
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     fruitId:
 *                       type: integer
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Venta registrada exitosamente
 */
router.post('/', authMiddleware(['ADMIN', 'CASHIER']), saleController.create);

/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Obtener detalle de una venta por ID
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalle de la venta
 */
router.get('/:id', authMiddleware(['ADMIN', 'CASHIER']), saleController.getById);

/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Historial global de todas las ventas (Solo ADMIN)
 *     tags: [Sales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de ventas
 */
router.get('/', authMiddleware(['ADMIN']), saleController.getAll);

module.exports = router;
