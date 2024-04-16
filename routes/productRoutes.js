const express = require('express');
const router = express.Router();

// Importar o controlador de produtos
const productController = require('../controllers/productController');

// Rotas para gerenciamento de produtos
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = (docClient) => {
    // Passando o cliente DynamoDB para o controlador de produtos
    productController.setDocClient(docClient);
    return router;
};
