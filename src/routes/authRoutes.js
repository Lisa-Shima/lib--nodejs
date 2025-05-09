const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { register, login, getMe } = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const validate = require('../middleware/validationMiddleware')

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().isLength({ min: 6}).withMessage('Password must be atleast 6 characters')
], validate, register)
router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], validate, login)
router.get('/me', authMiddleware, getMe)

module.exports = router