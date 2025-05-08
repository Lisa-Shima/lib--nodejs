const AppDataSource = require('../config/data-source')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const USER_REPO = AppDataSource.getRepository('User')

// signing a token
const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d'})
}

// registering a user
async function register(req, res, next){
    try{
        const { name, email, password } = req.body
        if(!name || !email || !password) return res.status(400).json({message: 'All fields are required'})
        
        const exists = await USER_REPO.findOneBy({email})
        if(exists) return res.status(400).json({message: 'User already exists'})

        const hashed = await bcrypt.hash(password, 10)
        const user = USER_REPO.create({ name, email, password: hashed})
        const saved = await USER_REPO.save(user)
        res.status(201).json(saved)
    }
    catch(e){
        next(e)
    }
}

// logging in a user
async function login(req, res, next){
    try{
        const { email, password} = req.body
        if(!email || !password) return res.status(400).json({message: 'All fields are required'})

        const exists = await USER_REPO.findOneBy({email})
        if(!exists) return res.status(404).json({message: 'Invalid credentials'})
        
        const match = await bcrypt.compare(password, exists.password)
        if(!match) return res.status(401).json({message: 'Invalid credentials'})

        const token = signToken({id: exists.id, email: exists.email})
        res.status(200).json({token})
    }
    catch(e){
        next(e)
    }
}

async function getMe(req, res, next){
    try{
        res.json({user: req.user})
    }
    catch(e){
        next(e)
    }
}

module.exports = {
    register,
    login,
    getMe
}