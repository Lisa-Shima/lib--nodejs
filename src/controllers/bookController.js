const AppDataSource = require('../config/data-source')

const BOOK_REPO = AppDataSource.getRepository('Book')

async function getAllBooks(req, res, next){
    try{
        const books = await BOOK_REPO.find()
        res.status(200).json(books)
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    getAllBooks
}