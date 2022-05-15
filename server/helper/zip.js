const path = require("path");
const AdmZip = require("adm-zip");

const zip = new AdmZip();
const inputPath = path.join(__dirname, "..", "pdfs");
const outputPath = path.join(__dirname, "..", "zipFiles");

exports.zipAllFiles = async () => {
  zip.addLocalFolder();
  // zip.writeZip(outputPath);
  return zip.toBuffer();
};

//TODO add output filename
exports.zipAndSaveFile = async (outputFile) => {
  try {
    const zip = new AdmZip();
    const writePath = path.join(outputPath, outputFile);
    zip.addLocalFolder(inputPath);
    zip.writeZip(writePath);
    console.log(`Created ${writePath} successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
};
