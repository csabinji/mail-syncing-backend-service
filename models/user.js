const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
        },
        nickname: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
          },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        underscore: true,
    }
);

module.exports = mongoose.model('User', userSchema);