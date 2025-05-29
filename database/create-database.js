require('dotenv').config()
const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const readline = require('readline')

// Interface de leitura para entrada do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Configuração da conexão usando variáveis de ambiente
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true
}

const connection = mysql.createConnection(dbConfig)

// SQL para criar o banco de dados e tabelas
const createDatabaseAndTables = `
  CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
  USE ${process.env.DB_NAME};

  CREATE TABLE IF NOT EXISTS projetos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    imagem_url VARCHAR(255),
    link VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS senha (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senha_hash VARCHAR(255) NOT NULL
  );
`

// SQL para inserir projetos padrão
const insertDefaultProjects = `
  INSERT INTO projetos (titulo, descricao, imagem_url, link) VALUES
  (
    'Scrum Teach',
    'Projeto desenvolvido com Flask e MySQL para apresentar os principais conceitos da metodologia Scrum. O site conta com páginas estáticas estruturadas em HTML, CSS e Bootstrap, além de um pequeno sistema de cadastro gerenciado via banco de dados.',
    '/images/scrum.png',
    'https://github.com/HumbertoIshii/API1Semestre'
  ),
  (
    'Alplaca',
    'Aplicativo desktop desenvolvido em Java utilizando a biblioteca Swing para interface gráfica. O sistema realiza a análise de imagens de placas de veículos por meio de uma IA local integrada via Ollama, armazenando os dados processados em um banco de dados.',
    '/images/alplaca.png',
    'https://github.com/Bug-Busters-F/alplaca'
  ),
  (
    'AI Agent',
    'Agente inteligente desenvolvido com a biblioteca SmallAgents, capaz de buscar e analisar comentários de vídeos do YouTube. A análise de sentimentos é realizada com modelos baseados em Transformers, enquanto a IA do agente roda localmente via Ollama.',
    '/images/Alfred.png',
    'https://github.com/HumbertoIshii/AI-Agent'
  );
`

connection.query(createDatabaseAndTables, (err) => {
  if (err) throw err
  console.log('Banco de dados e tabelas criados/verificados com sucesso.')

  const db = mysql.createConnection({
    ...dbConfig,
    database: process.env.DB_NAME
  })

  rl.question('Defina uma senha: ', (senha) => {
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) throw err
      db.query('INSERT INTO senha (senha_hash) VALUES (?)', [hash], (err) => {
        if (err) throw err
        console.log('Senha criada e armazenada com sucesso no banco de dados!')

        rl.question('Deseja adicionar os projetos padrão? (Y/N) ', (resposta) => {
          if (resposta.trim().toLowerCase() === 'y') {
            db.query(insertDefaultProjects, (err) => {
              if (err) throw err
              console.log('Projetos padrão adicionados com sucesso!')
              finalizar()
            })
          } else {
            console.log('Projetos padrão não adicionados.')
            finalizar()
          }
        })

        function finalizar() {
          rl.close()
          db.end((err) => {
            if (err) console.error('Erro ao fechar conexão db:', err)
            else console.log('Conexão db encerrada.')

            connection.end((err) => {
              if (err) console.error('Erro ao fechar conexão connection:', err)
              else console.log('Conexão connection encerrada.')
              process.exit(0)
            })
          })
        }
      })
    })
  })
})
