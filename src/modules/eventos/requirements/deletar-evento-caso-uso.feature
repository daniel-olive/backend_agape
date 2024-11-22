Feature: Deletar Evento
    Como um <Administrador>
    Eu quero <Deletar um evento>
    De modo que <O evento não esteja mais a disposição do usuario> 

Scenario: Deletar Evento válido (Padrão)
    Dado (Given) [Exclusão de Evento válido]
    Quando (When) [Solicitar a Exclusão de um Evento]
    Então (Then) [O evento deve ser Excluido corretamente]

Scenario: Deletar Evento inválido (Padrão)
    Dado (Given) [O cancelamento da Exclusão de um Evento]
    Quando (When) [Solicitar a Exclusão de um Evento e aparecer a mensagem de confirmação]
    Então (Then) [O evento deve ser Mantido e não ser Excluido corretamente]