const Joi = require('joi');

const validateMiddleware = (schema) => {
    return (req, res, next) => {
        console.log('Hello', req.body);
        const { error } = schema.validate(req.body);
        if (error == null) {
            next();
        } else {
            const {details} = error;
            const  message = details.map( det => det.message).join(';');
            console.log('Error',message);
            res.status(400).send(message);
        }
    }
}

module.exports = validateMiddleware;