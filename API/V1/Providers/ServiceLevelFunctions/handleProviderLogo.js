const Base = require("../../../../images/imagePath");
var ReadableData = require("stream").Readable;
var fs = require("fs");

module.exports.saveLogo = (logo, name) => {
  let trimmedName = name.replace(/\s+/g, "");
  let splited = logo.split(",")[0];
  let extention = splited.substring(
    splited.indexOf("/") + 1,
    splited.indexOf(";")
  );
  const logoName = `${Date.now()}_${trimmedName}_provider.${extention}`;
  const imageBufferData = Buffer.from(logo.split(",")[1], "base64");
  var streamObj = new ReadableData();
  streamObj.push(imageBufferData);
  streamObj.push(null);
  streamObj.pipe(
    fs.createWriteStream(`${Base.providersImagesPath}/providers/${logoName}`)
  );
  return `/providers/images/${logoName}`;
};

module.exports.saveItemLogo = (logo, name) => {
  let trimmedName = name.replace(/\s+/g, "");
  let splited = logo.split(",")[0];
  let extention = splited.substring(
    splited.indexOf("/") + 1,
    splited.indexOf(";")
  );
  const logoName = `${Date.now()}_${trimmedName}_item.${extention}`;
  const imageBufferData = Buffer.from(logo.split(",")[1], "base64");
  var streamObj = new ReadableData();
  streamObj.push(imageBufferData);
  streamObj.push(null);
  streamObj.pipe(
    fs.createWriteStream(`${Base.providersImagesPath}/items/${logoName}`)
  );
  return `/items/images/${logoName}`;
};
