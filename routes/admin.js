const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Middleware de autenticação
  function isAuthenticated(req, res, next) {
    if (req.session && req.session.authenticated) {
      return next();
    }
    res.redirect('/login');
  }

  // Página de administração
  router.get('/', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM projetos', (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao carregar a lista de projetos');
      }
      res.render('admin', { projetos: results });
    });
  });

  // Salvar ou atualizar
  router.post('/save', isAuthenticated, (req, res) => {
    const { id, titulo, descricao, imagem_url, link } = req.body;

    if (id) {
      db.query(
        'UPDATE projetos SET titulo = ?, descricao = ?, imagem_url = ?, link = ? WHERE id = ?',
        [titulo, descricao, imagem_url, link, id],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar projeto');
          }
          res.redirect('/admin');
        }
      );
    } else {
      db.query(
        'INSERT INTO projetos (titulo, descricao, imagem_url, link) VALUES (?, ?, ?, ?)',
        [titulo, descricao, imagem_url, link],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Erro ao adicionar projeto');
          }
          res.redirect('/admin');
        }
      );
    }
  });

  // Excluir
  router.get('/delete/:id', isAuthenticated, (req, res) => {
    db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao excluir projeto');
      }
      res.redirect('/admin');
    });
  });

  return router;
};
