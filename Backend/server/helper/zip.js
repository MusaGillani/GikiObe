const path = require('path');
const AdmZip = require("adm-zip");

const zip = new AdmZip();
const outputFile = "pdfs.zip";

exports.zipAllFiles = async () => {

  zip.addLocalFolder(path.join(__dirname,'..','pdfs'));
  // zip.writeZip(outputFile);
  return zip.toBuffer();
}