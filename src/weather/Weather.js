import React, { useState ,useEffect} from 'react'
import Card from './Card';
import "./style.css"


const Weather = () => {
const [search,setSearch]=useState("patna");
const [info,setInfo]=useState({})

const getData = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ae81fa6c6c8d747d052ac01c9de8068a`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  },[]);
    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search" placeholder='search...'  className='searchTerm'  value={search} onChange={(e)=>setSearch(e.target.value)} />
                    <button className='searchButton' onClick={getData}>search</button>
                </div>
            </div>
           <Card {...info}/>
        </>
    )
}

export default Weather;