const prisma = require("../db/db");

/**
 * @param reg student reg
 * @param semester course semester
 * @param courseCode course on which clo is mapped
 * @param cloNum which clo is mapped
 */
exports.calculatePlo = async (reg, semester, courseCode, cloNum) => {
  /*
    use course code and clo num to find which plo is affected
    and recalculate that plo and insert in database  
    */
  let ploPolicy = await prisma.course_clos.findFirst({
    where: {
      CourseCode: courseCode,
      clo_num: cloNum,
    },
    select: {
      mapped_on_plo: true,
      weightage: true,
    },
  });
  let cloWeightages = await prisma.assessments.findFirst({
    where: {
      course_code: courseCode,
      mapped_on_clo: cloNum,
    },
    select: {
      clo_threshold: true,
      obtained_clo_threshold: true,
    },
  });

  let cloStatus =
    cloWeightages.obtained_clo_threshold >= cloWeightages.clo_threshold
      ? "passed"
      : "failed";

  if (cloStatus == "passed") {
    // fetch previous plo status from database and this weightage in it
    let plo = await prisma.plo_attainment.findFirst({
      where: {
        reg_no: reg,
        course_code: courseCode,
        semester: semester,
        plo_num: ploPolicy.mapped_on_plo,
      },
      select: {
        plo_attainment: true,
      },
    });
    // plo = plo.plo_attainment;
    // insert new plo data in database here
    // plo ??= 0;
    // plo += ploPolicy.weightage;
    // await prisma.plo_attainment.upsert({
    //   where: {
    //     reg_no_course_code_semester_plo_num: {
    //       reg_no: reg,
    //       course_code: courseCode,
    //       semester: semester,
    //       plo_num: ploPolicy.mapped_on_plo,
    //     },
    //   },
    //   update: {
    //     plo_attainment: plo,
    //   },
    //   create: {
    //     reg_no: reg,
    //     course_code: courseCode,
    //     semester: semester,
    //     plo_num: ploPolicy.mapped_on_plo,
    //     plo_attainment: plo,
    //   },
    // });
    if (plo === null) {
      plo = 0;
      plo += ploPolicy.weightage;
      await prisma.plo_attainment.create({
        data: {
          reg_no: reg,
          course_code: courseCode,
          semester: semester,
          plo_num: ploPolicy.mapped_on_plo,
          plo_attainment: plo,
        },
      });
    } else {
      plo = parseFloat(plo.plo_attainment);
      plo += parseFloat(ploPolicy.weightage);
      // await prisma.plo_attainment.update({
      //   where: {
      //     reg_no: reg,
      //     course_code: courseCode,
      //     semester: semester,
      //     plo_num: ploPolicy.mapped_on_plo,
      //   },
      //   data: {
      //     plo_attainment: plo,
      //   },
      // });
      await prisma.$queryRaw`UPDATE plo_attainment SET plo_attainment=${plo} WHERE reg_no=${reg} AND course_code=${courseCode} AND semester=${semester} AND plo_num=${ploPolicy.mapped_on_plo}`;
    }
    console.log("weightage: ", plo);
  }
};
