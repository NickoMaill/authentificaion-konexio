const Joi = require("joi");

const user = Joi.object({
  email: Joi.string()
    .max(100)
    .required(),
  password: Joi.string()
    .min(8)
    .required()
});

function validUser(req, res, next) {
  const validation = user.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      message: "Error 400",
      description: validation.error.details[0].message,
    });
  }

  next();
}

module.exports = validUser;
