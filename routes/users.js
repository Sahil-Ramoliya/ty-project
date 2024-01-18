var express = require('express');
var router = express.Router();
var userModel = require('../model/userSchema');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async (req, res) => {
  var data = await userModel.find({ "email": req.body.email });
  bcrypt.compare(req.body.password, data[0].password).then(function (result) {
    if (data != "")
      if (data[0].email == req.body.email && result == true) {
        res.send("Login !!!");
        console.log("Login");
      } else {
        res.send("Invelid User Name or Password")
      }
  });
})

router.post('/signup', async (req, res) => {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    userModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      mobile: req.body.mobile,
      role: ["User", "Admin", "Product Manager"]
    })
  });
  res.send("Data Add SucessFully !!!")
})

router.get('/alluser', async (req, res) => {
  let data = await userModel.find();
  res.send(data);
})

router.get('/singleuser/:id', async (req, res) => {
  let id = req.params.id;
  let data = await userModel.findById(id);
  if (data == "") {
    res.send("Data Does Not Found");
  } else {
    res.send(data);
  }
})

router.post('/update-user/:id', async (req, res) => {
  let id = req.params.id
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    userModel.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      mobile: req.body.mobile,
      role: req.body.role
    })
  });
  res.send("Data Add SucessFully !!!")
})

router.delete('/delete/:id', async (req, res) => {
  let id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.send("data Delete SuccessFully !!!!")
})
module.exports = router;
