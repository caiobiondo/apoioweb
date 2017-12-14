import validate from 'validate.js';

export default (object, constraints) => {
  return validate(object, constraints, { fullMessages: false }) || null;
};
