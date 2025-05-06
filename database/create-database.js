const mysql = require('mysql2')
const bcrypt = require('bcrypt')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'fatec',
  multipleStatements: true
}

const connection = mysql.createConnection(dbConfig)

const createDatabaseAndTables = `
  CREATE DATABASE IF NOT EXISTS meu_portfolio;
  USE meu_portfolio;

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

connection.query(createDatabaseAndTables, (err) => {
  if (err) throw err
  console.log('Banco de dados e tabelas criados/verificados com sucesso.')

  const db = mysql.createConnection({
    ...dbConfig,
    database: 'meu_portfolio'
  })

  rl.question('Defina uma senha: ', (senha) => {
    bcrypt.hash(senha, 10, (err, hash) => {
      if (err) throw err
      db.query('INSERT INTO senha (senha_hash) VALUES (?)', [hash], (err) => {
        if (err) throw err
        console.log('Senha criada e armazenada com sucesso no banco de dados!')
        rl.close()
        db.end()
      })
    })
  })
})
