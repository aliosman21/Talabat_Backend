var fs = require("fs");
var ReadableData = require("stream").Readable;

module.exports.saveCV = (cv, name) => {
  let trimmedName = name.replace(/\s+/g, "");
  const BufferData = Buffer.from(cv.split(",")[1], "base64");
  fs.writeFile(
    `${__dirname}/CVs/${Date.now()}_${trimmedName}.pdf`,
    BufferData,
    (error) => {
      if (error) {
        throw error;
      } else {
        console.log("buffer saved!");
        return `${__dirname}/CVs/${Date.now()}_${trimmedName}.pdf`;
      }
    }
  );

  // var streamObj = new ReadableData();
  // streamObj.push(imageBufferData);
  // streamObj.push(null);
  // streamObj.pipe(fs.createWriteStream(`${__dirname}/CVs/${logoName}`));
};
