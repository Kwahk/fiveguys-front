// Calendar.jsx
import React, { useState } from 'react';
import ReactCalendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import CalendarModal from './CalendarModal';

export default function Calendar() {
  const curDate = new Date();
  const [value, onChange] = useState(curDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tileClassName = ({ date }) => {
    if (date.getDay() === 0) {
      return 'sunday';
    }
    if (date.getDay() === 6) {
      return 'saturday';
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
        onClickDay={handleDateClick}
      />
      
      <CalendarModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        selectedDate={moment(value).format('YYYY-MM-DD')} 
      />
    </div>
  );
}
