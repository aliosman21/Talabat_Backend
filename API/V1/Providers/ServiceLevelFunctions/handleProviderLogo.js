const Base = require("../../../../assets/Config");
var ReadableData = require("stream").Readable;
var fs = require("fs");

module.exports.saveLogo = (logo, name) => {
  let splited = logo.split(",")[0];
  let extention = splited.substring(
    splited.indexOf("/") + 1,
    splited.indexOf(";")
  );
  const imageBufferData = Buffer.from(logo.split(",")[1], "base64");
  var streamObj = new ReadableData();
  streamObj.push(imageBufferData);
  streamObj.push(null);
  streamObj.pipe(
    fs.createWriteStream(
      `${
        Base.assetsPath
      }/uploads/provider_logo/${Date.now()}_${name}_provider.${extention}`
    )
  );
  return `${
    Base.assetsPath
  }/uploads/provider_logo/${Date.now()}_${name}_provider.${extention}`;
};
