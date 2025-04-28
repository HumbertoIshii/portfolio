const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// Rota página inicial
app.get('/', (req, res) => {
  const nome = 'Humberto'
  res.render('index', {nome:nome})
})

// Rota página de projetos
app.get('/projetos', (req, res) => {
  res.render('projects')
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})
