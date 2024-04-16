const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Busca o usuário pelo nome de usuário
        const user = await User.getUserByUsername(username);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }

        // Compara a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Autenticação bem-sucedida, retorna um token JWT ou outra forma de autenticação
            res.json({ success: true, token: 'seu_token_jwt_aqui' });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ success: false, message: 'Erro ao fazer login' });
    }
};

exports.createUser = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'O nome de usuário já está em uso' });
        }

        // Cria uma instância do usuário
        const newUser = new User({
            username: username,
            password: password,
            email: email
        });

        // Salva o novo usuário no banco de dados
        await newUser.save();

        res.status(201).json({ success: true, message: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ success: false, message: 'Erro ao criar usuário' });
    }
};
