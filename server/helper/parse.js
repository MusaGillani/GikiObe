const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

exports.read = (filename) => {
  let results = [];
  let filePath = path.join(__dirname, "..", "csvs", filename);
  //   console.log("File", filePath);
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csv({
          // columns: true,
          // skip_empty_lines: true,
          // bom: true,
          // ['']
          // mapHeaders: ({ header, index }) => {
          //   //   console.log(index);
          //   if (index == 0) header.substring(1);
          // },
        })
      )
      .on("data", (data) => {
        //   console.log(data["roll"]);
        //   console.log(data.roll);
        //   console.log(data["Course Code"]);
        results.push(data);
      })
      .on("error", (err) => reject(err))

      .on("end", () => {
        //   console.log(results);
        //   results.forEach((obj) => {
        //     // console.log(Object.keys(obj));
        //     // console.log(obj["roll"]);
        //   });
        resolve(results);
      });
  });
};
