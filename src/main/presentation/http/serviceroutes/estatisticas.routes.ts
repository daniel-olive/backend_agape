import { PrismaClient } from "@prisma/client";
import express from 'express';


const prisma = new PrismaClient();

const estatisticasRouter = express.Router();

const getAdministradoresCount = async () => {
    return await prisma.administrador.count(); // Substitua 'administrador' pelo nome da sua tabela no Prisma
  };
  
  const getEventosCount = async () => {
    return await prisma.evento.count(); // Substitua 'evento' pelo nome da sua tabela no Prisma
  };
  
  const getConteudosCount = async () => {
    return await prisma.conteudo.count(); // Substitua 'conteudo' pelo nome da sua tabela no Prisma
  };



estatisticasRouter.get('/', async (req, res) => {
    try {
      const administradoresCount = await getAdministradoresCount();
      const eventosCount = await getEventosCount();
      const conteudosCount = await getConteudosCount();
  
      res.json({
        administradores: administradoresCount,
        eventos: eventosCount,
        conteudos: conteudosCount,
      });
    } catch (error) {
      console.error("Erro ao buscar estatísticas", error);
      res.status(500).json({ error: "Erro ao buscar estatísticas" });
    }
  });


  export{estatisticasRouter}