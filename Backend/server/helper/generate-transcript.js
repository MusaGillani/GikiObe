const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
// Build paths
const { buildPathHtml, buildPathPdf } = require("./buildPaths");

/**
 * @description this method takes in a path as a string & returns true/false
 * as to if the specified file path exists in the system or not.
 * @param {String} filePath
 * @returns {Boolean}
 */
const doesFileExist = (filePath) => {
  try {
    fs.statSync(filePath); // get information of the specified file path.
    return true;
  } catch (error) {
    return false;
  }
};
const printPdf = async (reg) => {
  console.log("Starting: Generating PDF Process, Kindly wait ..");
  /** Launch a headleass browser */
  const browser = await puppeteer.launch();
  /* 1- Ccreate a newPage() object. It is created in default browser context. */
  const page = await browser.newPage();
  /* 2- Will open our generated `.html` file in the new Page instance. */
  await page.goto(buildPathHtml(reg), { waitUntil: "networkidle0" });
  /* 3- Take a snapshot of the PDF */
  const pdf = await page.pdf({
    format: "A4",
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
  });
  /* 4- Cleanup: close browser. */
  await browser.close();
  console.log("Ending: Generating PDF Process");
  return pdf;
};

const init = async () => {
  try {
    const pdf = await printPdf();
    fs.writeFileSync(buildPathPdf, pdf);
    console.log("Succesfully created an PDF table");
  } catch (error) {
    console.log("Error generating PDF", error);
  }
};

const generatePdf = async (transcript) => {
  try {
    const reg = transcript["reg"];

    /* Check if the file for `html` build exists in system or not */
    if (doesFileExist(buildPathHtml(reg))) {
      console.log("Deleting old build file");
      /* If the file exists delete the file from system */
      fs.unlinkSync(buildPathHtml(reg));
    }

    const logo = path.join(__dirname, "..", "assets", "logo.jpg");
    const { createHtml } = require("./createHtml");
    const html = createHtml(transcript, logo);

    /* write the generated html to file */
    fs.writeFileSync(buildPathHtml(reg), html);
    console.log("Succesfully created an HTML table");

    const pdf = await printPdf(reg);
    fs.writeFileSync(buildPathPdf(reg), pdf);
    console.log("Succesfully created an PDF table");
  } catch (error) {
    console.log("Error generating", error);
  }
};

module.exports = { generatePdf };
