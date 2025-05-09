const { validationResult } = require('express-validator')

/**
 * After running validation chains, call this to check for errors.
 * If any exist, responds with 400 and { errors: [...] }.
 */
function validate(req, res, next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }
}

module.exports = validate