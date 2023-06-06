const { Joi, celebrate } = require("celebrate");

const validatePhone = (value, helpers) => {
  const regex = /^[0-9]{10,11}$/;

  if (regex.test(value)) {
    return value;
  }
  return helpers.error("string.phone");
};

const validateHexadecimal = (value, helpers) => {
  const regex = /^[0-9a-fA-F]{24}$/;

  if (regex.test(value)) {
    return value;
  }
  return helpers.error("string.hex");
};

module.exports.validateProductBody = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),

      price: Joi.string().required().messages({
        "string.empty": 'The "price" field must be filled in',
      }),
      description: Joi.string().required().messages({
        "string.empty": 'The "description" field must be filled in',
      }),
      category: Joi.string().required().messages({
        "string.empty": 'The "category" field must be filled in',
      }),
    })
    .unknown(true),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      phone: Joi.string().custom(validatePhone).messages({
        "string.empty": 'The "phone" field must be filled in',
        "string.phone": "Not a valid phone number",
      }),
      email: Joi.string()
        .required()
        .email()
        .messages({ "string.email": "Please enter a valid email" }),
      password: Joi.string()
        .required()
        .min(8)
        .messages({ "string.min": "Passowrd must be at least 8 characters." }),
    })
    .unknown(true),
});

module.exports.validateUserLoginInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({ "string.email": "Please enter a valid email" }),
    password: Joi.string()
      .required()
      .min(8)
      .messages({ "string.min": "Passowrd must be at least 8 characters." }),
  }),
});

module.exports.validateProductId = celebrate({
  params: Joi.object().keys({
    ProductId: Joi.string()
      .required()
      .custom(validateHexadecimal)
      .messages({ "string.hex": "Invalid ID" }),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object()
    .keys({
      user: Joi.object().keys({
        _id: Joi.string()
          .required()
          .custom(validateHexadecimal)
          .messages({ "string.hex": "Invalid ID" }),
      }),
    })
    .unknown(true),
});

module.exports.validateUserUpdate = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      phone: Joi.string().custom(validatePhone).messages({
        "string.empty": 'The "phone" field must be filled in',
        "string.phone": "Not a valid phone number",
      }),
    })
    .unknown(true),
});

module.exports.validateCartTotal = celebrate({
  body: Joi.object().keys({
    cartTotal: Joi.string().required().messages({
      "string.empty": 'The "name" field must be filled in',
    }),
  }),
});
