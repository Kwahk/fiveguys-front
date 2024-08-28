import { useState } from "react";
import CalendarCreate from "./CalendarCreate";
import Calendar from "./Calendar";

function CalendarPage() {
  const [events, setEvents] = useState([]);

  const handleAddEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <div>
      {/* CalendarCreate 컴포넌트 */}
      <CalendarCreate onAddEvent={handleAddEvent} />

      {/* Calendar 컴포넌트 */}
      <Calendar events={events} />
    </div>
  );
}

export default CalendarPage;
