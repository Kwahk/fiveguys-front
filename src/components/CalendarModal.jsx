import React from "react";
import "./CalendarModal.css";
import { format } from "date-fns"; // Assuming you use date-fns for date formatting
import CateFood from "../assets/Cate_Food.png";
import CateTraffic from "../assets/Cate_Traffic.png";
import CateFashion from "../assets/Cate_Fashion.png";
import CateCulture from "../assets/Cate_Culture.png";
import CateEducation from "../assets/Cate_Education.png";
import CateEtc from "../assets/Cate_Etc.png";

const getCategoryIcon = (categoryId) => {
  const icons = {
    1: CateFood,
    2: CateTraffic,
    3: CateFashion,
    4: CateCulture,
    5: CateEducation,
    6: CateEtc,
  };
  return icons[categoryId] || CateEtc; // Default icon set to 'Etc'
};

const CalendarModal = ({ isOpen, onClose, selectedDate, events }) => {
  if (!isOpen) return null;

  const formattedDate = format(new Date(selectedDate), "MMMM, yyyy"); // Format date

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="date-display">{formattedDate}</div> {/* Display formatted date */}
        </div>
        {events.length === 0 ? (
          <p>No events registered.</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className={`event-item event-${event.category.id}`}>
              <img src={getCategoryIcon(event.category.id)} alt={event.category.name} className="event-icon" />
              <div className="event-category">{event.category.name}</div>
              <div className="event-description">{event.description}</div>
              <div className="event-amount">{`${event.amount}원`}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarModal;
