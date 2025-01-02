const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    issuedDate: { type: Date, default: Date.now },
    returnDate: Date,
    user: {
        name: String,
        email: String,
        phone: String,
    },
    finePerDay: { type: Number, default: 10 },
    isReturned: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookSchema);
