"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Course_CLO, {
        foreignKey: "course_code",
        // as: "course_code",
      });
    }
  }
  Courses.init(
    {
      course_code: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.STRING,
      introduction: DataTypes.STRING,
      creditHours: DataTypes.INTEGER,
      preReq: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Courses",
    }
  );
  // Courses.removeAttribute("id");
  return Courses;
};

// module.exports = (sequelize, DataTypes) => {
//   const Courses = sequelize.define("Courses", {
//     name: DataTypes.STRING,
//     introduction: DataTypes.STRING,
//     creditHours: DataTypes.INTEGER,
//     preReq: DataTypes.INTEGER,
//   });
//   Courses.associate = (models) => {
//     Courses.hasMany(models.Course_CLO, {
//       foreignKey: "",
//       as: "",
//     });
//   };
// };
