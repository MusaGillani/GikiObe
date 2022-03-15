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
exports.zipAndSaveFile = async () => {
  try {
    const zip = new AdmZip();
    const outputFile = "/output.zip";
    zip.addLocalFolder(inputPath);
    zip.writeZip(outputPath + outputFile);
    console.log(`Created ${outputPath + outputFile} successfully`);
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
};
