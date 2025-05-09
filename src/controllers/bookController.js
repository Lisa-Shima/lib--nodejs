const AppDataSource = require('../config/data-source')
const ApiError = require('../errors/ApiError')
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
        if(!title || !author) throw ApiError.BadRequest('Both title and author are required')
            const book = BOOK_REPO.create({title, author})
        const result = await BOOK_REPO.save(book)
        res.status(201).json(result)
    }
    catch(e){
        next(e)
    }
}

// updating a book
async function updateBook(req, res, next){
    try{
        const bookId = parseInt(req.params.id)
        const { author, title } = req.body
        if(!author || !title) throw ApiError.BadRequest('Both title and author are required')
            const book = await BOOK_REPO.findOneBy({id: bookId})
        if(!book) return res.status(404).json({message: 'Book not found'})
            book.author = author
            book.title = title
        const updated = await BOOK_REPO.save(book)
        res.status(200).json(updated)
    }
    catch(e){
        next(e)
    }
}

// deleting a book
async function deleteBook(req, res, next){
    try{
        const bookId = parseInt(req.params.id)
        const result = await BOOK_REPO.delete({id: bookId})

        if(result.affected === 0) throw ApiError.NotFound('Book not found')
            res.status(200).json({message: 'Book deleted successfully'})
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}