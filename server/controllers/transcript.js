const prisma = require("../db/db");
const { generatePdf } = require("../helper/generate-transcript");
const fetchTranscript = require("../helper/fetchTranscript");
const { zipAllFiles, zipAndSaveFile } = require("../helper/zip");

exports.getTranscript = async (req, res, next) => {
  try {
    let reg = parseInt(req.params.reg);

    let transcript = await fetchTranscript(reg);

    res.send(JSON.stringify(transcript));
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
};

exports.singlePdf = async (req, res, next) => {
  try {
    let reg = req.params.reg;
    let transcript = await fetchTranscript(parseInt(reg));
    await generatePdf(transcript);

    res.send(JSON.stringify("generated pdf for " + reg));
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
};

exports.bulkTranscripts = async (req, res, next) => {
  try {
    const batch = parseInt(req.params.batch);
    let result = await prisma.student.findMany({
      select: {
        RegNo: true,
      },
      where: {
        Batch: batch,
      },
    });

    // console.log(JSON.stringify(batches));

    result = result.map((obj) => obj.RegNo);

    for (reg of result) {
      let transcript = await fetchTranscript(reg);
      await generatePdf(transcript);
      // pdfs generated will be stored in pdfs folder
      // call a function that will zip those pdfs
    }

    console.log("zipping...");
    const zipName = `${req.params.batch}.zip`;
    const filename = require("path").join(__dirname, "..", "zipFiles", zipName);
    await zipAndSaveFile(zipName);
    // res.writeHead(200, );
    res.setHeader("Content-Disposition", `attachment; filename=${zipName}`);
    res.setHeader("Content-Type", "application/zip");
    res.sendFile(filename);

    // res.send(JSON.stringify("generated pdfs!"));
  } catch (e) {
    console.log(e);
    res.status(404).send(JSON.stringify({ message: e.toString() }));
  }
};
