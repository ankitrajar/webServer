const express = require('express');
const router = express.Router();

//GET Method : READ
router.get('/', (req,res) => {
    res.render('index',{title:"Express App", message: "Hello"});
});

module.exports= router;
