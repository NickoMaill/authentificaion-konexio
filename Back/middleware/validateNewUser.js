const Joi = require("joi");

const newUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "fr"] } })
    .max(100)
    .required(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  firstName: Joi.string().max(50).required(),
  surName: Joi.string().max(50).required(),
  birthDate: {
    day: Joi.number().min(1).max(31).required(),
    month: Joi.string().required().max(10),
    year: Joi.number().min(1940).max(2022).required(),
  },
});

function validNewUser(req, res, next) {
  const validation = newUser.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  next();
}

module.exports = validNewUser;
