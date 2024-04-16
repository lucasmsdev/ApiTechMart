const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configuração do AWS DynamoDB
AWS.config.update({
    region: 'us-east-1', // substitua pela sua região
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com' // endpoint local do DynamoDB, altere conforme necessário
});

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

// Routes
const authRoutes = require('./routes/authRoutes')(docClient); // passando o cliente DynamoDB para as rotas de autenticação
const productRoutes = require('./routes/productRoutes')(docClient); // passando o cliente DynamoDB para as rotas de produtos

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
