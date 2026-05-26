const express = require('express');
const router = express.Router();
const fruitController = require('../controllers/fruit.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Cajeros pueden ver frutas
/**
 * @swagger
 * tags:
 *   name: Fruits
 *   description: Gestión de inventario de frutas
 */

/**
 * @swagger
 * /api/fruits:
 *   get:
 *     summary: Listar todas las frutas (Admins y Cajeros)
 *     tags: [Fruits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar fruta por nombre o categoría
 *     responses:
 *       200:
 *         description: Lista de frutas
 */
router.get('/', authMiddleware(['ADMIN', 'CASHIER']), fruitController.getAll);

/**
 * @swagger
 * /api/fruits/{id}:
 *   get:
 *     summary: Obtener una fruta por ID
 *     tags: [Fruits]
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
 *         description: Detalle de la fruta
 */
router.get('/:id', authMiddleware(['ADMIN', 'CASHIER']), fruitController.getById);

/**
 * @swagger
 * /api/fruits:
 *   post:
 *     summary: Crear una nueva fruta (Solo ADMIN)
 *     tags: [Fruits]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       201:
 *         description: Fruta creada exitosamente
 */
router.post('/', authMiddleware(['ADMIN']), fruitController.create);

/**
 * @swagger
 * /api/fruits/{id}:
 *   put:
 *     summary: Actualizar una fruta (Solo ADMIN)
 *     tags: [Fruits]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *     responses:
 *       200:
 *         description: Fruta actualizada exitosamente
 */
router.put('/:id', authMiddleware(['ADMIN']), fruitController.update);

/**
 * @swagger
 * /api/fruits/{id}:
 *   delete:
 *     summary: Eliminar una fruta (Solo ADMIN)
 *     tags: [Fruits]
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
 *         description: Fruta eliminada exitosamente
 */
router.delete('/:id', authMiddleware(['ADMIN']), fruitController.delete);

module.exports = router;
