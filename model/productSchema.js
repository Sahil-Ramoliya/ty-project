var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    images: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
    },
    discription: {
        type: String,
        required: true
    },
    review:{
        type:String,
        required:true
    },
    isFeatured:{
        type:Boolean,
        required:true
    }
})

var productModel = mongoose.model("Product",productSchema);

module.exports = productModel;