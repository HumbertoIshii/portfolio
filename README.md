# Meu Portfólio Pessoal

Este é um site desenvolvido com Node.js e Express, utilizando o mecanismo de visualização EJS. Ele apresenta projetos, introdução pessoal e outras informações de forma limpa e responsiva.

---

## 📁 Estrutura do Projeto

- `views/`: Contém as páginas EJS organizadas em partes reutilizáveis (partials) e páginas completas.
- `public/`: Arquivos estáticos (CSS, imagens).
- `routes/`: Rotas da aplicação.
- `database/create-database.js`: Script para criação do banco de dados e inserção de dados iniciais.
- `app.js`: Arquivo principal da aplicação Node.js.
- `.env`: Arquivo com variáveis de ambiente.
- `package.json`: Dependências e scripts do projeto.

---

## ⚙️ Funcionalidades

- Página inicial com introdução e certificações.
- Página de projetos com imagens e links para repositórios.
- Sistema de login para área administrativa.
- Inserção dinâmica de projetos via banco de dados.
- Layout responsivo com CSS e Bootstrap.

---

## 🎬 Vídeo do Site

https://github.com/user-attachments/assets/7db29642-ca27-43b7-a373-2aada901b68e

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/HumbertoIshii/portfolio
cd portfolio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.template .env
```
- Abra o arquivo .env e ajuste conforme necessário:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=meu_portfolio
SESSION_SECRET=algum_segredo
```

### 4. Crie o banco de dados e tabelas

- Esse script criará o banco e as tabelas necessárias, além de permitir que você cadastre uma senha para o admin e insira os projetos padrão.
```bash
node ./database/create-database.js
```

### 5. Inicie o servidor

```bash
node app.js
```

### 6. Acesse no navegador
http://localhost:3000