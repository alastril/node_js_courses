const express = require('express');
const Joi = require('joi');

const schema = Joi.object().keys({
    id: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().regex(RegExp('^(?=.*\\d)(?=.*[a-zA-Z]).{1,20}$')).required(),
    age: Joi.number().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
})

module.exports = schema;