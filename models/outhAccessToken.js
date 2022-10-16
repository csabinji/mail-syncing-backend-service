
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const accessTokenSchema = new mongoose.Schema(
    {
        user_id: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
        expires_at: {
            type: Date,
            required: true,
            expires: 5 * 24 * 60 * 60,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        underscore: true,
    }
);

module.exports = mongoose.model('AccessToken', accessTokenSchema);