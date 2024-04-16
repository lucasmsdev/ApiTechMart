const dynamodb = require('../config/dynamodb');

// Método para adicionar um novo produto
exports.addProduct = (req, res) => {
    const { productId, name, price, description, quantityInStock } = req.body;

    const params = {
        TableName: 'Products', // Nome da tabela de produtos no DynamoDB
        Item: {
            productId: { S: productId }, // 'S' indica tipo de string
            name: { S: name },
            price: { N: price.toString() }, // 'N' indica tipo numérico
            description: { S: description },
            quantityInStock: { N: quantityInStock.toString() }
        }
    };

    dynamodb.putItem(params, (err, data) => {
        if (err) {
            console.error('Erro ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro ao adicionar produto' });
        } else {
            res.json({ message: 'Produto adicionado com sucesso' });
        }
    });
};

// Método para obter todos os produtos
exports.getAllProducts = (req, res) => {
    const params = {
        TableName: 'Products' // Nome da tabela de produtos no DynamoDB
    };

    dynamodb.scan(params, (err, data) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro ao buscar produtos' });
        } else {
            const products = data.Items.map(item => {
                return {
                    productId: item.productId.S,
                    name: item.name.S,
                    price: parseFloat(item.price.N),
                    description: item.description.S,
                    quantityInStock: parseInt(item.quantityInStock.N)
                };
            });
            res.json(products);
        }
    });
};

// Método para obter um produto por ID
exports.getProductById = (req, res) => {
    const productId = req.params.id;

    const params = {
        TableName: 'Products', // Nome da tabela de produtos no DynamoDB
        Key: {
            productId: { S: productId }
        }
    };

    dynamodb.getItem(params, (err, data) => {
        if (err) {
            console.error('Erro ao buscar produto por ID:', err);
            res.status(500).json({ error: 'Erro ao buscar produto por ID' });
        } else {
            if (data.Item) {
                const product = {
                    productId: data.Item.productId.S,
                    name: data.Item.name.S,
                    price: parseFloat(data.Item.price.N),
                    description: data.Item.description.S,
                    quantityInStock: parseInt(data.Item.quantityInStock.N)
                };
                res.json(product);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        }
    });
};

// Método para atualizar um produto
exports.updateProduct = (req, res) => {
    const productId = req.params.id;
    const { name, price, description, quantityInStock } = req.body;

    const params = {
        TableName: 'Products', // Nome da tabela de produtos no DynamoDB
        Key: {
            productId: { S: productId }
        },
        UpdateExpression: 'SET #name = :name, price = :price, description = :description, quantityInStock = :quantityInStock',
        ExpressionAttributeNames: { '#name': 'name' },
        ExpressionAttributeValues: {
            ':name': { S: name },
            ':price': { N: price.toString() },
            ':description': { S: description },
            ':quantityInStock': { N: quantityInStock.toString() }
        }
    };

    dynamodb.updateItem(params, (err, data) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).json({ error: 'Erro ao atualizar produto' });
        } else {
            res.json({ message: 'Produto atualizado com sucesso' });
        }
    });
};

// Método para excluir um produto
exports.deleteProduct = (req, res) => {
    const productId = req.params.id;

    const params = {
        TableName: 'Products', // Nome da tabela de produtos no DynamoDB
        Key: {
            productId: { S: productId }
        }
    };

    dynamodb.deleteItem(params, (err, data) => {
        if (err) {
            console.error('Erro ao excluir produto:', err);
            res.status(500).json({ error: 'Erro ao excluir produto' });
        } else {
            res.json({ message: 'Produto excluído com sucesso' });
        }
    });
};
