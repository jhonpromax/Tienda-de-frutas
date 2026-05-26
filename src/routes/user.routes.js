const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para la gestión de usuarios y autenticación
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: CASHIER
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en el registro
 */
router.post('/register', userController.register); // Idealmente protegido solo para ADMIN en prod

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa (Retorna JWT)
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar usuarios (Solo ADMIN)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autenticado
 *       403:
 *         description: No autorizado
 */
router.get('/', authMiddleware(['ADMIN']), userController.getUsers);

module.exports = router;
