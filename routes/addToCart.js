var express = require('express');
var router = express.Router();
var cartModel = require('../model/addToCartSchema');
var productModel = require('../model/productSchema');
var userModel = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send("Add to Cart !!!");
})

router.post('/cart', async (req, res) => {
    if (req.body != "") {
        data = await cartModel.find({ user_id: req.body.user_id })
        if (data.product.product_id != req.body.product.product_id) {
            // console.log(data.length)
            let arrayOfProducts = []
            if (data == "") {
                cartModel.create({
                    user_id: req.body.user_id,
                    product: {
                        product_id: req.body.product.product_id,
                        quantity: req.body.product.quantity
                    }
                })
                res.send("Data Added !!!")
            }
        } else if (data != "") {
            for (let i = 0; i < data.length; i++) {
                arrayOfProducts.push(data[i].product[0]);
            }
            arrayOfProducts.push({
                product_id: req.body.product.product_id,
                quantity: req.body.product.quantity
            })
            await cartModel.findByIdAndUpdate(data[0]._id, { product: arrayOfProducts });
            var checkData = await cartModel.find()
            res.send("Data Added !!!");
        }else{
            res.send("Data Added !!!");
        }
    } else {
        res.send("Please Enter Data !!!");
    }
})

router.get('/cartData/:id', async (req, res) => {
    var id = req.params.id;
    data = await cartModel.find({ "user_id": id });
    var arrayOfProduct = [];
    for (i = 0; i < data.length; i++) {
        productData = await productModel.findById(data[i].product.product_id)
        var dataOfProduct = {
            product_id: data[i].product.product_id,
            image: productData.images[0],
            title: productData.title,
            price: productData.price,
            quantity: data[i].product.quantity
        }
        arrayOfProduct.push(dataOfProduct)
        // console.log(arrayOfProduct);
        // ary = arrayOfProduct;
    }
    res.send(arrayOfProduct)
    // var ary;
    // data.forEach(async (ele) => {
    //     productData = await productModel.findById(ele.product.product_id)
    //     var dataOfProduct = {
    //         product_id:ele.product.product_id,
    //         image:productData.images[0],
    //         title:productData.title,
    //         price:productData.price,
    //         quantity:ele.product.quantity
    //     }
    //     arrayOfProduct.push(dataOfProduct)
    //     // console.log(arrayOfProduct);
    //     ary = arrayOfProduct;
    // })
})

module.exports = router;