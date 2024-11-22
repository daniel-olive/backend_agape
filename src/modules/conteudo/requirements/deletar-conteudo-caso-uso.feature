Feature: Deletar Conteúdo
    Como um <Administrador>
    Eu quero <Deletar um Conteúdo>
    De modo que <O Conteúdo não esteja mais a disposição do usuario> 

Scenario: Deletar Conteúdo válido (Padrão)
    Dado (Given) [Exclusão de Conteúdo válido]
    Quando (When) [Solicitar a Exclusão de um Conteúdo]
    Então (Then) [O Conteúdo deve ser Excluido corretamente]

Scenario: Deletar Conteúdo inválido (Padrão)
    Dado (Given) [O cancelamento da Exclusão do Conteúdo]
    Quando (When) [Solicitar a Exclusão de um Conteúdo e aparecer a mensagem de confirmação]
    Então (Then) [O Conteúdo deve ser Mantido e não ser Excluida corretamente]