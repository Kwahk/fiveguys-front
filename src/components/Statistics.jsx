import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./Statistics.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["식비", "교통/차량", "패션/미용", "문화생활", "교육", "기타"],
  datasets: [
    {
      label: "Percentage of Expenses",
      data: [30, 26, 18, 16, 7, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)", // Red
        "rgba(75, 192, 192, 0.5)", // Green
        "rgba(54, 162, 235, 0.5)", // Blue
        "rgba(153, 102, 255, 0.5)", // Purple
        "rgba(255, 159, 64, 0.5)", // Orange
        "rgba(255, 206, 86, 0.5)", // Yellow
      ],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

const categories = [
  { label: "식비", percentage: "30%", amount: "184,300원", icon: "🍱", change: "+11,290원", color: "rgba(255, 99, 132, 0.5)" },
  { label: "교통/차량", percentage: "26%", amount: "158,000원", icon: "🚗", change: "+9,300원", color: "rgba(75, 192, 192, 0.5)" },
  { label: "패션/미용", percentage: "18%", amount: "112,400원", icon: "👗", change: "-36,000원", color: "rgba(54, 162, 235, 0.5)" },
  { label: "문화생활", percentage: "16%", amount: "107,500원", icon: "🎬", change: "+10,600원", color: "rgba(153, 102, 255, 0.5)" },
  { label: "교육", percentage: "7%", amount: "45,000원", icon: "📚", change: "-11,200원", color: "rgba(255, 159, 64, 0.5)" },
  { label: "기타", percentage: "2%", amount: "11,400원", icon: "⭐", change: "-51,500원", color: "rgba(255, 206, 86, 0.5)" },
];

const Statistics = () => {
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
        {categories.map((category, index) => {
          // category.color에서 'rgba'를 'rgb'로 변환하여 사용
          const fontColor = category.color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, "rgb($1,$2,$3)");

          return (
            <div className="category-card" key={index}>
              <div className="category-block" style={{ backgroundColor: category.color }}>
                <span className="category-icon" style={{ color: fontColor }}>
                  {category.icon}
                </span>
                <span className="category-percentage" style={{ color: fontColor }}>
                  {category.percentage}
                </span>
              </div>
              <span className="category-label">{category.label}</span>
              <span className="category-change">{category.change}</span>
              <span className="category-amount">{category.amount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
