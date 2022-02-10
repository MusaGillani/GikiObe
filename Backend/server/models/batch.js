"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Batch.init(
    {
      batch_num: DataTypes.INTEGER,
      enrollment_year: DataTypes.DATE,
      enrollment_semester: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Batch",
    }
  );
  return Batch;
};

// module.exports = (sequelize, DataTypes) => {
//   const Batch = sequelize.define('Batch', {
//       title: {
//           type: DataTypes.STRING,
//           allowNull: false,
//       },
//   });

//   Batch.associate = (models) => {
//   };

//   return Todo;
// };
