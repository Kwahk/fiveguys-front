import React from 'react';
import './CalendarModal.css';

const CalendarModal = ({ isOpen, onClose, selectedDate, events }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-header">
          <div className="date-display">{selectedDate}</div>
        </div>
        <div className="modal-body">
          {events.length === 0 ? (
            <p>등록된 이벤트가 없습니다.</p>
          ) : (
            events.map((event, index) => (
              <div key={index} className="expense-item">
                <div className="category">{event.category}</div>
                <div className="amount">{event.amount}원</div>
                {event.fileUrl && (
                  <div className="image-preview">
                    <img src={event.fileUrl} alt="첨부파일" />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
