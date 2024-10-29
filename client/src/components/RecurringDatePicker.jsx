// src/components/RecurringDatePicker.jsx

import React, { useState, useMemo } from "react";
import Calendar from "react-calendar";
import { addDays, addWeeks, addMonths, format, parseISO } from "date-fns";

const RecurringDatePicker = ({ onDatesChange }) => {
  // State to manage the start date and recurrence options
  const [startDate, setStartDate] = useState(new Date());
  const [recurrenceType, setRecurrenceType] = useState("daily");
  const [interval, setInterval] = useState(1);
  const [recurringDates, setRecurringDates] = useState([]);

  // Update the recurring dates preview whenever options change
  const calculateRecurringDates = () => {
    let dates = [];
    const start = parseISO(startDate.toISOString());
    for (let i = 0; i < 10; i++) {
      let nextDate;
      if (recurrenceType === "daily") {
        nextDate = addDays(start, i * interval);
      } else if (recurrenceType === "weekly") {
        nextDate = addWeeks(start, i * interval);
      } else if (recurrenceType === "monthly") {
        nextDate = addMonths(start, i * interval);
      }
      dates.push(nextDate);
    }
    setRecurringDates(dates);
    if (onDatesChange) onDatesChange(dates); // Pass dates to parent if callback is provided
  };

  // Trigger recalculation when any input changes
  useMemo(() => {
    calculateRecurringDates();
  }, [startDate, recurrenceType, interval]);

  return (
    <div className="recurring-date-picker">
      <label htmlFor="start-date" className="font-semibold">
        Start Date:
      </label>
      <input
        type="date"
        id="start-date"
        className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg"
        value={format(startDate, "yyyy-MM-dd")}
        onChange={(e) => setStartDate(parseISO(e.target.value))}
      />

      <label htmlFor="recurrence-type" className="font-semibold">
        Recurrence Type:
      </label>
      <select
        id="recurrence-type"
        className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg"
        value={recurrenceType}
        onChange={(e) => setRecurrenceType(e.target.value)}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <label htmlFor="interval" className="font-semibold">
        Interval:
      </label>
      <input
        type="number"
        id="interval"
        className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg"
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
        min="1"
      />

      <h3 className="font-semibold mt-4 mb-2">Recurring Dates Preview:</h3>
      <Calendar
        tileClassName={({ date, view }) => {
          // Highlight the recurring dates on the calendar
          return recurringDates.some(
            (recurringDate) =>
              format(date, "yyyy-MM-dd") === format(recurringDate, "yyyy-MM-dd")
          )
            ? "highlight"
            : null;
        }}
        value={new Date()} // Set the initial month displayed
      />
    </div>
  );
};

export default RecurringDatePicker;
