import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import CalendarModal from "./CalendarModal";
import { jwtDecode } from "jwt-decode";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [modalEvents, setModalEvents] = useState([]);

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

  const fetchTransactions = async (date) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const formattedDate = moment(date).format("YYYY-MM-DD");
    try {
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
        setModalEvents(filteredTransactions);
      } else {
        console.error("Failed to fetch transactions.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchTransactions(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchTransactions(selectedDate);
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
