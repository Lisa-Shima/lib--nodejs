const jwt = require('jsonwebtoken')
const AppDataSource = require('../config/data-source')

const USER_REPO = AppDataSource.getRepository('User')

async function authMiddleware(req, res, next){
    try{
        const authHeader = req.headers.authorization
        if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({message: 'Missing or invalid authorization header.'})
    
        const token = authHeader.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET)
    
        const user = await USER_REPO.findOneBy({id: payload.id})
        if(!user) return res.status(401).json({message: 'User no longer exists'})
    
        const { password, ...userData} = user
        req.user = userData
    
        next()
    }
    catch(e){
        console.error('Error in auth, ', e)
        return res.status(401).json({message: 'Authentication error'})
    }
}

module.exports = authMiddleware