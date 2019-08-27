const log_startup = require('debug')('LOG:STARTUP::');
const log_info = require('debug')('LOG:INFO::');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Book,validate } = require('../model/books');

router.get('/', async (req,res) => {
    const book = await Book
    .find({isPublished: req.body.isPublishedVal})
    .sort('-price')
    .select('name author price');
    log_info(book);
    res.send(book);
});

router.get('/:id', async (req,res) => {
    const book = await Book.findById({_id: req.params.id});
    if(!book) return res.status(404).send('Book not found!');
    log_info(book);
    res.send(book);
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Create Books in Database
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        isPublished: req.body.isPublishedVal,
        price: req.body.price
    });
    try {
        const result = await book.save();
        log_info(result);
        res.send(result);
    }
    catch(ex){
        log_info('Error: ', errors.message);
    }

});

router.put('/:id', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const book = await Book.findById({_id: req.params.id});
    if(!book) return res.status(404).send('Book not found!');;

    book.name = req.body.name;
    book.author = req.body.author;
    book.isPublished = req.body.isPublishedVal;
    book.price = req.body.price;

    try {
        const result = await book.save();
        log_info(result);
        res.send(result);
    }
    catch(ex){
        log_info('Error: ', errors.message);
    }

});

router.delete('/:id', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const result = await Book.deleteOne({_id: req.params.id});
    log_info(result);
    res.send(result);
});

module.exports= router;