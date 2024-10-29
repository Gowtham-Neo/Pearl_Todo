"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: "userId", // Correct foreign key association
        as: "user",
      });
    }
  }
  Task.init(
    {

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      recurrenceType: {
        type: DataTypes.ENUM("None","Daily", "Weekly", "Monthly", "Yearly"),
        allowNull: true,
      },
      customInterval: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Recurrence every X days/weeks/months/years",
      },
      specificDaysOfWeek: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        comment:
          'Days of the week for recurrence (e.g., ["Monday", "Wednesday"])',
      },
      nthDayOfMonth: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "For recurrence on nth day of month (e.g., 2nd Tuesday)",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
