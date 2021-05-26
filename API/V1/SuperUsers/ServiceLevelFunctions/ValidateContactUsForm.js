const validators = require("../../GlobalFunction/Validators/Validators");

module.exports = contact_us_validator = (contact_us_info) => {
   const return_value = { error: "" };
   validators.validateName(contact_us_info.name)
      ? true
      : (return_value.error += "Name not validated \n");
   validators.validateEmail(contact_us_info.email)
      ? true
      : (return_value.error += "email not validated \n");
   validators.validateMobile(contact_us_info.mobile)
      ? true
      : (return_value.error += "mobile not validated \n");

   return return_value.error;
};
