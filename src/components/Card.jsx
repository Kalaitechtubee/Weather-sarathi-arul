import { useContext } from 'react'
import AppContext from '../context/AppContext'

const Card = ({ children }) => {
  const { theme } = useContext(AppContext)
  
  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className={`
        rounded-3xl min-h-96 w-full
        bg-white dark:bg-gray-900
        backdrop-blur-xl bg-opacity-80 dark:bg-opacity-80
        border border-gray-200 dark:border-gray-800
        shadow-[0_8px_32px_rgba(31,38,135,0.12)]
        dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        p-6 xl:p-10
        hover:shadow-[0_12px_40px_rgba(31,38,135,0.2)]
        dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
        transition-all duration-300
        relative overflow-hidden
      `}>
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-20 h-20">
          <div className="
            absolute top-0 right-0 w-12 h-12
            bg-gradient-to-br from-blue-400/20 to-purple-400/20
            dark:from-blue-600/20 dark:to-purple-600/20
            rounded-bl-full
          " />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card