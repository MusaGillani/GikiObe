"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Course_CLOs", {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   // primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      course_code: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Courses",
          key: "course_code",
          as: "course_code",
        },
      },
      CLO_ID: {
        type: Sequelize.INTEGER,
      },
      CLO_Num: {
        type: Sequelize.INTEGER,
      },
      CLO_description: {
        type: Sequelize.STRING,
      },
      PLO_ID: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // .then(() => {
    //   queryInterface.Sequelize.query(
    //     "ALTER TABLE `Course_CLOs` ADD " +
    //       "CONSTRAINT `course_clos_ibfk_1` FOREIGN KEY (`course_code`) REFERENCES " +
    //       "Courses(`course_code`)"
    //   );
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Course_CLOs");
  },
};
