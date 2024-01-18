var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    product: {
        type: Array
    }
})

var cartModel = mongoose.model("addToCard", cartSchema);

module.exports = cartModel;