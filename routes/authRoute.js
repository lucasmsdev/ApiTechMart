const express = require('express');
const router = express.Router();

// Importar o controlador de autenticação
const authController = require('../controllers/authController');

// Rota de login
router.post('/login', authController.login);

module.exports = (docClient) => {
    // Passando o cliente DynamoDB para o controlador de autenticação
    authController.setDocClient(docClient);
    return router;
};
