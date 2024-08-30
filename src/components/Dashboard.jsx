import { useState, useEffect } from "react";
import "./common/css/Dashboard.css"; // Import the CSS file

// 이미지 파일들을 import
import food from "src/assets/Cate_Food.png";
import traffic from "src/assets/Cate_Traffic.png";
import fashion from "src/assets/Cate_Fashion.png";
import culture from "src/assets/Cate_Culture.png";
import education from "src/assets/Cate_Education.png";
import etc from "src/assets/Cate_Etc.png";
import board from "src/assets/Repo_Board.png";
import rank from "src/assets/Repo_Rank.png";
import achievements from "src/assets/Repo_Achievements.png";
import { jwtDecode } from "jwt-decode";
import { REST_API_BASE_URL } from "../services/Service";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [averageSpending, setAverageSpending] = useState(null);
  const [userSpending, setUserSpending] = useState(null);
  const [categoryComparison, setCategoryComparison] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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
        const response = await fetch(`${REST_API_BASE_URL}/innout/consume`);
        const result = await response.json();
        // 데이터에서 amount를 절대값으로 전환
        const transformedData = result.map((item) => ({
          ...item,
          amount: Math.abs(item.amount),
        }));
        setData(transformedData);
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
        const response = await fetch(`${REST_API_BASE_URL}/innout/average-spending/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        // 평균 지출을 절대값으로 전환
        setAverageSpending({
          ...result,
          averageSpending: Math.abs(result.averageSpending),
        });
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
        const response = await fetch(`${REST_API_BASE_URL}/innout/user-spending/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        // 사용자 지출을 절대값으로 전환
        setUserSpending({
          ...result,
          totalSpending: Math.abs(result.totalSpending),
        });
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
        const response = await fetch(`${REST_API_BASE_URL}/innout/category-spending-comparison/${userId}`);
        const result = await response.json();
        // 카테고리별 지출 비교를 절대값으로 전환
        const transformedComparison = Object.keys(result).reduce((acc, category) => {
          acc[category] = {
            userSpending: Math.abs(result[category].userSpending),
            averageSpending: Math.abs(result[category].averageSpending),
          };
          return acc;
        }, {});
        setCategoryComparison(transformedComparison);
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
      case "문화":
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
      case "문화":
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
      <div className="rectangle rectangle-left">
        <div className="button-container">
          <button className="frame">
            <img src={board} alt="Board Icon" className="repoicon" />
            <h3 className="frame-font">Board</h3>
          </button>
          <button className="frame">
            <img src={rank} alt="Rank Icon" className="repoicon" />
            <h3 className="frame-font">Rank</h3>
          </button>
          <button className="frame">
            <img src={achievements} alt="Achievements Icon" className="repoicon" />
            <h3 className="frame-font">Achievements</h3>
          </button>
        </div>
        <div className="boardCategory">
          {currentItems.map((item, index) => (
            <div key={index} className="board-card">
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
                <div className="amount">{item.amount.toLocaleString()}원</div>
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
        <h3 className="spending-comparison-title">사용자의 지출 내역과 동연령대 비교</h3>
        {averageSpending && averageSpending.averageSpending !== undefined ? (
          <div className="average-spending">
            <p>
              동연령대({averageSpending.userAgeGroup}) 평균 지출 : <span className="board-font-bold">{averageSpending.averageSpending.toLocaleString()}</span> 원
            </p>
          </div>
        ) : (
          <p className="no-data">평균 지출 데이터를 불러올 수 없습니다.</p>
        )}
        {userSpending && (
          <div className="user-spending">
            <p>
              사용자의 총 지출 : <span className="board-font-bold">{userSpending.totalSpending.toLocaleString()}</span> 원
            </p>
            {spendingDifference !== null && (
              <p>
                동연령대 평균 지출과의 차이 : <span className="board-font-bold">{spendingDifference.toLocaleString()}</span> 원
              </p>
            )}
          </div>
        )}

        <h4 className="category-comparison-title">카테고리별 지출 비교</h4>
        <div className="category-comparison-item-group">
          {Object.keys(categoryComparison).map((category, index) => {
            const userSpending = categoryComparison[category].userSpending;
            const averageSpending = categoryComparison[category].averageSpending;
            const difference = userSpending - averageSpending;
            const percentageDifference = (difference / averageSpending) * 100;

            return (
              <div key={index} className="category-comparison-item">
                <img src={getBadgeIcon(category)} alt={`${category} icon`} className="badge-icon" />
                <p>
                  {category} : 사용자 <span className="board-font-bold">{userSpending.toLocaleString()}</span> 원, 동연령대 평균
                  <span className="board-font-bold">{averageSpending.toLocaleString()}</span> 원
                  <br />
                  차이: {difference > 0 ? "+" : ""}
                  <span className="board-font-bold">{difference.toLocaleString()}</span> 원 ({percentageDifference.toFixed(2)}%)
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
