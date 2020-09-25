const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    caption: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    players: [{
        user: [{ type: Types.ObjectId, ref: 'User' }]
    }],
    organistaors: [{
        user: [{ type: Types.ObjectId, ref: 'User' }]
    }],
    rules: { type: String, required: true },
    additionalInfo: { type: String, required: true },
});

module.exports = model('Event', schema);