const feedSchema = require("../models/feedSchema");

const getAll = async (req, res) => {
  feedSchema
    .find(function (err, receitas) {
      console.log("todos as receitas do banco: ", receitas);
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.status(200).send(receitas);
    })
    .sort({ _id: -1 });
};

const getReceita = async (req, res) => {
  console.log(req.params.ingrediente);
  feedSchema.find(
    { ingredientes: { $regex: req.params.ingrediente } },
    function (err, data) {
      console.log("data", data);
      res.status(200).send(data);
    }
  );
};

const deleteReceita = async (req, res) => {
  console.log(req.params.titulo);
  const receita = await feedSchema.deleteOne({ titulo: req.params.titulo });
  res.status(200).send({ mensagem: `Receita ${receita} excluída com sucesso` });
  receita.save();
};

const alteraTitulo = async (req, res) => {
  const receitaFiltrada = await feedSchema.findOne({
    titulo: req.params.titulo,
  });
  console.log(receitaFiltrada);
  receitaFiltrada.titulo = req.body.titulo;
  receitaFiltrada.save();
  res
    .status(200)
    .send({
      messagem: `${req.body.titulo}, alterada`,
      dados: receitaFiltrada.titulo,
    });
};
const alteraReceita = async (req, res) => {
  console.log(req.params.titulo);
  const feedFiltrado = await feedSchema.findOne({ titulo: req.params.titulo });

  feedFiltrado.ingredientes = req.body.ingredientes;
  feedFiltrado.modopreparo = req.body.modopreparo;
  feedFiltrado.imagem = req.body.imagem;
  feedFiltrado.save();

  res.status(200).send({ messagem: "dados alterados", dados: usuarioFiltrado });
};

const createReceita = async (req, res) => {
  try {
    // acessar informações do body da requisição
    const newReceita = new feedSchema({
      titulo: req.body.titulo,
      ingredientes: req.body.ingredientes,
      modopreparo: req.body.modopreparo,
      imagem: req.body.imagem,
    });

    const savedReceita = await newReceita.save();

    res.status(201).send({
      message: "Nova receita criada com sucesso",
      savedReceita,
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getAll,
  getReceita,
  createReceita,
  deleteReceita,
  alteraTitulo,
  alteraReceita,
};
