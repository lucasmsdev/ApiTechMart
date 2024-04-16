const AWS = require('aws-sdk');

// Configuração do AWS DynamoDB
AWS.config.update({
  region: 'us-east-1' // substitua pela sua região
});

const dynamodb = new AWS.DynamoDB();

const params = {
    TableName: 'Users', // Nome da tabela para armazenar usuários
    KeySchema: [
        { AttributeName: 'username', KeyType: 'HASH' }  // Chave primária: username
    ],
    AttributeDefinitions: [
        { AttributeName: 'username', AttributeType: 'S' }  // 'S' indica tipo de string
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,  
        WriteCapacityUnits: 5  
    }
};

// Criação da tabela de usuários
dynamodb.createTable(params, (err, data) => {
    if (err) {
        console.error('Erro ao criar tabela de usuários:', err);
    } else {
        console.log('Tabela de usuários criada com sucesso:', data);
    }
});

module.exports = dynamodb;
