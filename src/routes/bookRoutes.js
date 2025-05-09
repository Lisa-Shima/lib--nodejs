const express = require('express')
const router = express.Router()
const { body, param } = require('express-validator')

const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController')
const validate = require('../middleware/validationMiddleware')

// swagger comments
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   - name: Books
 *     description: CRUD operations on books
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: List all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', getAllBooks)

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Creating a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post('/', [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
], validate, createBook)

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.put('/:id', [
    param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required')
], validate, updateBook)

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/:id', [ 
    param('id').isInt({ gt: 0 }).withMessage('ID must be a positive integer')
], validate, deleteBook)

module.exports = router