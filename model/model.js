const mongoose = require('mongoose');

const DATA_SCHEMA = new mongoose.Schema({
    index: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Data', DATA_SCHEMA);