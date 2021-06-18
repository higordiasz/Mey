const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    mod: {
        type: String,
        required: true
    },
    motivo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Adv', AdvSchema);