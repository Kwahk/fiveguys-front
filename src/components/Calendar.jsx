import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";
// import CalendarModal from "./CalendarModal";
import { jwtDecode } from "jwt-decode";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 초기 상태를 오늘 날짜로 설정
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalEvents, setModalEvents] = useState([]);
  const [userId, setUserId] = useState("");

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

  useEffect(() => {
    // Ensure we have a userId and a token before fetching data
    if (userId && localStorage.getItem("jwtToken")) {
      handleDateClick(selectedDate);
    }
  }, [userId, selectedDate]); // Reacting on userId and selectedDate change

  const handleDateClick = async (date) => {
    setSelectedDate(date); // 선택된 날짜 상태 업데이트
    const formattedDate = moment(date).format("YYYY-MM-DD"); // API 요청에 사용될 날짜 형식
    console.log("select date is: ", formattedDate);

    const response = await fetch(`http://localhost:8080/api/innout/transaction/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const transactions = await response.json();
      console.log("거래 내역은: \n", transactions);

      // 선택된 날짜에 해당하는 거래만 필터링
      const filteredTransactions = transactions.filter((transaction) => transaction.date === formattedDate);
      // setModalEvents(filteredTransactions); // 모달에 표시될 거래 내역 상태 업데이트
      // setIsModalOpen(true); // 모달 열기
      console.log("해당 일의 거래 내역은: \n", filteredTransactions);
    } else {
      if (userId != null) {
        console.log("거래내역을 불러오지 못했습니다.");
      }
    }
  };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

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

      {/* <CalendarModal isOpen={isModalOpen} onClose={handleCloseModal} selectedDate={moment(selectedDate).format("YYYY-MM-DD")} events={modalEvents} /> */}
    </div>
  );
}
