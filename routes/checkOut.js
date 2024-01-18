var express = require('express');
var router = express.Router();
var checkOutModel = require('../model/checkOutSchema');

router.get('/',(req,es)=>{
    res.send("Check Out Page...")
})

router.post("/addcheckoutdata",(req,res)=>{
    if(req.body!=""){
        checkOutModel.create({
            name:req.body.name,
            address:req.body.addresss,
            city:req.body.city,
            state:req.body.state,
            pinCode:req.body.pinCode,
            phone:req.body.phone,
            email:req.body.email,
            orderNote:req.body.orderNote
        })
        res.send("Data Add SuccessFully !!!!")
    }else{
        res.send("Please Enter Data !!!")
    }
})

module.exports = router