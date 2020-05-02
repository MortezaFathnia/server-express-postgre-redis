const { validationResult } = require('express-validator');
const rules = require('./rules');

const validate = (request, response, next) => {
  const errors = validationResult(request);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return response.status(422).json({
    errors: extractedErrors,
  });
}

module.exports = {
  validate: validate,
  Rule: rules
};
