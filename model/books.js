const mongoose = require('mongoose');
const Joi = require('joi');

//Model the schema
const Book = mongoose.model('Book', new mongoose.Schema({
    name: String,
    author: String,
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
}));

function validateBooks(book) {
    const schema = {
        name: Joi.string().required(), 
        author: Joi.string().required(),
        isPublished: Joi.boolean().required(),
        price: Joi.number().required()
    };
    return Joi.validate(book,schema);
}

exports.Book = Book;
exports.validate = validateBooks;