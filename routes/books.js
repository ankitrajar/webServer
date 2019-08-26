const log_startup = require('debug')('LOG:STARTUP::');
const log_info = require('debug')('LOG:INFO::');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/booksdB',{useNewUrlParser: true, useFindAndModify: false})
        .then(() => log_startup('Connection to MongoDb Successfull!'))
        .catch(err => log_startup('Connection failed! Error: ',err));

//Creating mongoose schema
const booksSchema = new mongoose.Schema({
    name: String,
    author: String,
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

//Model the schema
const Book = mongoose.model('Book', booksSchema);

//Creating books in database
async function createBooks(req,res){
    const book = new Book({
    name: req.body.name,
    author: req.body.author,
    isPublished: req.body.isPublishedVal,
    price: req.body.price
});
const result = await book.save();
log_info(result);
res.send(result);
}

//Getting books from database
async function getBooks(req,res){
    const book = await Book
    .find({isPublished: req.body.isPublishedVal})
    .sort('-price')
    .select('name author price');
    log_info(book);
    res.send(book);
}

//Updating books from database
async function updateBooks(req,res){
    const book = await Book.findById({_id: req.params.id});
    if(!book) return res.status(404).send('Book not found!');;

    book.name = req.body.name;
    book.author = req.body.author;
    book.isPublished = req.body.isPublishedVal;
    book.price = req.body.price;

    const result = await book.save();
    log_info(result);
    res.send(result);
}

async function getBookById(req,res){
    const book = await Book.findById({_id: req.params.id});
    if(!book) return res.status(404).send('Book not found!');
    log_info(book);
    res.send(book);
}

//Deleting books from database
async function deleteBooks(req,res){
    const result = await Book.deleteOne({_id: req.params.id});
    log_info(result);
    res.send(result);
}

router.get('/', (req,res) => {
    getBooks(req,res);
});

router.get('/:id', (req,res) => {
    getBookById(req,res);    
});

//POST Method : Create
router.post('/', (req,res) => {
    const { error } = validateBooks(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Create Books in Database
    createBooks(req,res);
});

//PUT Method : Update
router.put('/:id', (req,res) => {
    const { error } = validateBooks(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Update
    updateBooks(req,res);
});

//DELETE Method : Delete
router.delete('/:id', (req,res) => {
    const { error } = validateBooks(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    deleteBooks(req,res);
});

function validateBooks(book) {
    const schema = {
        name: Joi.string().required(), 
        author: Joi.string().required(),
        isPublished: Joi.boolean().required(),
        price: Joi.number().required()
    };
    return Joi.validate(book,schema);
}

module.exports= router;