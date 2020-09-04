const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    firstName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    nickName: { type: String, required: true },
    honestyRate: { type: Number },
    friendlyRate: { type: Number },
    team: [{ type: Types.ObjectId, ref: 'Team' }],
    user: [{ type: Types.ObjectId, ref: 'User' }]
});

module.exports = model('Biography', schema);