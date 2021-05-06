import Joi from "joi";


const ClienteValidation = Joi.object({
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
    enderecos: Joi.array().items(Joi.object({
        endereco: Joi.string().max(255).required(),
        numero: Joi.number().required(),
        complemento: Joi.string().max(255).allow(""),
        bairro: Joi.string().max(50).required(),
        cidade: Joi.string().max(50).required(),
        estado: Joi.string().max(50).required(),
        cep: Joi.string().length(8).required()
            .regex(/^[0-9]+$/)
    }))
})

const CNPJValidation = Joi.object({
    cnpj: Joi.string().length(14)
        .regex(/^[0-9]+$/)
        .required()
})

const ClienteInfoValidation = Joi.object({
    "razao-social": Joi.string().max(255)
        .required(),
    contato: Joi.string()
        .required()
        .max(255),
    telefone: Joi.string().max(20)
        .required()
        .regex(/^[0-9]{1,20}$/)
})

const ClienteEnderecoValidation = CNPJValidation.keys({
    enderecos: Joi.array().items(Joi.object({
        endereco: Joi.string().max(255).required(),
        numero: Joi.number().required(),
        complemento: Joi.string().max(255).allow(""),
        bairro: Joi.string().max(50).required(),
        cidade: Joi.string().max(50).required(),
        estado: Joi.string().max(50).required(),
        cep: Joi.string().length(8).required()
            .regex(/^[0-9]+$/)
    }))
})

const EnderecoValidation = Joi.object({
    id: Joi.number().required(),
    endereco: Joi.string().max(255).required(),
    numero: Joi.number().required(),
    complemento: Joi.string().max(255).allow(""),
    bairro: Joi.string().max(50).required(),
    cidade: Joi.string().max(50).required(),
    estado: Joi.string().max(50).required(),
    cep: Joi.string().length(8).required()
        .regex(/^[0-9]+$/)
})

const ClienteCnpjInfoValidation = ClienteInfoValidation.keys({
    cnpj: Joi.string().length(14)
        .regex(/^[0-9]+$/)
        .required()
})

const NumberValidation = Joi.string().regex(/^[0-9]+$/).required()

export { CNPJValidation,
    ClienteValidation,
    ClienteCnpjInfoValidation,
    ClienteEnderecoValidation,
    NumberValidation,
    EnderecoValidation }
