const calculatePLO = async (data) => {
  const commulative = {};

  function yesNo(string) {
    if (string) return string.charAt(0).toUpperCase();
    else return "-";
  }

  function count_semester(a, count, PLO) {
    if (a != "-") {
      if (PLO in commulative) commulative[PLO][a] = commulative[PLO][a] + 1;
      else if (a == "Y") commulative[PLO] = { Y: 1, N: 0 };
      else if (a == "N") commulative[PLO] = { Y: 0, N: 1 };
      if (PLO in count) count[PLO][a] = count[PLO][a] + 1;
      else if (a == "Y") count[PLO] = { Y: 1, N: 0 };
      else if (a == "N") count[PLO] = { Y: 0, N: 1 };
    }
    return "";
  }

  function semesterGP(count, key) {
    for (var key in count) {
      let num = parseFloat(
        count[key]["Y"] / (count[key]["Y"] + count[key]["N"])
      );
      count[key]["semester"] = num.toFixed(2);
    }
    return "";
  }

  function commulativePLO() {
    for (var key in commulative) {
      let num = parseFloat(
        commulative[key]["Y"] / (commulative[key]["Y"] + commulative[key]["N"])
      );
      commulative[key]["semester"] = num.toFixed(2);
    }
    return "";
  }

  delete data["faculty"];
  delete data["name"];
  delete data["batch"];
  delete data["reg"];

  const details = Object.keys(data["result"])
    .sort()
    .reduce((obj, key) => {
      obj[key] = data["result"][key];
      return obj;
    }, {});
  Object.keys(details).map((row_r) => {
    const ordered = Object.keys(details[row_r])
      .sort()
      .reduce((obj, key) => {
        obj[key] = details[row_r][key];
        return obj;
      }, {});
    let count = {};
    Object.keys(ordered).map((year) => {
      for (var key in count) delete count[key];

      details[row_r][year].map((row) => {
        count_semester(yesNo(row.PLO1), count, "PLO1");
        count_semester(yesNo(row.PLO2), count, "PLO2");
        count_semester(yesNo(row.PLO3), count, "PLO3");
        count_semester(yesNo(row.PLO4), count, "PLO4");
        count_semester(yesNo(row.PLO5), count, "PLO5");
        count_semester(yesNo(row.PLO6), count, "PLO6");
        count_semester(yesNo(row.PLO7), count, "PLO7");
        count_semester(yesNo(row.PLO8), count, "PLO8");
        count_semester(yesNo(row.PLO9), count, "PLO9");
        count_semester(yesNo(row.PLO10), count, "PLO10");
        count_semester(yesNo(row.PLO11), count, "PLO11");
        count_semester(yesNo(row.PLO12), count, "PLO12");
      });
      semesterGP(count);
      //   count.PLO1 ? count.PLO1 : 0;
      //   count.PLO2 ? count.PLO2 : 0;
      //   count.PLO3 ? count.PLO3 : 0;
      //   count.PLO4 ? count.PLO4 : 0;
      //   count.PLO5 ? count.PLO5 : 0;
      //   count.PLO6 ? count.PLO6 : 0;
      //   count.PLO7 ? count.PLO7 : 0;
      //   count.PLO8 ? count.PLO8 : 0;
      //   count.PLO9 ? count.PLO9 : 0;
      //   count.PLO10 ? count.PLO10 : 0;
      //   count.PLO11 ? count.PLO11 : 0;
      //   count.PLO12 ? count.PLO12 : 0;
      commulativePLO();
      //   console.log(commulative);
      //   commulative.PLO1 ? commulative.PLO1 : 0;
      //   commulative.PLO2 ? commulative.PLO2 : 0;
      //   commulative.PLO3 ? commulative.PLO3 : 0;
      //   commulative.PLO4 ? commulative.PLO4 : 0;
      //   commulative.PLO5 ? commulative.PLO5 : 0;
      //   commulative.PLO6 ? commulative.PLO6 : 0;
      //   commulative.PLO7 ? commulative.PLO7 : 0;
      //   commulative.PLO8 ? commulative.PLO8 : 0;
      //   commulative.PLO9 ? commulative.PLO9 : 0;
      //   commulative.PLO10 ? commulative.PLO10 : 0;
      //   commulative.PLO11 ? commulative.PLO11 : 0;
      //   commulative.PLO12 ? commulative.PLO12 : 0;
    });
  });
  //   console.log(commulative);
  return commulative;
};

module.exports = calculatePLO;
