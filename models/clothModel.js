const mongoose = require('mongoose');
const clothSchema = mongoose.Schema(
    {
        title: { type: String },
        price: { type: Number },
        description: { type: String },
        photoUrl: { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('clothes', clothSchema);