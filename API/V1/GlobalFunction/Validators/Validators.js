const countries_list = require("../../../../assets/countries.json");
const states = require("../../../../assets/Config");
/**
 * @param  {} name_to_validate
 */
module.exports.validateName = (name_to_validate) => {
  return /^[a-zA-Z ]*$/.test(name_to_validate) && name_to_validate.length > 4
    ? true
    : false;
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
  return (gender_to_validate == "Male") | (gender_to_validate == "Female")
    ? true
    : false;
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
  return /^(\+\d{1,4})\d{10,12}$/.test(mobile_to_validate) ? true : false;
};

/**
 * @param  {} date_of_birth_to_validate
 */
module.exports.validateDateOfBirth = (date_of_birth_to_validate) => {
  return /^((19|20)\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|1\d|2\d|3[01])$/.test(
    date_of_birth_to_validate
  ) && date_of_birth_to_validate < "2005-01-01"
    ? true
    : false;
};
/**
 * @param  {} coord_to_validate
 */
module.exports.validateCoordinates = (coord_to_validate) => {
  return isFinite(coord_to_validate) && Math.abs(coord_to_validate) <= 90
    ? true
    : false;
};
/**
 * @param  {} provider_type_to_validate
 */
module.exports.validateProvider = (provider_type_to_validate) => {
  return states.Types.includes(provider_type_to_validate) ? true : false;
};
/**
 * @param  {} time_to_validate
 */
module.exports.validateTime = (time_to_validate) => {
  return /^(2[0-3]|[0-1]?[\d]):[0-5][\d]:[0-5][\d]$/.test(time_to_validate)
    ? true
    : false;
};
/**
 * @param  {} delivery_fee_to_validate
 */
module.exports.validateDeliveryFee = (delivery_fee_to_validate) => {
  return delivery_fee_to_validate >= 0 ? true : false;
};

module.exports.validateJobTitle = (job_title_validate) => {
  return job_title_validate.length > 6 ? true : false;
};
/**
 * @param  {} minimum_order_to_validate
 */
module.exports.validateMinimumOrder = (minimum_order_to_validate) => {
  return minimum_order_to_validate > 0 ? true : false;
};
/**
 * @param  {} openingTime
 * @param  {} ClosingTime
 */
module.exports.validateOpeningClosingTime = (openingTime, ClosingTime) => {
  return openingTime.slice(0, 2) < ClosingTime.slice(0, 2) ? true : false;
};

module.exports.validateWorkState = (work_state) => {
  const stats = ["OnCall", "Break", "GoingToOrder", "Delivering", "OffCall"];
  return stats.indexOf(work_state) > 0 ? true : false;
};
