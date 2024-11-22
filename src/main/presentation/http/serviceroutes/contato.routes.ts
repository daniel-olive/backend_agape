import express from 'express';
import nodemailer from 'nodemailer'; // Para TypeScript

const contatoRouter = express.Router();

contatoRouter.post('/', (req, res) => {
    const { name, email, message } = req.body;

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'pontesdejesusdavid@gmail.com',
            pass: 'iimf vxxo cuie mfcd' // Não compartilhe suas credenciais sensíveis em código aberto
        }
    });

    transport.sendMail({
        from: email, // Usando o e-mail do usuário como remetente
        to: 'davidpontes740@gmail.com',
        subject: `Mensagem de ${name} pelo formulário de contato`,
        html: `<h1>Mensagem de ${name}</h1><p>Email: ${email}</p><p>${message}</p>`,
        text: `Mensagem de ${name}\nEmail: ${email}\n\n${message}`
    })
    .then(() => {
        res.status(200).send('Email enviado com sucesso');
    })
    .catch((error) => {
        console.error('Erro ao enviar email:', error);
        res.status(500).send('Erro ao enviar email');
    });
});

export {contatoRouter}