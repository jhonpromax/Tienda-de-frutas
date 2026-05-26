const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', userController.register); // Idealmente protegido solo para ADMIN en prod
router.post('/login', userController.login);
router.get('/', authMiddleware(['ADMIN']), userController.getUsers);

module.exports = router;
