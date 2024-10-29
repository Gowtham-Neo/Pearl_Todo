'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      recurrenceType: {
        type: Sequelize.ENUM("None","Daily", "Weekly", "Monthly", "Yearly"),
        allowNull: true,
      },
      customInterval: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "Recurrence every X days/weeks/months/years",
      },
      specificDaysOfWeek: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        comment:
          'Days of the week for recurrence (e.g., ["Monday", "Wednesday"])',
      },
      nthDayOfMonth: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: "For recurrence on nth day of month (e.g., 2nd Tuesday)",
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      userId: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};