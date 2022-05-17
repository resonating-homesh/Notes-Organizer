const express = require('express');
const router = express.Router();
const User = require('../models/User');

//create a user using: post "/api/auth". Doesnt require auth

router.post('/', (req, res)=>{
console.log(req.body);
const user = User(req.body);
user.save();
res.send("helllo");
})

module.exports = router