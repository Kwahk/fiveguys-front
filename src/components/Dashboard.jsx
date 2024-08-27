import { useState, useEffect } from 'react';
import './common/css/Dashboard.css'; // Import the CSS file

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
        const formattedData = [];
        Object.keys(data).forEach(category => {
          Object.keys(data[category]).forEach(group => {
            formattedData.push({
              category,
              group,
              amount: data[category][group]
            });
          });
        });
        setData(formattedData);
      })
      .catch(error => console.error('오류남:', error));
  }, []);

  // 현재 페이지의 항목들 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    
      <div className='dashboard-container'>
        <div className='rectangle'>
          <div className='frame3'></div>
          <div className='frame2'></div>
          <div className='frame1'></div>
          <div className='boardCategory'>
            <table className='table-container'>
              <thead>
                <tr>
                  <th>카테고리</th>
                  <th>연령대/성별</th>
                  <th>소비 금액</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.group}</td>
                    <td>{item.amount.toLocaleString()} 원</td> {/* 금액에 포맷 추가 */}
                  </tr>
                ))}
              </tbody>
            </table>
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
