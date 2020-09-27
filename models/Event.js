const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    caption: { type: String, required: true },
    description: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    players: [{
        user: [{ type: Types.ObjectId, ref: 'User' }]
    }],
    organistaors: { type: Types.ObjectId, ref: 'User' },
    orgTeam: { type: Types.ObjectId, ref: 'Team' },
    rules: { type: String },
    additionalInfo: { type: String },
});

module.exports = model('Event', schema);