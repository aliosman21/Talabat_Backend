const countries_list = require("../../../../assets/countries.json");

/**
 * @param  {} name_to_validate
 */
module.exports.validateName = (name_to_validate) => {
   return /^[a-zA-Z ]*$/.test(name_to_validate) ? true : false;
};

/**
 * @param  {} email_to_validate
 */
module.exports.validateEmail = (email_to_validate) => {
   return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email_to_validate
   )
      ? true
      : false;
};

/**
 * @param  {} password_to_validate
 */
module.exports.validatePassword = (password_to_validate) => {
   return password_to_validate.length > 5 ? true : false;
};

/**
 * @param  {} gender_to_validate
 */
module.exports.validateGender = (gender_to_validate) => {
   return (gender_to_validate == "Male") | (gender_to_validate == "Female") ? true : false;
};

/**
 * @param  {} country_to_validate
 */
module.exports.validateCountry = (country_to_validate) => {
   return countries_list.some((object) => object.name === country_to_validate);
};
/**
 * @param  {} mobile_to_validate
 */

module.exports.validateMobile = (mobile_to_validate) => {
   return /^(\+\d{1,2})?\d{10}$/.test(mobile_to_validate) ? true : false;
};

/**
 * @param  {} date_of_birth_to_validate
 */
module.exports.validateDateOfBirth = (date_of_birth_to_validate) => {
   return /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/.test(
      date_of_birth_to_validate
   )
      ? true
      : false;
};
