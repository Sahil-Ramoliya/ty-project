var express = require('express');
var router = express.Router();
const uploadStorage = require('../Middleware/uploadStorage');
var productModel = require('../model/productSchema');
const cloudinary = require('cloudinary').v2;

router.get('/', (req, res) => {
    res.send("Admin...")
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

router.get('/getallproduct', async (req, res) => {
    let id = req.params.id;
    var findData = await productModel.find(id);
    res.send(findData)
})

router.get('/getsingleproduct/:id', async (req, res) => {
    var id = req.params.id
    var findOne = await productModel.findOne({ "_id": id })
    if (findOne != null) {
        res.send(findOne)
    } else {
        res.send("Data Not Found")
    }
})

router.post('/updateproduct/:id', async (req, res) => {
    var user_id = req.params.id;
    await productModel.findByIdAndUpdate(user_id,{title : "This is Demo"})
    res.json({
        "ID": user_id
    })
})

router.delete('/delete/:id', async (req, res) => {
    var id = req.params.id;
    var checkDelete = await productModel.findByIdAndDelete({ "_id": id });
    console.log(checkDelete);
    if (checkDelete != null) {
        res.send("deleted")
    }
})
module.exports = router;