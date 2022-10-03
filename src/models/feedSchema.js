const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    
    			

    
    titulo: {
        type: String,
        required: true
    },
    ingredientes: {
        type: String,
        required: true
    },
    modopreparo: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('feed', feedSchema)
