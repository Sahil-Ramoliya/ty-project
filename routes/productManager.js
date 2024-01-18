var express = require('express');
var router = express.Router();
const uploadStorage = require('../Middleware/uploadStorage');
var productModel = require('../model/productSchema');
const cloudinary = require('cloudinary').v2;

router.get('/', (req, res) => {
    res.send("Product Manager...")
})

router.post('/addproduct', uploadStorage.array("image", 10), async (req, res) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };
    var arrOfSecureUrl = [];
    for (let i = 0; i < req.files.length; i++) {
        try {
            const result = await cloudinary.uploader.upload(req.files[i].path, options);
            arrOfSecureUrl.push(result.secure_url);
        } catch (error) {
            console.error(error);
        }
    }
    var data = productModel.create({
        images: arrOfSecureUrl,
        title: req.body.title,
        price: req.body.price,
        discount: req.body.discount,
        discription: req.body.description,
        review: req.body.review,
        isFeatured: req.body.isFeatured
    })
    res.send("Data Send SucessFully !!!")
})




module.exports = router;