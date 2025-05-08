const AppDataSource = require('../config/data-source')

const BOOK_REPO = AppDataSource.getRepository('Book')

// fetching all books
async function getAllBooks(req, res, next){
    try{
        const books = await BOOK_REPO.find()
        res.status(200).json(books)
    }
    catch(e){
        next(e)
    }
}

// creating a new book
async function createBook(req, res, next){
    try{
        // const book = await BOOK_REPO.create(req.body)
        const { title, author } = req.body
        if(!title || !author) return res.status(404).json({message: 'Both title and author are required'})
            const book = BOOK_REPO.create({title, author})
        const result = await BOOK_REPO.save(book)
        res.status(201).json(result)
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    getAllBooks,
    createBook
}