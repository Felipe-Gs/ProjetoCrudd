const Z = require("zod");
const express = require("express");
const router = express.Router();
const { Client, Pool } = require("pg");

const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "felipe",
  database: "ProjetoCrudd",
});

client.connect();

router.get("/buscarUsuarios", (req, res) => {
  try {
    const query = `SELECT * FROM usuario`;
    client.query(query, (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "erro ao tentar buscar os dados",
        });
      } else {
        res.send(result.rows);
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "erro interno no servidor",
    });
  }
});

router.post("/login", (req, res) => {
  try {
    const usuarioBody = Z.object({
      email: Z.string().email(),
      senha: Z.string().min(3),
    }).required();
    const validData = usuarioBody.parse(req.body);
    const { email, senha } = validData;

    const query = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}'`;
    client.query(query, (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "Nao foi possivel fazer o login, verifique o email e senha",
        });
      } else if (result.rows.length === 0) {
        return res.status(404).send({
          message: "Não existe usuario com esse email e senha",
        });
      } else {
        return res.status(200).send({ usuario: result.rows[0] });
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: "erro interno no servidor",
    });
  }
});

router.post("/addUsuario", async (req, res) => {
  try {
    const usuarioBody = Z.object({
      nome: Z.string(),
      sobrenome: Z.string(),
      email: Z.string().email(),
      senha: Z.string().min(3),
      profissao: Z.string(),
      idade: Z.number(),
    }).required();
    const validData = usuarioBody.parse(req.body);
    const { nome, sobrenome, email, senha, profissao, idade } = validData;

    const query = `INSERT INTO usuario (nome, sobrenome, email, senha, profissao, idade) 
    VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [nome, sobrenome, email, senha, profissao, idade];

    client.query(query, values, (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "dados invalidos",
        });
      } else {
        return res.status(200).send({
          message: "usuario inserido com sucesso!",
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "erro interno no servidor!",
    });
  }
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  try {
    const query = `DELETE FROM usuario WHERE ID = ${id}`;
    client.query(query, (err, result) => {
      if (err) {
        return res.status(400).send({
          message: "nao foi possivel deletar o usuario",
        });
      } else {
        return res.status(200).send({
          message: "usuario deletado com sucesso",
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      message: "erro interno no servidor",
    });
  }
});

// router.post("/usuario", async (req, res) => {
//   try {
//     const { nome, sobrenome, email, senha, profissao, idade } = req.body;
//     const query =
//       "INSERT INTO usuario (nome, sobrenome, email, senha, profissao, idade) VALUES ($1, $2, $3, $4, $5, $6)";
//     const values = [nome, sobrenome, email, senha, profissao, idade];
//     await client.query(query, values);
//     res.status(201).send("Usuário criado com sucesso!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Erro interno no servidor!");
//   }
// });
module.exports = router;
