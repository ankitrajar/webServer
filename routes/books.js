const express = require('express');
const router = express.Router();

const books = [
    {id: 1, name: 'cadet'},
    {id: 2, name: 'badge'},
    {id: 3, name: 'comic'},
];

router.get('/', (req,res) => {
    res.send(books);
});

router.get('/:id', (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).send('ERROR 404! : Book not found!');
    res.send(book);
});

//POST Method : Create
router.post('/', (req,res) => {
    const { error } = validateBooks(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Create
    const book = {
        id: books.length + 1,
        name: req.body.name
    };
    books.push(book);
    res.send(book);
});

//PUT Method : Update
router.put('/:id', (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).send('ERROR 404! : Book not found!');

    const { error } = validateBooks(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // Update
    book.name = req.body.name;
    res.send(book);
});

//DELETE Method : Delete
router.delete('/:id', (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) return res.status(404).send('ERROR 404! : Book not found!');

    const { error } = validateBooks(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Delete by index
    const index = books.indexOf(book);
    if(req.body.name === book.name){
        books.splice(index,1);
    }
    else{
        return res.status(404).send('ERROR 404! : Book not found!');
    }
    res.send(book);
});

function validateBooks(book) {
    const schema = {
        name: Joi.string().min(4).required()
    };
    return Joi.validate(book,schema);
}

module.exports= router;