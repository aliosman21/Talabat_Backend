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
  validators.validateMobile(registerInformation.mobile)
    ? true
    : (return_value.error += "mobile not validated \n");
  validators.validateWorkState(registerInformation.work_state)
    ? true
    : (return_value.error += "work_state not validated \n");

  return return_value.error;
};

module.exports = registerInfoValidator;
