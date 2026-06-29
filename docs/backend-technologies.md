# Tech Stack do Backend

## 1. Introdução

Este documento descreve o conjunto de bibliotecas e ferramentas utilizadas no backend do sistema **Smash or Pass Recipes**, desenvolvido com arquitetura Cliente-Servidor. O objetivo é registrar de forma estruturada as tecnologias adotadas, categorizando-as por responsabilidade arquitetural e justificando sua utilização no contexto do sistema.

---

## 2. Visão Geral da Stack

O backend é construído sobre o ecossistema **Node.js com TypeScript**, utilizando o framework **Express** como base para a API REST. A persistência de dados é gerenciada pelo ORM **Prisma**, com banco de dados relacional PostgreSQL. O sistema adota autenticação stateless baseada em JWT e mecanismos complementares de segurança e validação de dados.

---

## 3. Categorias de Dependências

### 3.1 Camada de Servidor e API

- **express**
  
Framework minimalista para construção de APIs HTTP. Responsável pelo roteamento, middlewares e gerenciamento do ciclo de requisições.

- **cors**
  
Middleware responsável por habilitar e configurar políticas de Cross-Origin Resource Sharing, permitindo integração com aplicações frontend externas.

- **helmet**
  
Biblioteca de segurança que configura automaticamente headers HTTP para mitigação de vulnerabilidades comuns em aplicações web.

- **morgan**
  
Middleware de logging HTTP utilizado para monitoramento de requisições e depuração do sistema.

- **dotenv**
  
Responsável pelo carregamento de variáveis de ambiente a partir de arquivos `.env`, permitindo configuração externa do sistema.

---

### 3.2 Autenticação e Segurança

- **jsonwebtoken**
  
Implementa autenticação baseada em tokens JWT, permitindo comunicação stateless entre cliente e servidor.

- **bcrypt**
  
Utilizado para hashing e verificação segura de senhas, garantindo proteção contra exposição de credenciais em caso de comprometimento da base de dados.

---

### 3.3 Persistência de Dados

- **@prisma/client**
  
Cliente gerado automaticamente pelo Prisma ORM, responsável pela interação tipada com o banco de dados.

- **prisma**
  
Ferramenta de CLI utilizada para gerenciamento de migrations, geração de client e introspecção do banco de dados.

---

### 3.4 Validação de Dados

- **zod**
  
Biblioteca de validação e parsing de schemas utilizada para validação estrutural de dados em tempo de execução, garantindo integridade dos DTOs.

---

### 3.5 Upload e Processamento de Arquivos

- **multer**
  
Middleware responsável pelo tratamento de requisições multipart/form-data, permitindo upload de arquivos.

- **sharp**
  
Biblioteca de processamento de imagens utilizada para otimização, redimensionamento e conversão de arquivos de mídia.

---

### 3.6 Documentação da API

- **swagger-jsdoc**
  
Geração automática de especificação OpenAPI a partir de anotações no código.

- **swagger-ui-express**
  
Interface visual interativa para exploração e testes da API documentada via Swagger.

- **yamljs**
  
Parser para arquivos YAML utilizados como alternativa ou complemento na definição de especificações OpenAPI.

---

### 3.7 Testes Automatizados

O sistema atualmente não implementa suíte de testes automatizados.
A camada de testes foi removida do escopo atual do projeto, sendo prevista apenas como evolução futura.

Essa decisão foi tomada para priorizar:
- implementação funcional da API
- estabilidade do backend
- entrega incremental do sistema

---

### 3.8 Ferramentas de Desenvolvimento

- **typescript**
  
Superset do JavaScript que adiciona tipagem estática ao código.

- **ts-node-dev**
  
Executor de TypeScript com hot reload para ambiente de desenvolvimento.

- **tsx**
  
Runtime moderno para execução de TypeScript sem necessidade de compilação prévia.

---

## 4. Análise Arquitetural

A composição da stack evidencia as seguintes decisões arquiteturais:

### 4.1 Arquitetura orientada a API REST

A adoção de Express como framework principal reforça um modelo baseado em serviços stateless, adequado para separação entre frontend e backend.

---

### 4.2 Persistência relacional tipada

O uso do Prisma ORM indica uma estratégia de abstração fortemente tipada sobre PostgreSQL, garantindo consistência estrutural e reduzindo erros de consulta.

---

### 4.3 Segurança em múltiplas camadas

A combinação de JWT, bcrypt e helmet demonstra a aplicação de um modelo de segurança em camadas, cobrindo autenticação, integridade de credenciais e proteção de headers HTTP.

---

### 4.4 Validação em runtime

A adoção do Zod sugere uma abordagem defensiva, na qual validação de entrada é tratada como responsabilidade explícita da aplicação, e não apenas do banco de dados.

---

### 4.5 Pipeline de mídia local

O uso de multer e sharp indica que o sistema implementa um pipeline interno de processamento de arquivos, sem dependência de serviços externos de storage.

---

## 5. Considerações Finais

A stack adotada apresenta coerência com os objetivos do sistema, priorizando:

- produtividade no desenvolvimento
- tipagem forte (TypeScript + Prisma)
- segurança em nível de aplicação
- independência de serviços externos
- facilidade de manutenção acadêmica e evolutiva