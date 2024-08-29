import { useState, useEffect } from 'react';
import './common/css/Dashboard.css'; 
import food from 'src/assets/food.png';
import traffic from 'src/assets/traffic.png';
import fashion from 'src/assets/fashion.png';
import culture from 'src/assets/culture.png';
import education from 'src/assets/education.png';
import etc from 'src/assets/etc.png';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [averageSpending, setAverageSpending] = useState(null); 
  const [userSpending, setUserSpending] = useState(null); // 사용자의 지출 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('http://localhost:8080/api/innout/consume')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('오류 발생:', error));

    const userId = localStorage.getItem("userId");
    console.log("Fetching data for userId:", userId);

    fetch(`http://localhost:8080/api/innout/average-spending/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Average spending data received:", data);
        setAverageSpending(data);
      })
      .catch(error => console.error('평균 지출 데이터 로드 중 오류 발생:', error));

    fetch(`http://localhost:8080/api/innout/user-spending/${userId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("User spending data received:", data);
        setUserSpending(data);
      })
      .catch(error => console.error('사용자 지출 데이터 로드 중 오류 발생:', error));
  }, []);

  const getBadgeColor = (category) => {
    switch(category) {
      case '식비': return '#FFC6C1';
      case '교통': return '#C8FFDF';
      case '패션': return '#BFDFFF';
      case '문화생활': return '#CAC9FF';
      case '교육': return '#FFD3B2';
      default: return '#FFF6C8';
    }
  };

  const getBadgeIcon = (category) => {
    switch(category) {
      case '식비': return food;
      case '교통': return traffic;
      case '패션': return fashion;
      case '문화생활': return culture;
      case '교육': return education;
      default: return etc;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const spendingDifference = userSpending && averageSpending 
    ? userSpending.totalSpending - averageSpending.averageSpending 
    : null;

  return (
    <div className='dashboard-container'>
      <div className='rectangle'>
        <div className='frame3'><p>Board</p></div>
        <div className='frame2'><p>Rank</p></div>
        <div className='frame1'><p>Achievements</p></div>
        <div className='boardCategory'>
          {currentItems.map((item, index) => (
            <div key={index} className='category-card'>
              <div className='content'>
                <span>{item.group.replace('-', ' ')}은 {item.category} 분야에서<br />
                가장 높은 금액을 소비하고 있습니다.</span>
              </div>
              <div className='badge' style={{ backgroundColor: getBadgeColor(item.category) }}>
                <img src={getBadgeIcon(item.category)} alt={`${item.category} icon`} className='badge-icon' />
                <div className='group'>{item.group.replace('-', ' ')}</div>
                <div className='amount'>{item.amount.toLocaleString()} 원</div>
              </div>
            </div>
          ))}
          <div className='pagination'>
            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='rectangle rectangle-right'>
        <h3>사용자의 지출 내역과 동연령대 비교</h3>
        {averageSpending && averageSpending.averageSpending !== undefined ? (
          <div>
            <p>동연령대({averageSpending.userAgeGroup}) 평균 지출: {averageSpending.averageSpending.toLocaleString()} 원</p>
          </div>
        ) : (
          <p>평균 지출 데이터를 불러올 수 없습니다.</p>
        )}
        {userSpending && (
          <div>
            <p>사용자의 총 지출: {userSpending.totalSpending.toLocaleString()} 원</p>
            {spendingDifference !== null && (
              <p>동연령대 평균 지출과의 차이: {spendingDifference.toLocaleString()} 원</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
