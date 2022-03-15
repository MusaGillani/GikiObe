const fs = require("fs");
const path = require("path");
const os = require("os");
const url = require("url");
const puppeteer = require("puppeteer");
// Build paths
const { buildPathHtml, buildPathPdf } = require("./buildPaths").buildPaths;
const { linux, win } = require("./buildPaths").executablePath;

const osPlatform = os.platform(); // possible values are: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'

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
  console.log("browser running on platform: ", osPlatform);
  let executablePath;
  if (/^win/i.test(osPlatform)) {
    executablePath = win;
  } else if (/^linux/i.test(osPlatform)) {
    executablePath = linux;
  }
  console.log("Starting: Generating PDF Process, Kindly wait ..");
  /** Launch a headleass browser */
  const browser = await puppeteer.launch({
    executablePath: executablePath,
    args: ["--no-sandbox"],
  });
  /* 1- Ccreate a newPage() object. It is created in default browser context. */
  const page = await browser.newPage();
  /* 2- Will open our generated `.html` file in the new Page instance. */
  const pdfUrl = url.pathToFileURL(buildPathHtml(reg)).href;
  await page.goto(pdfUrl, { waitUntil: "networkidle0" });
  // await page.goto(buildPathHtml(reg), { waitUntil: "networkidle0" });
  /* 3- Take a snapshot of the PDF */
  const pdf = await page.pdf({
    format: "A4",
    margin: {
      top: "20px",
      right: "20px",
      bottom: "20px",
      left: "20px",
    },
    printBackground: true,
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
