const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
  // Página de login
  router.get('/login', (req, res) => {
    res.render('login');
  });

  // Autenticar login
  router.post('/login', (req, res) => {
    const { senha } = req.body;

    db.query('SELECT * FROM senha LIMIT 1', (err, results) => {
      if (err || results.length === 0) {
        return res.send('Erro: senha não cadastrada');
      }

      const hashSalvo = results[0].senha_hash;

      bcrypt.compare(senha, hashSalvo, (err, result) => {
        if (result) {
          req.session.authenticated = true;
          return res.redirect('/admin');
        } else {
          return res.send('Senha incorreta');
        }
      });
    });
  });

  // Logout
  router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  return router;
};
