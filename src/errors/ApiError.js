// src/errors/ApiError.js
class ApiError extends Error{
    constructor(status, message, details = null){
        super(message)
        this.status = status
        this.details = details

        // Maintains proper error stack
        if(Error.captureStackTrace){
            Error.captureStackTrace(this, this.constructor)
        }
    }

    static BadRequest(message, details){
        return new ApiError(400, message, details)
    }

    static UnAuthorized(message = 'Unauthorized'){
        return new ApiError(401, message)
    }

    static NotFound(message = 'Not Found'){
        return new ApiError(404, message)
    }

    static Internal(message = 'Internal Server Error'){
        return new ApiError(500, message)
    }
}

module.exports = ApiError