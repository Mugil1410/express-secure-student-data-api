const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: true,
    },
    cardHolder: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: String,
        required: true,
    },
    cvv: {
        type: String,
        required: true,
    },
});

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = CreditCard;