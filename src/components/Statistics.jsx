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

export const data = {
  labels: ["식비", "교통/차량", "패션/미용", "문화생활", "교육", "기타"],
  datasets: [
    {
      label: "Percentage of Expenses",
      data: [30, 26, 18, 16, 7, 2],
      backgroundColor: Object.values(colorThemes).map((color) => color.background),
      borderColor: Object.values(colorThemes).map((color) => color.border),
      borderWidth: 1,
    },
  ],
};

const categories = [
  { label: "식비", percentage: "30%", amount: "184,300원", icon: CateFood, change: "+11,290원", color: colorThemes.food.background, borderColor: colorThemes.food.border },
  { label: "교통/차량", percentage: "26%", amount: "158,000원", icon: CateTraffic, change: "+9,300원", color: colorThemes.traffic.background, borderColor: colorThemes.traffic.border },
  { label: "패션/미용", percentage: "18%", amount: "112,400원", icon: CateFashion, change: "-36,000원", color: colorThemes.fashion.background, borderColor: colorThemes.fashion.border },
  { label: "문화생활", percentage: "16%", amount: "107,500원", icon: CateCulture, change: "+10,600원", color: colorThemes.culture.background, borderColor: colorThemes.culture.border },
  { label: "교육", percentage: "7%", amount: "45,000원", icon: CateEducation, change: "-11,200원", color: colorThemes.education.background, borderColor: colorThemes.education.border },
  { label: "기타", percentage: "2%", amount: "11,400원", icon: CateEtc, change: "-51,500원", color: colorThemes.etc.background, borderColor: colorThemes.etc.border },
];

const Statistics = () => {
  const [userId, setUserId] = useState(""); // userId 상태 추가
  const [transactions, setTransactions] = useState([]); // 거래 내역 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); // 전체 디코딩된 토큰 출력
        const userId = decodedToken.userId; // userId 경로 확인
        setUserId(userId);
        console.log("Decoded user id:", userId);
      } catch (error) {
        console.error("Error decoding JWT token:", error);
      }
    }
  }, []);

  return (
    <div className="statistics-container">
      <div className="chart-container">
        <Pie
          data={data}
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
              <img src={category.icon} alt={category.label} className="category-icon" />
              <span className="category-percentage" style={{ color: category.borderColor }}>
                {category.percentage}
              </span>
            </div>
            <span className="category-label">{category.label}</span>
            <span className="category-change">{category.change}</span>
            <span className="category-amount">{category.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
