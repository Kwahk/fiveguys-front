import "./CalendarModal.css";

const CalendarModal = ({ isOpen, onClose, selectedDate }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {" "}
      {/* 배경 클릭 시 모달 닫기 */}
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X {/* 닫기 버튼 */}
        </button>
        <div className="modal-header">
          <h4 className="date-display">{selectedDate}</h4> {/* 선택된 날짜 표시 */}
        </div>
        <div className="modal-body">
          <p>No events are registered for this date.</p> {/* 간단한 메시지 표시 */}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
