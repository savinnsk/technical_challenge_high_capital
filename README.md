## Configurações inicial do projeto

**renomei o arquivo .env-exemple no backend para .env e coloque a chave para usar o openIA :**<br>
OPENAI_API_KEY=

**renomei o arquivo .env-exemple no frontend para .env a url padrão de teste já está definida**<br>
VITE_API_URL=http://127.0.0.1:5201

### Para rodar o projeto basta ter o docker e entra na pasta aonde estar o docker compose file
````sh
# com esse commando as migrations, e todas as configurações vão funcionar
docker compose up

````

**Endereço da documentação da API com swagger**<br>
http://localhost:5201/swagger/index.html


**Endereço da aplicação(frontend)**<br>
 http://localhost:5173


### Para rodar sem o docker

````sh
# rodar migrations e criar banco
dotnet ef database update --project Api.Data

# rodar projeto backend / entra na pasta backend
dotnet run --project .\Api.Application\Api.Aplication.csproj

# rodar projeto frontend / entra na pasta frotend
npm run dev

````

## Ferramentas usadas

- SQLite
- Vite
- .NET
- EntityFramework
- Docker
- Swagger

## ✅ Requisitos Funcionais (RF)

- [x] **RF01 - Cadastro de Chatbot**<br>
O sistema deve permitir ao usuário criar um novo chatbot informando:<br> 
Nome do bot.<br>
Contexto inicial ou descrição (ex: “Você é um assistente de vendas educado”).

- [x] **RF02 - Listagem de Chatbots**<br>
O sistema deve listar todos os chatbots criados pelo usuário, exibindo nome e contexto.

- [x] **RF03 - Seleção de Chatbot**<br>
O sistema deve permitir que o usuário selecione um chatbot existente para iniciar ou continuar uma conversa.

- [x] **RF04 - Interface de Conversa**<br>
O sistema deve oferecer uma interface de chat com:<br>
Campo de entrada de mensagem.<br>
Botão de envio.<br>
Exibição do histórico da conversa.

- [x] **RF05 - Interação com a API da OpenAI**<br>
O sistema deve integrar-se com a API da OpenAI (gpt-3.5-turbo ou gpt-4) para gerar respostas baseadas no contexto do chatbot e na mensagem do usuário.

- [x] **RF06 - Armazenamento das Conversas**<br>
O sistema deve armazenar no banco de dados:<br>
As mensagens enviadas pelo usuário.<br>
As respostas geradas pelo bot.<br>
A qual chatbot cada mensagem pertence.

- [x] **RF07 - Recuperação de Histórico**<br>
O sistema deve exibir o histórico completo da conversa ao abrir o chat de um chatbot existente.

- [x] **RF08 - Persistência dos Dados**
O sistema deve salvar os dados utilizando Entity Framework Core com qualquer banco relacional.

## 🚫 Requisitos Não Funcionais (RNF)
- [x] **RNF01 - Tecnologias Obrigatórias**<br>
Backend deve ser desenvolvido em C# utilizando .NET 6 ou superior.
Frontend deve ser implementado com ReactJS, utilizando Vite ou Create React App.

- [x] **RNF02 - Qualidade do Código**<br>
O código deve ser limpo, modular, organizado e seguir boas práticas de desenvolvimento.
Deve haver separação clara entre camadas (ex: controllers, services, repositories).
- [x] **RNF03 - Reutilização de Componentes**<br>
Os componentes da interface devem ser reutilizáveis sempre que possível.

- [x] **RNF04 - Performance e UX**<br>
A interface de chat deve ter boa experiência de usuário, incluindo:<br>
Scroll automático para a última mensagem.<br>
Indicadores de carregamento durante a resposta do bot.

- [x] **RNF05 - Documentação**<br>
O projeto deve conter:<br>
README completo com instruções de instalação, execução e tecnologias usadas.<br>
Código comentado onde necessário.

- [ ] **RNF06 - Testabilidade**<br>
O sistema deve ser estruturado para facilitar a implementação de testes (testes unitários são um diferencial).

- [x]**RNF07 - Segurança e Configurações**<br>
Informações sensíveis como a chave da API da OpenAI devem estar em arquivos de configuração seguros (ex: appsettings.json ou .env).

- [x] **RNF08 - Compatibilidade e Responsividade**<br>
A aplicação web deve ser compatível com os principais navegadores modernos.<br>
A interface deve ser responsiva em diferentes tamanhos de tela (desktop e mobile).