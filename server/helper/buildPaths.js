const path = require("path");
const buildPaths = {
  buildPathHtml: (reg) => path.join(__dirname, "..", "html", `${reg}.html`),
  buildPathPdf: (reg) => path.join(__dirname, "..", "pdfs", `${reg}.pdf`),
};

const executablePath = {
  linux: path.resolve(
    __dirname,
    "../../node_modules/puppeteer/.local-chromium/linux-961656/chrome-linux/chrome"
  ),
  win: path.resolve(
    __dirname,
    "../../node_modules/puppeteer/.local-chromium/win64-961656/chrome-win/chrome.exe"
  ),
};
module.exports = { buildPaths, executablePath };

/*
server path just in case

'/home/mmohsin/Projects/PLO Transcript/backend/GikiObe-musa/Backend/node_modules/puppeteer/.local-chromium/linux-961656/chrome-linux/chrome'

*/
