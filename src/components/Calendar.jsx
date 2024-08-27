import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

export default function Calendar() {
  const curDate = new Date();
  const [value, onChange] = useState(curDate); 


  const tileClassName = ({ date }) => {

    if (date.getDay() === 0) {
      return 'sunday'; 
    }
    return null; 
  };

  return (
    <div className="calendar-container">
      <ReactCalendar
        locale="en"
        onChange={onChange}
        value={value}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format('D')}
        tileClassName={tileClassName} 
        showNeighboringMonth={false}
      />
      <div>
        <p>Selected Date: {moment(value).format('YYYY-MM-DD')}</p>
      </div>
    </div>
  );
}
