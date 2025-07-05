import { useState, useEffect, useRef } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

import './App.css'

function App() {
  const searchInput = useRef()
  const [weatherData, setWeatherData] = useState(false);
  const CheckWeather = async (city) => {
    if (city === "") {
      alert("Enter a place")
      return;
    }
    const api_key = "c082ffde5f04a46f2c6b7cbed1b4d5ea"
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert("Enter a Valid Name")
        return;
      }

      setWeatherData({
        temp: Math.floor(data.main.temp),
        speed: Math.floor((data.wind.speed * 3.6)),
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        feels: Math.floor(data.main.feels_like),
        location: data.name,
        type: data.weather[0].main,
        icon: data.weather[0].icon,
        country: data.sys.country
      })

    } catch (error) {
      setWeatherData(false)
    }
  }

  useEffect(() => {
    CheckWeather("Tokyo")
  }, [])

  const times = ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];

  const sampleData = times.map((time) => ({
    time,
    temp: Math.floor(Math.random() * 40),
    wind: Math.floor(Math.random() * 15),
  }));

  const now = new Date();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const date = now.getDate();
  const month = now.toLocaleString('en-US', { month: 'short' });
  const year = now.getFullYear();

  if (weatherData.type === "Clouds") {
    document.querySelector("video").src = "/Videos/clouds.mp4"
  } else if (weatherData.type === "Clear") {
    document.querySelector("video").src = "/Videos/clear.mp4"
  } else if (weatherData.type === "Thunderstorm") {
    document.querySelector("video").src = "/Videos/thunder.mp4"
  } else if (weatherData.type === "Rain" || weatherData.type === "Drizzle") {
    document.querySelector("video").src = "/Videos/raining.mp4"
  } else if (weatherData.type === "Snow") {
    document.querySelector("video").src = "/Videos/snow.mp4"
  }

  return (
    <>
      <div className="Main relative w-screen h-screen overflow-hidden font-mono">
        <video
          src="public\Videos\raining.mp4" autoPlay loop muted className="video-background absolute top-0 left-0 min-w-screen min-h-screen object-cover -z-10"
        ></video>
        <div className="content relative z-10 text-white">
          <div className="w-full h-[80px] bg-transparent p-4 flex justify-center items-center">
            <div  className="flex justify-center items-center w-full max-w-xl h-full p-3.5">
              <input
                type="text"
                placeholder="Search city..."
                aria-label="Search city"
                id='search-bar'
                ref={searchInput}
                className="w-[70%] h-[60%] rounded-l-xl text-black text-lg bg-white/40 placeholder-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={{ padding: "10px" }}
              />
              <button onClick={() => { CheckWeather(searchInput.current.value) }} className="w-[10%] h-[60%] bg-blue-600 hover:bg-blue-700 rounded-r-xl flex justify-center items-center">
                <img src="/Images/search.svg" width={26} alt="Search Icon" />
              </button>
            </div>
          </div>
          {weatherData && (
            <>
              <div className="type flex flex-col md:flex-row justify-evenly items-center w-full h-18 md:h-21 text-4xl font-medium">
                <p>{weatherData.type}</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="weather img" width={100} />
              </div>
              <div className="temp-date-day w-screen h-56 md:h-36 flex flex-col justify-center items-center">
                <div className="temprature text-6xl text-center">
                  <span id='degree'><b>{weatherData.temp}</b></span>
                  <span><b>°</b></span>
                  <span id='FC'><b>C</b></span>
                </div>
                <div className="day-date text-center">
                  <span><b>{day}</b></span>
                  <span><b> | </b></span>
                  <span><b>{`${date} ${month} ${year}`}</b></span>
                </div>
                <div className="City-Name h-12 flex justify-center items-end text-3xl">
                  <p className='place'><b>{weatherData.location}</b></p>
                  <img className='m-0 p-0' src={`https://flagsapi.com/${weatherData.country}/flat/32.png`} />
                </div>
              </div>
              <div className="info flex flex-col justify-evenly items-center md:flex-row w-full h-fit">
                <div className="info-weather h-20 md:h-76 w-full md:w-3/12 flex flex-wrap justify-center items-center gap-2 md:gap-1">
                  <div className="Air h-4/5 md:h-2/6 w-[23%] rounded-2xl md:w-2/5 text-center flex flex-col justify-center items-center bg-black/25">
                    <p className='text-xs md:text-lg font-black font-sans'><b>FEELS LIKE</b></p>
                    <p className='text-xs md:text-lg'>{weatherData.feels}<span>°</span></p>
                  </div>

                  <div className="Wind h-4/5 md:h-2/6 w-[23%] rounded-2xl md:w-2/5 text-center flex flex-col justify-center items-center bg-black/25">
                    <p className='text-xs md:text-lg font-black font-sans'><b>WIND SPEED</b></p>
                    <p className='text-xs md:text-lg'>{weatherData.speed} <span>km/hr</span></p>
                  </div>

                  <div className="Humidity h-4/5 md:h-2/6 w-[23%] rounded-2xl md:w-2/5 text-center flex flex-col justify-center items-center bg-black/25">
                    <p className='text-xs md:text-lg font-black font-sans'><b>HUMIDITY</b></p>
                    <p className='text-xs md:text-lg'>{weatherData.humidity}<span>%</span></p>
                  </div>

                  <div className="AP h-4/5 md:h-2/6 w-[23%] rounded-2xl md:w-2/5 text-center flex flex-col justify-center items-center bg-black/25">
                    <p className='text-xs md:text-lg font-black font-sans'><b>AIR PRESSURE</b></p>
                    <p className='text-xs md:text-lg'>{weatherData.pressure} <span>hPa</span></p>
                  </div>
                </div>
                <div className="graph h-80 md:h-72 w-11/12 md:w-3/5 bg-black/30 rounded-xl p-4">
                  <h2 className="text-white font-semibold text-center text-lg mb-2">Hourly Forecast</h2>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                      <XAxis dataKey="time" stroke="#ccc" />
                      <YAxis yAxisId="left" stroke="#ff6347" />
                      <YAxis yAxisId="right" orientation="right" stroke="#1e90ff" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#ff6347" strokeWidth={2} name="Temp (°C)" />
                      <Line yAxisId="right" type="monotone" dataKey="wind" stroke="#1e90ff" strokeWidth={2} name="Wind (km/h)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default App
