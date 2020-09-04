const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true },
    captain: { type: String, required: true },
});

module.exports = model('Team', schema);