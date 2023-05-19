import hotbg from './assets/background.jpeg';
import Description from './components/Description';
import { useEffect, useState} from "react";
import { getFormattedWeatherData } from "./WeatherService";
import search from './assets/search-logo.jpg'


function App() {
  const[city,Setcity]=useState("chennai");
  const[data,setData]=useState('');
  const[weather,setWeather]=useState(null);
  const [units,SetUnits]=useState("metric");

  useEffect(()=>{
  const fetchWeatherData = async () => {
    const data = await getFormattedWeatherData(city,units);
    setWeather(data);
  };

  fetchWeatherData();
}, [units,city]);

const handleUnitsClick=(e)=>{
  const button=e.currentTarget;
  const currentUnit=button.innerText.slice(1);
  const isCelsius=currentUnit==='C';
  button.innerText=isCelsius?'*F':'*C'
  SetUnits(isCelsius?"metric":"imperial");
}

const enterKeyPressed = () => {
  
    Setcity(data);
  
};


  return (
    <div className='app' style={{backgroundImage:`url(${hotbg})`}}>
      <div className='overlay'>
        {
          weather &&(
            <div className='container'>
          <div className='section section__inputs'>
            <input className='input_field' type='text' name='city' value={data} onChange={e=> setData(e.target.value)} placeholder='Enter City..'>
            </input>

            <a href='/#' onClick={enterKeyPressed}><img  className='search-logo' src={search}  alt='logo'></img></a>

            <button className='convertor' onClick={(e)=>handleUnitsClick(e)}>°F</button>
          </div>

          <div className='section section__temperature'>
            <div className='icon'>
              <h3>{`${weather.name},${weather.country}`}</h3>
              <img className='climate-logo' src={weather.iconURL} alt=''></img>
              <h3>{weather.description}</h3>
            </div>

          <div className='temperature'>
            <h1>{`${weather.temp.toFixed()} ° ${units==="metric"?"C":"F"} `}</h1>
          </div>
          </div>

          {/*bottom description*/}

          <Description weather={weather} units={units}/>

        </div>
          )
        }
        
      </div>
    </div>
  );
}

export default App;
