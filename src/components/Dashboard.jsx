import { useState, useEffect } from 'react';
import './common/css/Dashboard.css'; // Import the CSS file

// 이미지 파일들을 import
import food from 'src/assets/food.png';
import traffic from 'src/assets/traffic.png';
import fashion from 'src/assets/fashion.png';
import culture from 'src/assets/culture.png';
import education from 'src/assets/education.png';
import etc from 'src/assets/etc.png';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // 한 페이지에 표시할 항목 수

  // 서버에서 데이터 가져오기
  useEffect(() => {
    fetch('http://localhost:8080/api/innout/consume')
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => console.error('오류 발생:', error));
  }, []);

  // 배지 색상을 동적으로 결정하는 함수
  const getBadgeColor = (category) => {
    switch(category) {
      case '식비':
        return '#FFC6C1';
      case '교통':
        return '#C8FFDF';
      case '패션':
        return '#BFDFFF';
      case '문화생활':
        return '#CAC9FF';
      case '교육':
        return '#FFD3B2';
      default:
        return '#FFF6C8';
    }
  };

  // 배지 아이콘을 동적으로 결정하는 함수
  const getBadgeIcon = (category) => {
    switch(category) {
      case '식비':
        return food;
      case '교통':
        return traffic;
      case '패션':
        return fashion;
      case '문화생활':
        return culture;
      case '교육':
        return education;
      default:
        return etc;
    }
  };

  // 현재 페이지의 항목들 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='dashboard-container'>
      <div className='rectangle'>
        <div className='frame3'>Board</div>
        <div className='frame2'>Rank</div>
        <div className='frame1'>Achievements</div>
        <div className='boardCategory'>
          {currentItems.map((item, index) => (
            <div key={index} className='category-card'>
              <div className='content'>
                <span>{item.group.replace('-', ' ')}은 {item.category} 분야에서<br />
                가장 높은 금액을 소비하고 있습니다.</span>
              </div>
              <div className='badge' style={{ backgroundColor: getBadgeColor(item.category)  }}>
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
      <div className='rectangle rectangle-right'></div>
    </div>
  );
};

export default Dashboard;
