import validate from 'validate.js';

const ZIP_CODE_LENGTH = 8;
const NUMBER_OF_ZIPCODE_SEPARATORS = 1;

validate.validators.zipCode = (value, options, key) => {
  const maxValueLength = ZIP_CODE_LENGTH + NUMBER_OF_ZIPCODE_SEPARATORS;
  const errorMessage = (options && options.message) || `${key} is invalid`;

  if (!value) return errorMessage;

  value = value.toString();

  if (value.length > maxValueLength) return errorMessage;

  if (value.replace(/\D*/g, '').length !== ZIP_CODE_LENGTH) return errorMessage;

  return null;
};

export default (object, constraints) => {
  return validate(object, constraints, { fullMessages: false }) || null;
};
