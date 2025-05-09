const ApiError = require('../errors/ApiError')

function errorMiddleware(err, req, res, next){
    if(err instanceof ApiError){
        const payload = { status: 'error', message: err.message}
        // If there are details add them to payload
        if(err.details) payload.details = err.details
        return res.status(err.status).json(payload)
    }

    console.error('Unexpected error, ', err)
    return res.status(500).json({ status: 'error', message: 'Something went worong on our end'})
}

module.exports = errorMiddleware