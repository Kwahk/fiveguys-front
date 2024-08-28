import { useState, useEffect } from "react";
import "./CalendarModal.css";
import { format } from "date-fns";
import CateFood from "../assets/Cate_Food.png";
import CateTraffic from "../assets/Cate_Traffic.png";
import CateFashion from "../assets/Cate_Fashion.png";
import CateCulture from "../assets/Cate_Culture.png";
import CateEducation from "../assets/Cate_Education.png";
import CateEtc from "../assets/Cate_Etc.png";
import { jwtDecode } from "jwt-decode";

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
  food: { background: "#FFC6C1", textColor: "#E02F24" },
  traffic: { background: "#C8FFDF", textColor: "#10E36C" },
  fashion: { background: "#BFDFFF", textColor: "#2E9BFE" },
  culture: { background: "#CAC9FF", textColor: "#8251FE" },
  education: { background: "#FFD3B2", textColor: "#FE7C12" },
  etc: { background: "#FFF6C8", textColor: "#FAC400" },
};

const categoryOptions = [
  { id: 1, name: "식비" },
  { id: 2, name: "교통/차량" },
  { id: 3, name: "패션/미용" },
  { id: 4, name: "문화생활" },
  { id: 5, name: "교육" },
  { id: 6, name: "기타" },
];

const CalendarModal = ({ isOpen, onClose, selectedDate, events }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedEvents, setEditedEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error("JWT decoding failed:", error);
        return;
      }
    }
  }, []);

  useEffect(() => {
    const formattedSelectedDate = format(new Date(selectedDate), "yyyy-MM-dd");
    const filteredEvents = events.filter((event) => event.date === formattedSelectedDate);
    setEditedEvents(filteredEvents);
  }, [selectedDate, events]);

  if (!isOpen) return null;

  const formattedDate = format(new Date(selectedDate), "yyyy, MMMM dd");

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

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSaveClick = async () => {
    if (editingIndex === null) return;

    const eventToSave = editedEvents[editingIndex];

    const payload = {
      id: eventToSave.id,
      date: eventToSave.date,
      amount: eventToSave.amount,
      categoryId: eventToSave.category.id,
      userId: userId,
      description: eventToSave.description,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/innout/${eventToSave.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Event updated successfully!");
        setEditingIndex(null); // Exit editing mode on success
        onClose();
      } else {
        console.error("Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  const handleDeleteClick = async (index) => {
    const eventToDelete = editedEvents[index];

    try {
      const response = await fetch(`http://localhost:8080/api/innout/${eventToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Event deleted successfully!");
        setEditedEvents((prevEvents) => prevEvents.filter((_, i) => i !== index));
        setEditingIndex(null);
        onClose();
      } else {
        console.error("Failed to delete event.");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedEvents = editedEvents.map((event, i) => (i === index ? { ...event, [field]: value } : event));
    setEditedEvents(updatedEvents);
  };

  const renderEventItem = (event, index) => {
    const { background, textColor } = getColorTheme(event.category.id);
    const isEditing = editingIndex === index;
    return (
      <div key={index} className={`event-item event-${event.category.id}`}>
        <div className="event-category-group" style={{ backgroundColor: background }}>
          <img src={getCategoryIcon(event.category.id)} alt={event.category.name} className="event-icon" />
          {isEditing ? (
            <select
              value={event.category.id}
              onChange={(e) =>
                handleInputChange(index, "category", {
                  ...event.category,
                  id: parseInt(e.target.value),
                  name: categoryOptions.find((opt) => opt.id === parseInt(e.target.value)).name,
                })
              }
              className="event-category"
              style={{ color: textColor, fontWeight: "bold" }}
            >
              {categoryOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="event-category" style={{ color: textColor, fontWeight: "bold" }}>
              {event.category.name}
            </div>
          )}
        </div>

        {isEditing ? (
          <>
            <input type="text" value={event.description} onChange={(e) => handleInputChange(index, "description", e.target.value)} className="event-description" />
            <input type="number" value={event.amount} onChange={(e) => handleInputChange(index, "amount", e.target.value)} className="event-amount" />
            <button className="delete-button" onClick={() => handleDeleteClick(index)}>
              삭제
            </button>
            <button className="save-button" onClick={handleSaveClick}>
              완료
            </button>
          </>
        ) : (
          <>
            <div className="event-description">{event.description}</div>
            <div className="event-amount">{`${event.amount}원`}</div>
            <button className="edit-button" onClick={() => handleEditClick(index)}>
              수정하기
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="date-display">{formattedDate}</div>
        </div>
        {editedEvents.length === 0 ? <p>No events registered.</p> : editedEvents.map((event, index) => renderEventItem(event, index))}
      </div>
    </div>
  );
};

export default CalendarModal;
