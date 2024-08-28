// src/components/CalendarPage.jsx

import React from "react";
import CalendarCreate from "./CalendarCreate";
import Calendar from "./Calendar";

function CalendarPage() {
  return (
    <div>
      {/* CalendarCreate 컴포넌트 */}
      <CalendarCreate />

      {/* Calendar 컴포넌트 */}
      <Calendar />
    </div>
  );
}

export default CalendarPage;
