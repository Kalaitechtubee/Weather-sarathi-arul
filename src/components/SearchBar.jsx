import React, { useContext, useEffect, useId, useState } from 'react'
import { v4 as uuid } from 'uuid';
import { Select, Spin, ConfigProvider } from 'antd'
import debounce from 'lodash/debounce';
import AppContext from '../context/AppContext'
import { geocode, reverseGeocode } from '../api/geoCoding'
import useWindowSize from '../hooks/useWindowSize';
import { IoLocation } from "react-icons/io5";

const SearchBar = () => {
  const { location, setLocation, theme } = useContext(AppContext);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isMobile } = useWindowSize();
  const { Option } = Select;

  const searchWithDebounce = debounce(async (text) => {
    if (text?.length > 3) {
      setLoading(true);
      const res = await geocode(text);
      setOptions(res);
      setLoading(false);
    } else {
      setOptions([]);
    }
  }, 700);

  const selectHandler = (value) => {
    const obj = JSON.parse(value);
    setLocation(obj);
    localStorage.setItem('location', value);
  }

  const fetchCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (currLocation) => {
        const lat = currLocation.coords.latitude;
        const lon = currLocation.coords.longitude;
        try {
          const res = await reverseGeocode(lat, lon);
          if (res) {
            setLocation(res);
            localStorage.setItem('location', JSON.stringify(res));
          }
        } catch (error) {
          console.log('Error!');
        }
      });
    } else {
      console.log('Geolocation not available');
    }
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            optionSelectedBg: `${theme === 'dark' ? '#4f46e5' : '#e0e7ff'}`,
            optionActiveBg: `${theme === 'dark' ? '#3730a3' : '#f1f5f9'}`,
            selectorBg: 'transparent',
          }
        },
        token: {
          colorText: `${theme === 'dark' ? '#e2e8f0' : '#1f2937'}`,
          colorTextPlaceholder: `${theme === 'dark' ? '#64748b' : '#6b7280'}`,
          colorPrimary: '#4f46e5',
          colorPrimaryHover: '#6366f1',
          controlHeight: 44,
          borderRadius: 12,
          boxShadow: 'none',
          colorBgContainer: `${theme === 'dark' ? '#1e293b' : '#ffffff'}`,
          colorBgElevated: `${theme === 'dark' ? '#334155' : '#ffffff'}`,
        }
      }}
    >
      <div className={`
        relative flex items-center
        w-full max-w-lg
        ${theme === 'dark' ? 'dark' : ''}
      `}>
        <div className={`
          absolute inset-0
          bg-gradient-to-r from-indigo-500/10 to-purple-500/10
          rounded-xl
          blur-xl
          -z-10
        `} />
        
        <Select
          showSearch
          placeholder="Search location..."
          notFoundContent={loading ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={searchWithDebounce}
          onSelect={selectHandler}
          className="w-full"
          dropdownClassName="rounded-lg shadow-lg"
          suffixIcon={
            <IoLocation className={`
              text-indigo-500
              ${loading ? 'animate-pulse' : ''}
            `} size={20} />
          }
          styles={{
            control: {
              border: 'none',
              background: 'transparent',
              boxShadow: 'none',
            }
          }}
        >
          {options.map((option) => (
            <Option 
              key={uuid()} 
              value={JSON.stringify(option.value)}
              className="hover:bg-indigo-50 dark:hover:bg-indigo-900/50"
            >
              <div className="flex items-center gap-2">
                <IoLocation className="text-indigo-400" size={16} />
                <span>{option.label}</span>
              </div>
            </Option>
          ))}
        </Select>

        <button
          onClick={fetchCurrentLocation}
          className={`
            ml-2 p-2.5
            bg-gradient-to-r from-indigo-500 to-purple-500
            hover:from-indigo-600 hover:to-purple-600
            rounded-xl
            text-white
            transition-all duration-200
            hover:shadow-lg
            focus:ring-2 focus:ring-indigo-500/50
          `}
        >
          <IoLocation size={20} />
        </button>
      </div>
    </ConfigProvider>
  )
}

export default SearchBar;