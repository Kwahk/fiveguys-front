import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import CalendarModal from "./CalendarModal"; // 모달 컴포넌트 임포트
import { jwtDecode } from "jwt-decode";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 초기 상태를 오늘 날짜로 설정
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태, 초기값을 false로 설정
  const [userId, setUserId] = useState("");
  const [modalEvents, setModalEvents] = useState([]); // Add state to hold events for the modal

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error("JWT decoding failed:", error);
        return; // JWT decoding failed, do not proceed further
      }
    }
  }, []);

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    const response = await fetch(`http://localhost:8080/api/innout/transaction/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const transactions = await response.json();
      console.log("Transactions are: \n", transactions);

      const filteredTransactions = transactions.filter((transaction) => transaction.date === formattedDate);
      setModalEvents(filteredTransactions); // Set data for modal
      setIsModalOpen(true); // Open the modal
    } else {
      console.log("Failed to fetch transactions.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const tileClassName = ({ date }) => {
    if (date.getDay() === 0) {
      return "sunday";
    }
    if (date.getDay() === 6) {
      return "saturday";
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <ReactCalendar
        locale="en"
        onChange={setSelectedDate}
        value={selectedDate}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format("D")}
        tileClassName={tileClassName}
        showNeighboringMonth={false}
        onClickDay={handleDateClick}
      />

      <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={moment(selectedDate).format("YYYY-MM-DD")} events={modalEvents} />
    </div>
  );
}
