const countries_list = require("../../../../assets/countries.json");

/**
 * @param  {} registerInformation
 */
const registerInfoValidator = (registerInformation) => {
   const return_value = { error: "" };
   validateName(registerInformation.name) ? true : (return_value.error += "Name not validated \n");
   validateEmail(registerInformation.email)
      ? true
      : (return_value.error += "email not validated \n");
   validatePassword(registerInformation.password)
      ? true
      : (return_value.error += "password not validated \n");
   validateGender(registerInformation.gender)
      ? true
      : (return_value.error += "gender not validated \n");
   validateCountry(registerInformation.country)
      ? true
      : (return_value.error += "country not validated \n");
   validateMobile(registerInformation.mobile)
      ? true
      : (return_value.error += "mobile not validated \n");
   validateDateOfBirth(registerInformation.date_of_birth)
      ? true
      : (return_value.error += "date of birth not validated \n");

   return return_value.error;
};

/**
 * @param  {} name_to_validate
 */
const validateName = (name_to_validate) => {
   return /^[a-zA-Z ]*$/.test(name_to_validate) ? true : false;
};

/**
 * @param  {} email_to_validate
 */
const validateEmail = (email_to_validate) => {
   return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email_to_validate
   )
      ? true
      : false;
};

/**
 * @param  {} password_to_validate
 */
const validatePassword = (password_to_validate) => {
   return password_to_validate.length > 5 ? true : false;
};

/**
 * @param  {} gender_to_validate
 */
const validateGender = (gender_to_validate) => {
   return (gender_to_validate == "Male") | (gender_to_validate == "Female") ? true : false;
};

/**
 * @param  {} country_to_validate
 */
const validateCountry = (country_to_validate) => {
   return countries_list.some((object) => object.name === country_to_validate);
};
/**
 * @param  {} mobile_to_validate
 */

const validateMobile = (mobile_to_validate) => {
   return /^(\+\d{1,2})?\d{10}$/.test(mobile_to_validate) ? true : false;
};

/**
 * @param  {} date_of_birth_to_validate
 */
const validateDateOfBirth = (date_of_birth_to_validate) => {
   return /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/.test(
      date_of_birth_to_validate
   )
      ? true
      : false;
};

module.exports = registerInfoValidator;
