const validators = require("../../GlobalFunction/Validators/Validators");

/**
 * @param  {} registerInformation
 */
const registerInfoValidator = (registerInformation) => {
   const return_value = { error: "" };
   validators.validateName(registerInformation.name)
      ? true
      : (return_value.error += "Name not validated \n");
   validators.validateEmail(registerInformation.email)
      ? true
      : (return_value.error += "email not validated \n");
   validators.validatePassword(registerInformation.password)
      ? true
      : (return_value.error += "password not validated \n");
   validators.validateGender(registerInformation.gender)
      ? true
      : (return_value.error += "gender not validated \n");
   validators.validateCountry(registerInformation.country)
      ? true
      : (return_value.error += "country not validated \n");
   validators.validateMobile(registerInformation.mobile)
      ? true
      : (return_value.error += "mobile not validated \n");
   validators.validateDateOfBirth(registerInformation.date_of_birth)
      ? true
      : (return_value.error += "date of birth not validated \n");

   return return_value.error;
};

module.exports = registerInfoValidator;
