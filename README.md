## Configurações Banco de dados

````sh
// rodar migrations e criar banco
dotnet ef database update --project Api.Data

````



## ✅ Requisitos Funcionais (RF)

- [ ] **RF01 - Cadastro de Chatbot**<br>
O sistema deve permitir ao usuário criar um novo chatbot informando:<br> 
Nome do bot.<br>
Contexto inicial ou descrição (ex: “Você é um assistente de vendas educado”).

- [ ] **RF02 - Listagem de Chatbots**<br>
O sistema deve listar todos os chatbots criados pelo usuário, exibindo nome e contexto.

- [ ] **RF03 - Seleção de Chatbot**<br>
O sistema deve permitir que o usuário selecione um chatbot existente para iniciar ou continuar uma conversa.

- [ ] **RF04 - Interface de Conversa**<br>
O sistema deve oferecer uma interface de chat com:<br>
Campo de entrada de mensagem.<br>
Botão de envio.<br>
Exibição do histórico da conversa.

- [ ] **RF05 - Interação com a API da OpenAI**<br>
O sistema deve integrar-se com a API da OpenAI (gpt-3.5-turbo ou gpt-4) para gerar respostas baseadas no contexto do chatbot e na mensagem do usuário.

- [ ] **RF06 - Armazenamento das Conversas**<br>
O sistema deve armazenar no banco de dados:<br>
As mensagens enviadas pelo usuário.<br>
As respostas geradas pelo bot.<br>
A qual chatbot cada mensagem pertence.

- [ ] **RF07 - Recuperação de Histórico**<br>
O sistema deve exibir o histórico completo da conversa ao abrir o chat de um chatbot existente.

- [ ] **RF08 - Persistência dos Dados**
O sistema deve salvar os dados utilizando Entity Framework Core com qualquer banco relacional.

## 🚫 Requisitos Não Funcionais (RNF)
- [ ] **RNF01 - Tecnologias Obrigatórias**<br>
Backend deve ser desenvolvido em C# utilizando .NET 6 ou superior.
Frontend deve ser implementado com ReactJS, utilizando Vite ou Create React App.

- [ ] **RNF02 - Qualidade do Código**<br>
O código deve ser limpo, modular, organizado e seguir boas práticas de desenvolvimento.
Deve haver separação clara entre camadas (ex: controllers, services, repositories).
- [ ] **RNF03 - Reutilização de Componentes**<br>
Os componentes da interface devem ser reutilizáveis sempre que possível.

- [ ] **RNF04 - Performance e UX**<br>
A interface de chat deve ter boa experiência de usuário, incluindo:<br>
Scroll automático para a última mensagem.<br>
Indicadores de carregamento durante a resposta do bot.

- [ ] **RNF05 - Documentação**<br>
O projeto deve conter:<br>
README completo com instruções de instalação, execução e tecnologias usadas.<br>
Código comentado onde necessário.

- [ ] **RNF06 - Testabilidade**<br>
O sistema deve ser estruturado para facilitar a implementação de testes (testes unitários são um diferencial).

- [ ] **RNF07 - Segurança e Configurações**<br>
Informações sensíveis como a chave da API da OpenAI devem estar em arquivos de configuração seguros (ex: appsettings.json ou .env).

- [ ] **RNF08 - Compatibilidade e Responsividade**<br>
A aplicação web deve ser compatível com os principais navegadores modernos.<br>
A interface deve ser responsiva em diferentes tamanhos de tela (desktop e mobile).