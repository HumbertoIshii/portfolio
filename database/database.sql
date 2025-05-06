CREATE DATABASE meu_portfolio;

USE meu_portfolio;

CREATE TABLE projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  imagem_url VARCHAR(255),
  link VARCHAR(255),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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