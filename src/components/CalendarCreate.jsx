import React, { useState } from 'react';
import moment from 'moment';
import './CalendarCreate.css';

function CalendarCreate() {
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [events, setEvents] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); 
    };

    const handleAddEvent = () => {
        if (selectedDate && description && amount && category) {
            setEvents([
                ...events,
                {
                    title: `${type}: ${description} - ${amount}원`,
                    date: selectedDate,
                    file: file,
                },
            ]);
            setDescription('');
            setAmount('');
            setCategory('');
            setFile(null);
            setImagePreview(null); // Clear the image preview after adding the event
        } else {
            alert('모든 필드를 입력해주세요.');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const fileURL = URL.createObjectURL(selectedFile);
            setImagePreview(fileURL);
        }
    };

    const handleFileButtonClick = () => {
        document.getElementById('file-input').click();
    };

    return (
        <div className="calendar-create-container">
            <div className="calendar-create">
                {/* Header with selected date */}
                <div className="entry-header">
                    <label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="input-date"
                        />
                        의 소비 내역을 입력하세요
                    </label>
                    <div className="entry-buttons">
                        <button className="button" onClick={handleFileButtonClick}>사진첨부</button>
                        <button className="button primary" onClick={handleAddEvent}>등록하기</button>
                        <input
                            type="file"
                            id="file-input"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Form fields */}
                <div className="entry-details">
                    <div className="col">
                        <select
                            className="input-select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">수입/지출을 선택하세요</option>
                            <option value="수입">수입</option>
                            <option value="지출">지출</option>
                        </select>
                    </div>
                    <div className="col">
                        <select
                            className="input-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">분류를 선택하세요</option>
                            <option value="식비">식비</option>
                            <option value="교통/차량">교통/차량</option>
                            <option value="패션/미용">패션/미용</option>
                            <option value="문화생활">문화생활</option>
                            <option value="교육">교육</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div className="col">
                        <input
                            className="input-text"
                            type="text"
                            placeholder="내용을 입력하세요"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            className="input-text"
                            type="number"
                            placeholder="금액을 입력하세요"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
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