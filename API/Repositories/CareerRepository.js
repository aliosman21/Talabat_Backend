const db = require("../../db/models/index");
const logger = require("../../Logger");

module.exports.InsertApplicant = async (applicant_info) => {
  try {
    await db.Career.create({
      name: applicant_info.name,
      email: applicant_info.email,
      mobile: applicant_info.mobile,
      gender: applicant_info.gender,
      country: applicant_info.country,
      date_of_birth: applicant_info.date_of_birth,
      cv: applicant_info.cv,
      notes: applicant_info.notes,
      job_title: applicant_info.job_title,
    });
    return true;
  } catch (err) {
    logger.error("Database Insertion failed err: ", err);
    return false;
  }
};
