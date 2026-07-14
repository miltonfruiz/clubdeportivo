const { body, validationResult } = require('express-validator');

const validateRules = [
  body('username').trim().not().isEmpty().withMessage('Username is required'),
  body('email').trim().isEmail().withMessage('Invalid email'),
  body('password').trim().isLength({ min: 8, max: 20 }).withMessage('Password must be between 8 and 20 characters'),
];

const validate = (req, res, next) => {
  validateRules.map(rule => rule.run(req));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;