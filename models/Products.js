const AWS = require('aws-sdk');

// Configuração do AWS DynamoDB
AWS.config.update({
  region: 'us-east-1' // substitua pela sua região
});

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: 'Products', // Nome da tabela para armazenar produtos
    KeySchema: [
        { AttributeName: 'productId', KeyType: 'HASH' }  // Chave primária: productId
    ],
    AttributeDefinitions: [
        { AttributeName: 'productId', AttributeType: 'S' }  // 'S' indica tipo de string
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,  // Ajuste conforme necessário
        WriteCapacityUnits: 5  // Ajuste conforme necessário
    }
};

// Criação da tabela de produtos
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error('Erro ao criar tabela de produtos:', err);
    } else {
        console.log('Tabela de produtos criada com sucesso:', data);
    }
});

module.exports = dynamodb;
