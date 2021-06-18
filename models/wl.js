const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WLSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    passaport: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    aprovado: {
        type: Boolean,
        required: true
    },
    aberto: {
        type: Boolean,
        required: true
    },
    aguardando: {
        type: Boolean,
        required: true
    },
    next: {
        type: String,
        required: true
    },
    tentativas: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('WL', WLSchema);