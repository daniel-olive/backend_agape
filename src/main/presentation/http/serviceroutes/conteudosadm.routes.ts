import express from 'express';

const conteudosadmRouter = express.Router();

conteudosadmRouter.get('/', async (req, res) => {
    const { autor } = req.query;
  
    try {
      const conteudos = await prisma.conteudo.findMany({
        where: {
          autor: String(autor), // Certifique-se de que autor é uma string
        },
      });
      res.json(conteudos);
    } catch (error) {
      console.error("Erro ao buscar conteúdos:", error);
      res.status(500).send("Erro ao buscar conteúdos");
    }
  });

  export{conteudosadmRouter}