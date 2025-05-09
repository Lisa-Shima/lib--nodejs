const { validationResult } = require('express-validator')
const ApiError = require('../errors/ApiError')

/**
 * After running validation chains, call this to check for errors.
 * If any exist, responds with 400 and { errors: [...] }.
 */
function validate(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(ApiError.BadRequest('Validation failed,', errors.array()))
    }
    next()
}

module.exports = validate