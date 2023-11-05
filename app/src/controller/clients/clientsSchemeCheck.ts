const Joi = require('joi');

export const clientInfoSchemEOfValidation = Joi.object({
    name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]$/)
    .min(6)
    .max(12)
    .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
})