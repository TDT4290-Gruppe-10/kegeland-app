export const PASSWORD_MIN_LENGTH = 6;

export const REGEX = {
  personalName: /^[a-z æøå,.'-]+$/i,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
};

export const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  NAME_INVALID: 'Not a Valid Name',
  TERMS: 'Terms Must Be Accepted To Continue',
  EMAIL_INVALID: 'Not a Valid Email',
};
