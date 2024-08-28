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
const colorThemes = {
  food: { background: "#FFC6C1", border: "#E02F24", textColor: "#E02F24" },
  traffic: { background: "#C8FFDF", border: "#10E36C", textColor: "#10E36C" },
  fashion: { background: "#BFDFFF", border: "#2E9BFE", textColor: "#2E9BFE" },
  culture: { background: "#CAC9FF", border: "#8251FE", textColor: "#8251FE" },
  education: { background: "#FFD3B2", border: "#FE7C12", textColor: "#FE7C12" },
  etc: { background: "#FFF6C8", border: "#FAC400", textColor: "#FAC400" },
};

const CalendarModal = ({ isOpen, onClose, selectedDate, events }) => {
  if (!isOpen) return null;

  const formattedDate = format(new Date(selectedDate), "MMMM, yyyy"); // 날짜 형식 지정

  // 카테고리 ID를 colorThemes의 키로 변환하는 함수
  const getColorTheme = (categoryId) => {
    const categoryMap = {
      1: "food",
      2: "traffic",
      3: "fashion",
      4: "culture",
      5: "education",
      6: "etc",
    };
    return colorThemes[categoryMap[categoryId]] || colorThemes.etc;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="date-display">{formattedDate}</div> {/* 날짜 표시 */}
        </div>
        {events.length === 0 ? (
          <p>No events registered.</p>
        ) : (
          events.map((event, index) => {
            const { background, border, textColor } = getColorTheme(event.category.id); // 각 이벤트의 색상 테마 가져오기
            return (
              <div key={index} className={`event-item event-${event.category.id}`}>
                <div className="event-category-group" style={{ borderColor: border, backgroundColor: background }}>
                  <img src={getCategoryIcon(event.category.id)} alt={event.category.name} className="event-icon" />
                  <div className="event-category" style={{ color: textColor, fontWeight: "bold" }}>
                    {event.category.name}
                  </div>
                </div>
                <div className="event-description">{event.description}</div>
                <div className="event-amount">{`${event.amount}원`}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CalendarModal;
