const bcrypt = require("bcrypt");

const UserSchema = require("../models/userSchema");
const { use } = require("../routes/feedRoutes");

const getAll = async (req, res) => {
  UserSchema.find(function (err, usuarios) {
    console.log("todos os usuarios do banco: ", usuarios);
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(usuarios);
  });
};

const getUser = async (req, res) => {
  console.log(req.params.id);
  UserSchema.find({ _id: req.params.id }, function (err, data) {
    console.log("data", data);
    res.status(200).send(data);
  });
};

const deleteUser = async (req, res) => {
  console.log(req.params.login);
  const user = await UserSchema.deleteOne({ login: req.params.login });
  res.status(200).send({ mensagem: "Usuario excluído com sucesso" });
};

const validaUsuario = async function (req, res) {
  const usuario = req.body.login;
  const senha = req.body.senha;
  const user = await UserSchema.findOne({ login: usuario });
  var status = 401;
  var mensagem = { status: false, mensagem: "Credenciais inválidas!" };
  if (user) {
    const userValid = await UserSchema.findOne({
      login: usuario,
      senha: bcrypt.hashSync(senha, user.salt),
    });

    if (userValid) {
      const checkSenha = bcrypt.hashSync(senha, user.salt);
      console.log(userValid);
      // console.log("senha", checkSenha)
      //if (checkSenha == user.senha) {
      status = 200;
      mensagem = {
        status: true,
        mensagem: "Usuário Validado",
        id: userValid._id,
      };
      //}
    }
  }
  res.status(status).send(mensagem);
};

const alteraNome = async (req, res) => {
  console.log(req.params.email);
  const usuarioFiltrado = await UserSchema.findOne({ login: req.params.login });
  console.log(usuarioFiltrado);
  usuarioFiltrado.nome = req.body.nome;
  usuarioFiltrado.save();
  res.status(200).send({
    messagem: `${req.params.login}, alterado`,
    dados: usuarioFiltrado,
  });
};
const alteraDados = async (req, res) => {
  console.log(req.params.email);
  const usuarioFiltrado = await UserSchema.findOneAndUpdate({
    login: req.params.login,
  });
  console.log(usuarioFiltrado);
  if (req.body.nome != "") {
    usuarioFiltrado.nome = req.body.nome;
  }
  if (req.body.email != "") {
    usuarioFiltrado.email = req.body.email;
  }
  if (req.body.bio != "") {
    usuarioFiltrado.bio = req.body.bio;
  }

  //usuarioFiltrado.save()
  res.status(200).send({ messagem: "dados alterados", dados: usuarioFiltrado });
};

const createUser = async (req, res) => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(req.body.senha, salt);
  req.body.senha = hashedPassword;
  const validacaoUsuario = await UserSchema.findOne({ login: req.body.login });
  console.log(validacaoUsuario);
  if (validacaoUsuario) {
    res.status(200).send({
      message: "Usuário já existente",
      usuario: req.body.login,
    });
  } else {
    try {
      // acessar informações do body da requisição
      const newUser = new UserSchema({
        nome: req.body.nome,
        login: req.body.login,
        senha: req.body.senha,
        email: req.body.email,
        bio: req.body.bio,
        amigos: req.body.amigos,
        posts: req.body.posts,
        salt: salt,
      });

      const savedUser = await newUser.save();

      res.status(201).send({
        message: "Novo usuário criado com sucesso",
        savedUser,
      });
    } catch (e) {
      console.error(e);
    }
  }
};

module.exports = {
  getAll,
  getUser,
  createUser,
  validaUsuario,
  deleteUser,
  alteraNome,
  alteraDados,
};
