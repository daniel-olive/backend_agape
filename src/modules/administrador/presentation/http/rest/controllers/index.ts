import { atualizarAdministradorUseCase, autenticarAdministradorUseCase, deletarAdministradorUseCase, recuperarAdmPorIdUseCase, recuperarTodosAdmUseCase, registrarAdministradorUseCase } from "../../../../../../modules/administrador/application/use-cases";
import { AutenticarAdmExpressController } from "./autenticar-administrador.express.controller";
import { RegistrarAdmExpressController } from "./registrar-administrador.express.controller";
import { AtualizarAdmExpressController } from "./atualizar-administrador.express.controller";
import { DeletarAdmExpressController } from "./deletar-administrador.express.controller";
import { RecuperarTodosAdmExpressController } from "./recuperar-todos-adm.express.controller";
import { RecuperarAdmPorIdExpressController } from "./recuperar-administrador-por-id.express.controller";

const registrarAdmController = new RegistrarAdmExpressController(registrarAdministradorUseCase)
const autenticarAdmController = new AutenticarAdmExpressController(autenticarAdministradorUseCase);
const atualizarAdmController = new AtualizarAdmExpressController(atualizarAdministradorUseCase)
const deletarAdmController = new DeletarAdmExpressController(deletarAdministradorUseCase)
const recuperarTodosAdmController = new RecuperarTodosAdmExpressController(recuperarTodosAdmUseCase)
const recuperarAdmPorIdController = new RecuperarAdmPorIdExpressController(recuperarAdmPorIdUseCase)
export {
    registrarAdmController,
    autenticarAdmController,
    atualizarAdmController,
    deletarAdmController,
    recuperarTodosAdmController,
    recuperarAdmPorIdController
}