import { useEffect, useState } from "react";
import moment from "moment";
import "./CalendarCreate.css";
import { jwtDecode } from "jwt-decode"; // 라이브러리 임포트 수정

function CalendarCreate() {
  // 기존 상태 변수 유지
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [events, setEvents] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.sub); // 'sub' claim을 사용자 ID로 설정
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  }, []);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleFileButtonClick = () => {
    document.getElementById("file-input").click();
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const fileURL = URL.createObjectURL(selectedFile);
      setImagePreview(fileURL);
    }
  };

  const handleAddEvent = async () => {
    if (selectedDate && description && amount && category && userId && type) {
      if (amount <= 0) {
        alert("금액은 0보다 커야 합니다.");
        return;
      }
      const adjustedAmount = type === "수입" ? Math.abs(amount) : -Math.abs(amount); // 수입은 양수, 지출은 음수로 처리
      console.log(userId);
      const payload = {
        date: selectedDate,
        amount: adjustedAmount,
        categoryId: parseInt(category, 10), // 카테고리 ID를 정수로 변환
        userId: parseInt(userId, 10), // 사용자 ID를 정수로 변환
        description: description,
      };
      console.log(JSON.stringify(payload));

      try {
        const response = await fetch("http://localhost:8080/api/innout/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // JSON 형식 지정
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
          body: JSON.stringify(payload), // 객체를 JSON 문자열로 변환
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Transaction created:", result);
          setEvents([...events, result]); // 이벤트 리스트에 새 트랜잭션 추가
          setDescription(""); // 입력 필드 초기화
          setAmount("");
          setCategory("");
          setFile(null);
          setImagePreview(null);
        } else {
          const errorText = await response.text();
          throw new Error("Failed to create transaction: " + errorText);
        }
      } catch (error) {
        console.error("Error creating transaction:", error);
        alert("트랜잭션 생성에 실패했습니다: " + error.message);
      }
    } else {
      alert("모든 필드를 입력해주세요.");
    }
  };

  return (
    <div className="calendar-create-container">
      <div className="calendar-create">
        {/* Header with selected date */}
        <div className="entry-header">
          <label>
            <input type="date" value={selectedDate} onChange={handleDateChange} className="input-date" />의 소비 내역을 입력하세요
          </label>
          <div className="entry-buttons">
            <button className="button" onClick={handleFileButtonClick}>
              사진첨부
            </button>
            <button className="button primary" onClick={handleAddEvent}>
              등록하기
            </button>
            <input type="file" id="file-input" style={{ display: "none" }} onChange={handleFileChange} />
          </div>
        </div>

        {/* Form fields */}
        <div className="entry-details">
          <div className="col">
            <select className="input-select" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="">수입/지출을 선택하세요</option>
              <option value="수입">수입</option>
              <option value="지출">지출</option>
            </select>
          </div>
          <div className="col">
            <select className="input-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">분류를 선택하세요</option>
              <option value="1">식비</option>
              <option value="2">교통/차량</option>
              <option value="3">패션/미용</option>
              <option value="4">문화생활</option>
              <option value="5">교육</option>
              <option value="6">기타</option>
            </select>
          </div>
          <div className="col">
            <input className="input-text" type="text" placeholder="내용을 입력하세요" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="col">
            <input className="input-text" type="number" placeholder="금액을 입력하세요" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="미리 보기" />
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarCreate;
