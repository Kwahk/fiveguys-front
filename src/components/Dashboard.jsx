import { useState, useEffect } from "react";
import "./common/css/Dashboard.css";
import food from "src/assets/food.png";
import traffic from "src/assets/traffic.png";
import fashion from "src/assets/fashion.png";
import culture from "src/assets/culture.png";
import education from "src/assets/education.png";
import etc from "src/assets/etc.png";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [averageSpending, setAverageSpending] = useState(null);
  const [userSpending, setUserSpending] = useState(null);
  const [categoryComparison, setCategoryComparison] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.sub);
      } catch (error) {
        console.error("JWT decoding failed:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/innout/consume");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchAverageSpending = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/innout/average-spending/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setAverageSpending(result);
      } catch (error) {
        console.error("평균 지출 데이터 로드 중 오류 발생:", error);
      }
    };

    fetchAverageSpending();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserSpending = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/innout/user-spending/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setUserSpending(result);
      } catch (error) {
        console.error("사용자 지출 데이터 로드 중 오류 발생:", error);
      }
    };

    fetchUserSpending();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchCategoryComparison = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/innout/category-spending-comparison/${userId}`);
        const result = await response.json();
        setCategoryComparison(result);
      } catch (error) {
        console.error("카테고리별 지출 비교 데이터 로드 중 오류 발생:", error);
      }
    };

    fetchCategoryComparison();
  }, [userId]);

  const getBadgeColor = (category) => {
    switch (category) {
      case "식비":
        return "#FFC6C1";
      case "교통":
        return "#C8FFDF";
      case "패션":
        return "#BFDFFF";
      case "문화생활":
        return "#CAC9FF";
      case "교육":
        return "#FFD3B2";
      default:
        return "#FFF6C8";
    }
  };

  const getBadgeIcon = (category) => {
    switch (category) {
      case "식비":
        return food;
      case "교통":
        return traffic;
      case "패션":
        return fashion;
      case "문화생활":
        return culture;
      case "교육":
        return education;
      default:
        return etc;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const spendingDifference = userSpending && averageSpending ? userSpending.totalSpending - averageSpending.averageSpending : null;

  return (
    <div className="dashboard-container">
      <div className="rectangle">
        <div className="frame3">
          <p>Board</p>
        </div>
        <div className="frame2">
          <p>Rank</p>
        </div>
        <div className="frame1">
          <p>Achievements</p>
        </div>
        <div className="boardCategory">
          {currentItems.map((item, index) => (
            <div key={index} className="category-card">
              <div className="content">
                <span>
                  {item.group.replace("-", " ")}은 {item.category} 분야에서
                  <br />
                  가장 높은 금액을 소비하고 있습니다.
                </span>
              </div>
              <div className="badge" style={{ backgroundColor: getBadgeColor(item.category) }}>
                <img src={getBadgeIcon(item.category)} alt={`${item.category} icon`} className="badge-icon" />
                <div className="group">{item.group.replace("-", " ")}</div>
                <div className="amount">{item.amount.toLocaleString()} 원</div>
              </div>
            </div>
          ))}
          <div className="pagination">
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)} disabled={currentPage === index + 1}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="rectangle rectangle-right">
        <h3>사용자의 지출 내역과 동연령대 비교</h3>
        {averageSpending && averageSpending.averageSpending !== undefined ? (
          <div>
            <p>
              동연령대({averageSpending.userAgeGroup}) 평균 지출: {averageSpending.averageSpending.toLocaleString()} 원
            </p>
          </div>
        ) : (
          <p>평균 지출 데이터를 불러올 수 없습니다.</p>
        )}
        {userSpending && (
          <div>
            <p>사용자의 총 지출: {userSpending.totalSpending.toLocaleString()} 원</p>
            {spendingDifference !== null && <p>동연령대 평균 지출과의 차이: {spendingDifference.toLocaleString()} 원</p>}
          </div>
        )}

        <h4>카테고리별 지출 비교</h4>
        {Object.keys(categoryComparison).map((category, index) => {
          const userSpending = categoryComparison[category].userSpending;
          const averageSpending = categoryComparison[category].averageSpending;
          const difference = userSpending - averageSpending;
          const percentageDifference = (difference / averageSpending) * 100;

          return (
            <div key={index} className="category-comparison">
              <img src={getBadgeIcon(category)} alt={`${category} icon`} className="badge-icon" />
              <p>
                {category}: 사용자 {userSpending.toLocaleString()} 원, 동연령대 평균 {averageSpending.toLocaleString()} 원
                <br />
                차이: {difference > 0 ? "+" : ""}
                {difference.toLocaleString()} 원 ({percentageDifference.toFixed(2)}%)
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
