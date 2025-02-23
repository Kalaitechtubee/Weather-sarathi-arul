import { useState, useContext, useLayoutEffect } from 'react';
import { Spin } from 'antd';
import { getWeather, getForecast } from './api/openWeather';
import moment from 'moment-timezone';
import AppContext from './context/AppContext';
import Card from './components/Card';
import Header from './components/Header';

import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange, MdOutlineAccessTime } from "react-icons/md";
import { FiSunset, FiSunrise, FiBarChart2 } from "react-icons/fi";
import { FaTemperatureEmpty, FaDroplet } from "react-icons/fa6";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaWind, FaCloud, FaGithub } from "react-icons/fa";

import useWindowSize from './hooks/useWindowSize';

const ExtraInfo = ({ icon, name, value, unit, theme }) => {
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className='rounded-lg w-full px-4 py-3 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-700 dark:text-gray-200 flex items-center gap-3'>
        <div className="text-indigo-500 dark:text-indigo-400">{icon}</div>
        <div className='flex items-center justify-between w-full'>
          <span className="font-medium">{name}</span>
          <span className="font-semibold">{`${value} ${unit}`}</span>
        </div>
      </div>
    </div>
  );
};

const ForecastCard = ({ date, minTemp, maxTemp, unit, icon, theme }) => {
  const timeZone = moment.tz.guess();
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className='rounded-lg h-full w-48 p-4 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center gap-3'>
        <div className='text-sm font-medium text-gray-600 dark:text-gray-300'>
          {moment.unix(date).tz(timeZone).format('MMM DD, hh:mm a')}
        </div>
        <img 
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
          alt="weather icon" 
          className="h-20 w-20 object-contain"
        />
        <div className='flex flex-col items-center gap-1'>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-500 dark:text-gray-400'>Min</span>
            <span className='font-semibold'>{`${minTemp} °${unit}`}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-gray-500 dark:text-gray-400'>Max</span>
            <span className='font-semibold'>{`${maxTemp} °${unit}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { location, unit, theme } = useContext(AppContext);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const timeZone = moment.tz.guess();
  const { isMobile, isTablet, isDesktop } = useWindowSize();

  useLayoutEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const weather = await getWeather(location, unit);
        setWeatherData(weather);
        const forecast = await getForecast(location, unit);
        setForecast(forecast);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [location, unit]);

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300'>
        <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <Header />
          <Card>
            {(!loading && weatherData && forecast?.list?.length > 0) ? (
              <div className='space-y-6'>
                {/* Location Header */}
                {isDesktop && (
                  <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl md:text-3xl font-bold flex items-center gap-2'>
                      <HiOutlineLocationMarker className="text-indigo-500" />
                      {location?.address}
                    </h1>
                    <div className='text-gray-500 dark:text-gray-400 flex gap-4'>
                      <span className='flex items-center gap-1'>
                        <MdOutlineDateRange />
                        {moment.unix(weatherData?.dt).tz(timeZone).format('MMM DD, YYYY')}
                      </span>
                      <span className='flex items-center gap-1'>
                        <MdOutlineAccessTime />
                        {moment.unix(weatherData?.dt).tz(timeZone).format('hh:mm a')}
                      </span>
                    </div>
                  </div>
                )}

                {/* Main Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                  {/* Mobile Location Card */}
                  {!isDesktop && (
                    <div className='rounded-lg bg-white dark:bg-gray-800 shadow-md p-6'>
                      <div className='flex flex-col items-center gap-4'>
                        <div className='flex items-center gap-2'>
                          <HiOutlineLocationMarker className="text-indigo-500" size={24} />
                          <div>
                            <h2 className='text-xl font-semibold'>{location?.address?.split(', ')[0]}</h2>
                            <p className='text-gray-500 dark:text-gray-400'>
                              {`${location?.address?.split(', ')[1]}, ${location?.address?.split(', ')[2]}`}
                            </p>
                          </div>
                        </div>
                        <div className='text-gray-500 dark:text-gray-400 flex gap-3 text-sm'>
                          <span className='flex items-center gap-1'>
                            <MdOutlineDateRange />
                            {moment.unix(weatherData?.dt).tz(timeZone).format('MMM DD, YYYY')}
                          </span>
                          <span className='flex items-center gap-1'>
                            <MdOutlineAccessTime />
                            {moment.unix(weatherData?.dt).tz(timeZone).format('hh:mm a')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Weather Card */}
                  <div className='rounded-lg bg-white dark:bg-gray-800 shadow-md p-6 relative overflow-hidden'>
                    <div className='flex flex-col justify-between h-full'>
                      <div className='flex items-center justify-between'>
                        <div className='text-3xl font-bold flex items-center gap-2'>
                          <FaTemperatureEmpty className="text-indigo-500" />
                          {`${weatherData?.main?.temp} °${unit}`}
                        </div>
                        <div className='text-sm text-gray-500 dark:text-gray-400 space-y-1'>
                          <p>Low: <span className='font-semibold'>{`${weatherData?.main?.temp_min} °${unit}`}</span></p>
                          <p>High: <span className='font-semibold'>{`${weatherData?.main?.temp_max} °${unit}`}</span></p>
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <p className='font-medium'>{weatherData?.weather[0]?.main}</p>
                          <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Feels Like: <span className='font-semibold'>{`${weatherData?.main?.feels_like} °${unit}`}</span>
                          </p>
                        </div>
                        <img 
                          src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`} 
                          alt="weather icon" 
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sunrise/Sunset Card */}
                  <div className='rounded-lg bg-white dark:bg-gray-800 shadow-md p-6 flex items-center justify-between'>
                    <div className='flex flex-col items-center text-center'>
                      <FiSunrise className="text-indigo-500" size={32} />
                      <span className='text-lg font-medium mt-2'>Sunrise</span>
                      <span className='text-gray-600 dark:text-gray-300'>
                        {moment.unix(weatherData?.sys?.sunrise).tz(timeZone).format('hh:mm a')}
                      </span>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                      <FiSunset className="text-indigo-500" size={32} />
                      <span className='text-lg font-medium mt-2'>Sunset</span>
                      <span className='text-gray-600 dark:text-gray-300'>
                        {moment.unix(weatherData?.sys?.sunset).tz(timeZone).format('hh:mm a')}
                      </span>
                    </div>
                  </div>

                  {/* Extra Info Card */}
                  <div className='rounded-lg bg-white dark:bg-gray-800 shadow-md p-6 grid grid-cols-2 gap-4'>
                    <ExtraInfo icon={<FaDroplet size={20} />} name='Humidity' value={weatherData?.main?.humidity} unit='%' theme={theme} />
                    <ExtraInfo icon={<FaCloud size={20} />} name='Clouds' value={weatherData?.clouds?.all} unit='%' theme={theme} />
                    <ExtraInfo icon={<FiBarChart2 size={20} />} name='Pressure' value={weatherData?.main?.pressure} unit='hPa' theme={theme} />
                    <ExtraInfo icon={<AiFillEyeInvisible size={20} />} name='Visibility' value={weatherData?.visibility} unit='m' theme={theme} />
                    <ExtraInfo icon={<FaWind size={20} />} name='Wind' value={weatherData?.wind?.speed} unit='m/s' theme={theme} />
                  </div>

                  {/* Forecast Card */}
                  <div className='rounded-lg bg-white dark:bg-gray-800 shadow-md p-6 md:col-span-2 xl:col-span-3'>
                    <div className='flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'>
                      {forecast?.list?.map(item => (
                        <ForecastCard 
                          key={item?.dt} 
                          date={item?.dt} 
                          minTemp={item?.main?.temp_min} 
                          maxTemp={item?.main?.temp_max} 
                          unit={unit} 
                          icon={item?.weather[0]?.icon} 
                          theme={theme}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              loading ? (
                <div className='flex items-center justify-center h-[50vh]'><Spin size='large' /></div>
              ) : (
                <div className='flex items-center justify-center h-[50vh] text-gray-500 dark:text-gray-400'>
                  Unable to fetch location info...
                </div>
              )
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
