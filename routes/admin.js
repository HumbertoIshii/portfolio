const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

module.exports = (db) => {
  // Middleware de autenticação
  function isAuthenticated(req, res, next) {
    if (req.session && req.session.authenticated) {
      return next();
    }
    res.redirect('/login');
  }

  // Configuração do Multer para upload de imagens
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images'));
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

  // Página de administração (listagem de projetos)
  router.get('/', isAuthenticated, (req, res) => {
    db.query('SELECT * FROM projetos', (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao carregar a lista de projetos');
      }
      res.render('admin', { projetos: results, projetoParaEditar: null });
    });
  });

  // Rota para carregar dados do projeto a ser editado
  router.get('/edit/:id', isAuthenticated, (req, res) => {
    const projetoId = req.params.id;

    db.query('SELECT * FROM projetos WHERE id = ?', [projetoId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao buscar projeto para edição');
      }

      if (results.length === 0) {
        return res.status(404).send('Projeto não encontrado');
      }

      const projetoParaEditar = results[0];

      db.query('SELECT * FROM projetos', (err, allProjetos) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro ao carregar projetos');
        }

        res.render('admin', { projetos: allProjetos, projetoParaEditar });
      });
    });
  });

  // Salvar ou atualizar projeto com imagem
  router.put('/save', isAuthenticated, upload.single('imagem'), (req, res) => {
    const { id, titulo, descricao, link } = req.body;
    const imagem_url = req.file ? `/images/${req.file.filename}` : req.body.imagem_url || '';

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

  // Excluir projeto
  router.delete('/delete/:id', isAuthenticated, (req, res) => {
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
