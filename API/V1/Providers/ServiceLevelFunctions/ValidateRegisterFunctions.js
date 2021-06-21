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
  validators.validateCountry(registerInformation.country)
    ? true
    : (return_value.error += "country not validated \n");
  validators.validateCoordinates(registerInformation.latitude)
    ? true
    : (return_value.error += "latitude not validated \n");
  validators.validateCoordinates(registerInformation.longitude)
    ? true
    : (return_value.error += "longitude not validated \n");
  validators.validateProvider(registerInformation.provider_type)
    ? true
    : (return_value.error += "Location not validated \n");
  validators.validateTime(registerInformation.opening_hour)
    ? true
    : (return_value.error += "Opening Time not validated \n");
  validators.validateTime(registerInformation.closing_hour)
    ? true
    : (return_value.error += "Closing Time not validated \n");
  validators.validateTime(registerInformation.delivery_time)
    ? true
    : (return_value.error += "Deliver Time not validated \n");
  validators.validateDeliveryFee(registerInformation.delivery_fee)
    ? true
    : (return_value.error += "Deliver Fee not validated \n");
  validators.validateMinimumOrder(registerInformation.minimum_order)
    ? true
    : (return_value.error += "Minimum Order not validated \n");
  validators.validateOpeningClosingTime(
    registerInformation.opening_hour,
    registerInformation.closing_hour
  )
    ? true
    : (return_value.error += "Negative Opening Time not validated \n");
  return return_value.error;
};

module.exports = registerInfoValidator;
