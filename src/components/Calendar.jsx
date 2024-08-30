import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
import CalendarModal from "./CalendarModal";
import { jwtDecode } from "jwt-decode";
import {REST_API_BASE_URL} from "../services/Service"

// 숫자를 천 단위로 포맷하는 함수
const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null); // 초기값을 null로 변경
  const [modalEvents, setModalEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]); // 모든 이벤트를 저장

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
    } else {
      console.error("No token found in localStorage.");
    }
  }, []);

  const fetchTransactions = async (date) => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const response = await fetch(`${REST_API_BASE_URL}/innout/transaction/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const transactions = await response.json();
        setAllEvents(transactions); // 모든 이벤트를 저장
        const formattedDate = moment(date).format("YYYY-MM-DD");
        const filteredTransactions = transactions.filter((transaction) => transaction.date === formattedDate);
        setModalEvents(filteredTransactions);
      } else {
        console.error("Failed to fetch transactions.");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions(selectedDate); // User ID가 설정된 후에 데이터 가져오기
    }
  }, [userId, selectedDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchTransactions(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderTileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const dayEvents = allEvents.filter((event) => event.date === formattedDate);

      if (dayEvents.length > 0) {
        // 지출과 수입을 따로 필터링하여 합산
        const totalExpense = dayEvents
          .filter((event) => event.amount < 0) // 음수인 경우 지출로 간주
          .reduce((sum, event) => sum + event.amount, 0);

        const totalIncome = dayEvents
          .filter((event) => event.amount > 0) // 양수인 경우 수입으로 간주
          .reduce((sum, event) => sum + event.amount, 0);

        return (
          <div className="calendar-amounts">
            <div className="calendar-income">{formatNumber(totalIncome)}원</div>
            <div className="calendar-expense">{formatNumber(totalExpense)}원</div>
          </div>
        );
      }
    }
    return null;
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
        tileContent={renderTileContent} // 각 날짜 셀에 지출 및 수입 금액 표시
      />

      <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={moment(selectedDate).format("YYYY-MM-DD")} events={modalEvents} />
    </div>
  );
}
