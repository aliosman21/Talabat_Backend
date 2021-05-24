const validators = require("../../GlobalFunction/Validators/Validators");

module.exports = registerInfoValidator = (registerInformation) => {
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

   return return_value.error;
};
