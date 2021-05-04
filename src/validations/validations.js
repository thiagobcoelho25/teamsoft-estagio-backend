const Joi = require('joi');


module.exports = {
    ClienteValidation: Joi.object({
        cnpj: Joi.string().length(14)
        .regex(/^[0-9]+$/)
        .required(), 
        "razao-social": Joi.string().max(255)
        .required(),
        contato: Joi.string()
        .required()
        .max(255),
        telefone: Joi.string().max(20)
        .required()
        .regex(/^[0-9]{1,20}$/),
        enderecos: Joi.object({
            endereco: Joi.string().max(255)
            .required(),
            numero: Joi.number().required(),
            complemento: Joi.string().max(255).allow(""),
            bairro: Joi.string().max(50).required(),
            cidade: Joi.string().max(50).required(),
            estado: Joi.string().max(50).required(),
            cep: Joi.string().length(8).required()
            .regex(/^[0-9]+$/)
        })
    }),

    CNPJValidation: Joi.object({
        cnpj: Joi.string().length(14)
        .regex(/^[0-9]+$/)
        .required()
    })

}
