const express = require('express');
const router = express.Router();

//GET Method : READ
router.get('/', (req,res) => {
    res.send('You are in Root!');
});

module.exports= router;
