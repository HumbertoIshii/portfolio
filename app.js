require('dotenv').config()
const express = require('express')
const session = require('express-session')
const mysql = require('mysql2')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
    return
  }
  console.log('Conectado ao MySQL')
})

// Configurações do Express
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Rotas
app.get('/', (req, res) => {
  res.render('index', { nome: 'Humberto' })
})

const authRoutes = require('./routes/auth')
app.use('/', authRoutes(db))

const adminRoutes = require('./routes/admin')
app.use('/admin', adminRoutes(db))

const projetoRoutes = require('./routes/projetos')
app.use('/projetos', projetoRoutes(db))

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
