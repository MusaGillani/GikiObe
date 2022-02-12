"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_CLO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Courses, {
        foreignKey: "course_code",
      });
    }
  }
  Course_CLO.init(
    {
      CLO_ID: DataTypes.INTEGER,
      CLO_Num: DataTypes.INTEGER,
      CLO_description: DataTypes.STRING,
      PLO_ID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Course_CLO",
    }
  );

  // Course_CLO.removeAttribute("id");
  return Course_CLO;
};
