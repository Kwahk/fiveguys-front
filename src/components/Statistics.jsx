import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { jwtDecode } from "jwt-decode"; // jwtDecode 함수 사용
import "./Statistics.css";
import CateFood from "../assets/Cate_Food.png";
import CateTraffic from "../assets/Cate_Traffic.png";
import CateFashion from "../assets/Cate_Fashion.png";
import CateCulture from "../assets/Cate_Culture.png";
import CateEducation from "../assets/Cate_Education.png";
import CateEtc from "../assets/Cate_Etc.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorThemes = {
  food: { background: "#FFC6C1", border: "#E02F24" },
  traffic: { background: "#C8FFDF", border: "#10E36C" },
  fashion: { background: "#BFDFFF", border: "#2E9BFE" },
  culture: { background: "#CAC9FF", border: "#8251FE" },
  education: { background: "#FFD3B2", border: "#FE7C12" },
  etc: { background: "#FFF6C8", border: "#FAC400" },
};

const categories = [
  { name: "식비", icon: CateFood, color: colorThemes.food.background, borderColor: colorThemes.food.border },
  { name: "교통/차량", icon: CateTraffic, color: colorThemes.traffic.background, borderColor: colorThemes.traffic.border },
  { name: "패션/미용", icon: CateFashion, color: colorThemes.fashion.background, borderColor: colorThemes.fashion.border },
  { name: "문화생활", icon: CateCulture, color: colorThemes.culture.background, borderColor: colorThemes.culture.border },
  { name: "교육", icon: CateEducation, color: colorThemes.education.background, borderColor: colorThemes.education.border },
  { name: "기타", icon: CateEtc, color: colorThemes.etc.background, borderColor: colorThemes.etc.border },
];

const Statistics = () => {
  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [categoryAmounts, setCategoryAmounts] = useState(Array(categories.length).fill(0));
  const [totalAmount, setTotalAmount] = useState(0);

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
    if (userId) {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:8080/api/innout/transaction/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const transactions = await response.json();
          setTransactions(transactions);

          // Category별 amount 계산
          const categoryAmounts = Array(categories.length).fill(0);
          let totalAmount = 0;

          transactions.forEach((transaction) => {
            const categoryIndex = categories.findIndex((category) => category.name === transaction.category.name);
            if (categoryIndex !== -1) {
              categoryAmounts[categoryIndex] += Math.abs(transaction.amount); // 절댓값으로 변환
            }
            totalAmount += Math.abs(transaction.amount); // 절댓값으로 변환
          });

          setCategoryAmounts(categoryAmounts);
          setTotalAmount(totalAmount);
        } else {
          console.log("거래내역을 불러오지 못했습니다.");
        }
      };
      fetchData();
    }
  }, [userId]); // 의존성 배열에 userId 추가

  return (
    <div className="statistics-container">
      <div className="chart-container">
        <Pie
          data={{
            labels: categories.map((category) => category.name),
            datasets: [
              {
                label: "Percentage of Expenses",
                data: categoryAmounts,
                backgroundColor: categories.map((category) => category.color),
                borderColor: categories.map((category) => category.borderColor),
                borderWidth: 1,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
      <div className="categories-container">
        {categories.map((category, index) => (
          <div className="category-card" key={index}>
            <div className="category-block" style={{ backgroundColor: category.color }}>
              <img src={category.icon} alt={category.name} className="category-icon" />
              <span className="category-percentage" style={{ color: category.borderColor }}>
                {`${((categoryAmounts[index] / totalAmount) * 100).toFixed(0)}%`}
              </span>
            </div>
            <span className="category-label">{category.name}</span>
            <span className="category-amount">{`${categoryAmounts[index].toLocaleString()}원`}</span> {/* 절댓값으로 출력 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
