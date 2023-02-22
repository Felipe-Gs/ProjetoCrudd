const express = require("express");
const router = express.Router();

router.get("/l", (req, res) => {
  res.send({
    message: "olá",
  });
});

router.post("/add", (req, res) => {
  const name = req.body.name;
  try {
    if (!name) {
      return res.status(404).send({
        message: "dados invalidos",
      });
    } else {
      linguagens.push(name);
      return res.status(200).send(linguagens);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
