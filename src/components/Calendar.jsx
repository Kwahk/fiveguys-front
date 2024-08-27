import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'; // Ensure this CSS file is correctly set up for styling

export default function Calendar() {
  const curDate = new Date(); // Current date
  const [value, onChange] = useState(curDate); // Selected date
  const [activeMonth, setActiveMonth] = useState(moment(curDate).format('YYYY-MM')); // Active month state

  // Function to add custom content to each tile
  const addContent = ({ date, view }) => {
    if (view === 'month') {
      // Add content to tiles if needed
      return
    }
    return null;
  };

  // Function to handle month change
  const getActiveMonth = (activeStartDate) => {
    const month = moment(activeStartDate).format('YYYY-MM');
    setActiveMonth(month); // Update active month state
  };

  return (
    <div className="calendar-container">
      <ReactCalendar
        locale="en"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')} // Format day
        tileContent={addContent}
        showNeighboringMonth={false}
        onActiveStartDateChange={({ activeStartDate }) =>
          getActiveMonth(activeStartDate) // Update active month when calendar view changes
        }
      />
      <div>
        <p>Selected Date: {moment(value).format('YYYY-MM-DD')}</p>

      </div>
    </div>
  );
}
