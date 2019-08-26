const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bookie',{useNewUrlParser: true, useFindAndModify: false});

//Creating mongoose schema
const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean,
    price: Number
});

//Model the schema
const Book = mongoose.model('Book', bookSchema);

//Creating books in database
async function createBooks(){

    const book = new Book({
    name: 'Book-2',
    author: 'Ankit Raj',
    isPublished: true,
    price: 10,
    tags: ['novice','basic']
});

const result = await book.save();
console.log(result);
}
//Reading books from database
async function getBooks(){
    const book = await Book
    .find({isPublished: true , author: /.*ankit.*/i})
    .sort('-price')
    .select('name author price');
    console.log(book);
}
//Updating books in database
async function updateBooks(id){
    const book = await Book.findById(id);
    if(!book) return;

     book.name = 'Book-3'
     book.author = 'N Singh'

     const result = await book.save();
     console.log(result);
}

//Deleting books from database
async function deleteBooks(id){
    const result = await Book.deleteOne({_id: id});
    console.log(result);
}

async function run(){
    return await getBooks();
}

//run();
//updateBooks('5d638b0c4ddb0f754f8d20cf');
//deleteBooks('5d638b0c4ddb0f754f8d20cf');
run();