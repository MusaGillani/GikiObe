const prisma = require("../db/db");
const semesterLookup = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};
const fetchTranscript = async (reg) => {
  const student = await prisma.student.findUnique({
    where: {
      RegNo: reg,
    },
  });

  const schemeCourses = await prisma.schemeofstudy.findMany({
    where: {
      Batch: student.batch,
    },
    select: {
      Semester: true,
      CourseCode: true,
    },
    orderBy: {
      Semester: "asc",
    },
  });

  let codes = [];
  schemeCourses.forEach((course) => {
    //   console.log(code);
    codes.push(course.CourseCode);
  });

  let result = await prisma.courseplo.findMany({
    select: {
      Semester: true,
      // CourseTitle: true,
      CourseCode: true,
      PLO1: true,
      PLO2: true,
      PLO3: true,
      PLO4: true,
      PLO5: true,
      PLO6: true,
      PLO7: true,
      PLO8: true,
      PLO9: true,
      PLO10: true,
      PLO11: true,
      PLO12: true,
    },
    where: {
      AND: [
        {
          RegNo: reg,
        },
        {
          CourseCode: { in: codes },
        },
      ],
    },
  });

  if (result) {
    for (const obj of result) {
      const course = await prisma.schemeofstudy.findFirst({
        select: {
          CourseTitle: true,
        },
        where: {
          CourseCode: obj.CourseCode,
        },
      });
      obj["courseTitle"] = course.CourseTitle;
    }
  }

  result.forEach((obj) => {
    let [semType, year] = obj.Semester.split(" ");
    obj.semType = semesterLookup[semType];
    obj.year = year;
  });

  let tmpResult = {};
  for (let row of result) {
    if (!Object.keys(tmpResult).includes(row.year)) {
      tmpResult[row.year] = {};
    }
    if (!Object.keys(tmpResult[row.year]).some((el) => el == row.semType)) {
      tmpResult[row.year][row.semType] = [];
    }
    tmpResult[row.year][row.semType].push(row);
  }

  let transcript = {
    reg: reg,
    name: student.Name,
    faculty: student.Faculty,
    batch: student.Batch,
    result: tmpResult,
  };
  return transcript;
};

module.exports = fetchTranscript;
