import { DomainException } from "shared/domain/domain.exception";
import { prisma } from "main/infra/database/orm/prisma/client";
import { deletarEventoUseCase } from "modules/eventos/application/use-cases";




async function main() {
    prisma.$connect().then(async => {
        console.log('Postgres Conectado')
    })

    

   console.log(await deletarEventoUseCase.execute(""));


}

main()
    .then(async() => {
    await prisma.$disconnect()
    })
    .catch(async (error) => {
        if(error instanceof DomainException){
            console.log('Exceção de Dominio');
            console.log(error.message);
        }
        else{
            console.log('Outras Exceções');
            console.log(error.message)
        }
        await prisma.$disconnect()
        process.exit(1)
    })