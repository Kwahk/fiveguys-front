import React, { useState } from "react";
import "./CalendarModal.css";
import { format } from "date-fns";
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
  return icons[categoryId] || CateEtc;
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvents, setEditedEvents] = useState(events);

  if (!isOpen) return null;

  const formattedDate = format(new Date(selectedDate), "MMMM, yyyy");

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

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEvents = [...editedEvents];
    updatedEvents[index][field] = value;
    setEditedEvents(updatedEvents);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="date-display">{formattedDate}</div>
          <button className="modal-correction" onClick={handleEditToggle}>
            {isEditing ? "완료" : "수정하기"}
          </button>
        </div>
        {editedEvents.length === 0 ? (
          <p>No events registered.</p>
        ) : (
          editedEvents.map((event, index) => {
            const { background, border, textColor } = getColorTheme(event.category.id);
            return (
              <div key={index} className={`event-item event-${event.category.id}`}>
                <div className="event-category-group" style={{ borderColor: border, backgroundColor: background }}>
                  <img src={getCategoryIcon(event.category.id)} alt={event.category.name} className="event-icon" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={event.category.name}
                      onChange={(e) => handleInputChange(index, "category", { ...event.category, name: e.target.value })}
                      className="event-category" // 기존 className 유지
                      style={{ color: textColor, fontWeight: "bold" }}
                    />
                  ) : (
                    <div className="event-category" style={{ color: textColor, fontWeight: "bold" }}>
                      {event.category.name}
                    </div>
                  )}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={event.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                    className="event-description" // 기존 className 유지
                  />
                ) : (
                  <div className="event-description">{event.description}</div>
                )}
                {isEditing ? (
                  <input
                    type="number"
                    value={event.amount}
                    onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                    className="event-amount" // 기존 className 유지
                  />
                ) : (
                  <div className="event-amount">{`${event.amount}원`}</div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CalendarModal;
