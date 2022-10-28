const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  nome: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: false,
    select: false,
  },
  bio: {
    type: String,
    required: false,
  },
  salt: {
    type: String,
    required: true,
  },
  amigos: {
    type: Array(),
    required: false,
  },
  feed: {
    type: Array(),
    required: false,
  },
  imagem: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("users", userSchema);
