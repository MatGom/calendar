import DateInfo from './DateInfo/DateInfo';
import WeatherInfo from './WeatherInfo/WeatherInfo';

import './Info.css'

const Info = () => {
  return (
    <div className='info'>
      <DateInfo />
      <WeatherInfo />
    </div>
  );
};

export default Info;
