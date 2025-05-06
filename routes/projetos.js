const express = require('express')
const router = express.Router()

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query('SELECT * FROM projetos', (err, results) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Erro ao buscar projetos')
      }
      res.render('projects', { projetos: results })
    })
  })
  return router
}
