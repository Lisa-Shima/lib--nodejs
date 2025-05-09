const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')

const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController')
const validate = require('../middleware/validationMiddleware')

router.get('/', getAllBooks)
router.post('/', [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
], validate, createBook)
router.put('/:id', [
    param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
], validate, updateBook)
router.delete('/:id', [ 
    param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer')
], validate, deleteBook)

module.exports = router