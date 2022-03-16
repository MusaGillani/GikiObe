const prisma = require("../db/db");
const fetchTranscript = require("../helper/fetchTranscript");
const calculatePLO = require("../helper/calculatePLO");

exports.ploPerformance = async (req, res, next) => {
  try {
    //   const plos = await prisma.courseplo.findMany({
    //     take: 5,
    //   });
    //   console.log(plos);
    const batch = parseInt(req.params.batch);
    const students = await prisma.student.findMany({
      select: {
        RegNo: true,
      },
      where: {
        Batch: batch,
      },
    });
    // console.log(students);

    const allPlos = [];

    for (const obj of students) {
      let transcript = await fetchTranscript(obj.RegNo);
      let studentPlos = await calculatePLO(transcript);
      //   console.log(`studentPlos: ${obj.RegNo}`, studentPlos);
      allPlos.push(studentPlos);
      //   console.log(transcript);
    }
    // console.log(allPlos);

    const commulative = {
      PLO1: 0,
      PLO2: 0,
      PLO3: 0,
      PLO4: 0,
      PLO5: 0,
      PLO6: 0,
      PLO7: 0,
      PLO8: 0,
      PLO9: 0,
      PLO10: 0,
      PLO11: 0,
      PLO12: 0,
    };

    for (const obj of allPlos) {
      commulative.PLO1 += parseInt(obj.PLO1.semester);
      commulative.PLO2 += parseInt(obj.PLO2.semester);
      commulative.PLO3 += parseInt(obj.PLO3.semester);
      commulative.PLO4 += parseInt(obj.PLO4.semester);
      commulative.PLO5 += parseInt(obj.PLO5.semester);
      commulative.PLO6 += parseInt(obj.PLO6.semester);
      commulative.PLO7 += parseInt(obj.PLO7.semester);
      commulative.PLO8 += parseInt(obj.PLO8.semester);
      commulative.PLO9 += parseInt(obj.PLO9.semester);
      commulative.PLO10 += parseInt(obj.PLO10.semester);
      commulative.PLO11 += parseInt(obj.PLO11.semester);
      commulative.PLO12 += parseInt(obj.PLO12.semester);
      //   console.log(commulative);
    }

    // console.log("total: ", commulative);

    const avgSize = allPlos.length;

    commulative.PLO1 = ((commulative.PLO1 / avgSize) * 100).toFixed(2);
    commulative.PLO2 = ((commulative.PLO2 / avgSize) * 100).toFixed(2);
    commulative.PLO3 = ((commulative.PLO3 / avgSize) * 100).toFixed(2);
    commulative.PLO4 = ((commulative.PLO4 / avgSize) * 100).toFixed(2);
    commulative.PLO5 = ((commulative.PLO5 / avgSize) * 100).toFixed(2);
    commulative.PLO6 = ((commulative.PLO6 / avgSize) * 100).toFixed(2);
    commulative.PLO7 = ((commulative.PLO7 / avgSize) * 100).toFixed(2);
    commulative.PLO8 = ((commulative.PLO8 / avgSize) * 100).toFixed(2);
    commulative.PLO9 = ((commulative.PLO9 / avgSize) * 100).toFixed(2);
    commulative.PLO10 = ((commulative.PLO10 / avgSize) * 100).toFixed(2);
    commulative.PLO11 = ((commulative.PLO11 / avgSize) * 100).toFixed(2);
    commulative.PLO12 = ((commulative.PLO12 / avgSize) * 100).toFixed(2);

    res.send(JSON.stringify(commulative));
  } catch (e) {
    console.log(e.toString());
    res.status(404).send(JSON.stringify(e.toString));
  }
};
