const path = require("path");
const buildPaths = {
  buildPathHtml: (reg) => path.join(__dirname, "..", "html", `${reg}.html`),
  buildPathPdf: (reg) => path.join(__dirname, "..", "pdfs", `${reg}.pdf`),
};
module.exports = buildPaths;
