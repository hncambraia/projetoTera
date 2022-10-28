const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

const connect = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
       // console.log("Banco conectado",MONGODB_URI)
    } catch (error) {
        console.error("Erro: ", error.message)
    }
}

module.exports = {
    connect
}
