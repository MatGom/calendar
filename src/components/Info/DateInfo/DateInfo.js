import { useState, useEffect } from 'react';

import './DateInfo.css';

function DateInfo() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState('');

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const options = { weekday: 'long', day: '2-digit', month: 'long' };
    const today = new Date().toLocaleDateString('en-US', options);
    setDate(today);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className='date-info'>
      <p>{date}</p>
      <p>{time}</p>
    </div>
  );
}

export default DateInfo;
