const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CombatlSchema = new Schema({
    pergunta: {
        type: String,
        required: true
    },
    alt1: {
        type: String,
        required: true
    },
    alt2: {
        type: String,
        required: true
    },
    alt3: {
        type: String,
        required: true
    },
    correta: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('COMBATL', CombatlSchema);