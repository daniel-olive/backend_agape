Feature: Criar Evento
    Como um <Administrador>
    Eu quero <Criar um evento>
    De modo que <Os eventos fiquem a disposição do usuario> 

Scenario: Evento válido (Padrão)
    Dado (Given) [Evento válido]
    Quando (When) [Solicitar a Criação de um Evento]
    Então (Then) [O evento deve ser criado corretamente]

Scenario: Evento inválido - Titulo do evento é nulo ou indefinido
    Dado [Um evento com titulo nulo ou indefinido]
	Quando [Solicitar a Criação de um evento]
	Então [Um erro informando que o titulo do evento é nulo ou indefinido deve ser apresentado]

Scenario: Evento inválido - Titulo do Evento não atende o tamanho mínino (Execeção)
    Dado [Um Evento com titulo que não atende ao tamanho mínimo]
	Quando [Solicitar a Criação de um Evento]
	Então [Um erro informando que o titulo do evento não possui um tamanho mínimo válido deve ser apresentado]

Scenario: Evento inválido - Titulo do Evento não atende o tamanho máximo (Execeção)			
    Dado [Um evento com titulo que não atende ao tamanho máximo]
    Quando [Solicitar a Criação de um Evento]
    Então [Um erro informando que o titulo do evento não possui um tamanho máximo válido deve ser apresentado]    

Scenario: Evento inválido - Descrição do evento é nula ou indefinida
    Dado [Um evento com descrição nula ou indefinida]
	Quando [Solicitar a Criação de um evento]
	Então [Um erro informando que a descrição do evento é nula ou indefinida deve ser apresentado]

Scenario: Evento inválido - Descrição do Evento não atende o tamanho mínino (Execeção)
    Dado [Um Evento com Descrição que não atende ao tamanho mínimo]
	Quando [Solicitar a Criação de um Evento]
	Então [Um erro informando que a Descrição do evento não possui um tamanho mínimo válido deve ser apresentado]

Scenario: Evento inválido - Descrição do Evento não atende o tamanho maximo (Execeção)
    Dado [Um Evento com Descrição que não atende ao tamanho maximo]
	Quando [Solicitar a Criação de um Evento]
	Então [Um erro informando que a Descrição do evento não possui um tamanho maximo válido deve ser apresentado]

Scenario: Evento inválido - Local do evento é nulo ou indefinido
    Dado [Um evento com local nulo ou indefinido]
	Quando [Solicitar a Criação de um evento]
	Então [Um erro informando que o local do evento é nulo ou indefinido deve ser apresentado]

Scenario: Evento inválido - Data do evento é nula ou indefinida
    Dado [Um evento com data nula ou indefinida]
	Quando [Solicitar a Criação de um evento]
	Então [Um erro informando que a data do evento é nula ou indefinida deve ser apresentado]

Scenario: Evento inválido - Data do evento está com formato inválido
    Dado [Um evento com data com formato inválido]
	Quando [Solicitar a Criação de um evento]
	Então [Um erro informando que a data do evento está em formato inválido deve ser apresentado]

Scenario: Evento inválido - Horario do evento é nulo ou indefinido
    Dado [Um evento com horario nulo ou indefinido]
	Quando [Solicitar a Criação de um evento]
	Então [Um erro informando que o horario do evento é nulo ou indefinido deve ser apresentado]

Scenario: Evento inválido - Horario do evento está com formato inválido
    Dado [Um evento com horario com formato inválido]
	Quando [Solicitar a Criação de um evento]
	Então [Um erro informando que o horario do evento está em formato inválido deve ser apresentado]
