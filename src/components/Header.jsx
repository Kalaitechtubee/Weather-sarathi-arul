import { useContext, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { TiWeatherCloudy } from "react-icons/ti";
import AppContext from '../context/AppContext';
import SearchBar from './SearchBar';
import CustomSwitch from './CustomSwitch';

const Header = () => {
  const { theme, setTheme, unit, setUnit } = useContext(AppContext);
  const { isMobile } = useWindowSize();
  const [modalOpen, setModalOpen] = useState(false);

  const linkRedirect = (link) => {
    window.open(link, '_blank');
  };

  return (
    <header className={`w-full ${theme === 'dark' ? 'dark' : ''}`}>
      <div className={`
        container mx-auto px-4 py-4
        ${isMobile 
          ? 'flex flex-col gap-6' 
          : 'flex items-center justify-between'}
      `}>
        {/* Logo Section */}
        <div 
          className={`
            group flex items-center gap-2
            bg-white dark:bg-gray-800
            rounded-full p-2 pr-4
            shadow-md hover:shadow-xl
            transform hover:-translate-y-1
            transition-all duration-300
            cursor-pointer
          `}
          onClick={() => setModalOpen(true)}
        >
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
            <TiWeatherCloudy className="text-blue-600 dark:text-blue-300" size={32} />
          </div>
          <span className={`
            text-xl font-semibold
            bg-gradient-to-r from-blue-600 to-indigo-600
            bg-clip-text text-transparent
            group-hover:from-blue-500 group-hover:to-indigo-500
            transition-all duration-300
          `}>
            Weather
          </span>
        </div>

        {/* Controls Section */}
        <div className={`
          flex ${isMobile ? 'flex-col w-full gap-4' : 'flex-row items-center gap-6'}
          ${isMobile ? '' : 'w-auto'}
        `}>
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
          <div className={`
            flex items-center gap-4
            bg-white dark:bg-gray-800
            rounded-full p-2
            shadow-md
          `}>
            <CustomSwitch 
              currOption={unit} 
              setOption={setUnit} 
              options={['C', 'F']} 
            />
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
            <CustomSwitch 
              currOption={theme} 
              setOption={setTheme} 
              options={['dark', 'light']} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;