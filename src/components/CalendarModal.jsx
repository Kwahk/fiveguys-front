import React from 'react';
import './CalendarModal.css';
import CateFood from '../assets/Cate_Food.png';
import CateTraffic from '../assets/Cate_Traffic.png';
import CateFashion from '../assets/Cate_Fashion.png';
import CateCulture from '../assets/Cate_Culture.png';
import CateEducation from '../assets/Cate_Education.png';
import CateEtc from '../assets/Cate_Etc.png';

const CalendarModal = ({ isOpen, onClose, selectedDate }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-header">
          <div className="date-display">{selectedDate}</div>
          <div className="rectangle-57">
            <div className="icon-fast-food"></div>
            <div className="category-name">식비</div>
          </div>
        </div>
        <div className="modal-body">
          <div className="expense-item">
            <div className="category">편의점</div>
            <div className="amount">2,900원</div>
          </div>
          <div className="expense-item">
            <div className="category">주유</div>
            <div className="amount">50,000원</div>
          </div>
          {/* 추가 항목들을 여기에 넣으세요 */}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
