import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Menu, 
  Search, 
  Calendar, 
  ChevronDown,
  User,
  LogOut,
  Settings
} from 'lucide-react'

const Header = ({ 
  onMenuClick, 
  currentView, 
  onViewChange, 
  selectedDate, 
  onDateChange,
  tasks,
  onSearchClick
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const formatDate = (date) => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    return `${months[date.getMonth()]} ${date.getFullYear()}`
  }

  const getTodayButton = () => {
    const today = new Date()
    const isToday = selectedDate.toDateString() === today.toDateString()
    return today.getDate()
  }

  const handleTodayClick = () => {
    onDateChange(new Date())
  }

  const handleSearchClick = () => {
    onSearchClick()
  }

  const handleLogout = () => {
    // Implementar logout
    console.log('Logout')
    setShowUserMenu(false)
  }

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="flex items-center justify-between px-2 md:px-4 py-3">
        {/* Left side - Menu and Date */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center space-x-1 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900 text-sm md:text-base">
                {formatDate(selectedDate)}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {showDatePicker && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
              >
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 mb-2">Seleccionar vista</h3>
                  {['agenda', 'día', 'semana', 'mes'].map((view) => (
                    <button
                      key={view}
                      onClick={() => {
                        onViewChange(view)
                        setShowDatePicker(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        currentView === view 
                          ? 'bg-soft-blue text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {view.charAt(0).toUpperCase() + view.slice(1)}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 flex justify-center md:justify-start md:max-w-md md:mx-4">
          <button
            onClick={handleSearchClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:w-full md:flex md:items-center md:space-x-3 md:px-4 md:py-2 md:bg-gray-50 md:border md:border-gray-200 md:hover:bg-gray-100"
          >
            <Search className="w-5 h-5 text-gray-600 md:w-4 md:h-4 md:text-gray-400" />
            <span className="text-gray-500 hidden md:inline">Buscar tareas...</span>
          </button>
        </div>

        {/* Right side - Today button and User menu */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <button
            onClick={handleTodayClick}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span className="font-medium text-sm md:text-base">{getTodayButton()}</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
            
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Usuario</p>
                  <p className="text-xs text-gray-500">usuario@ejemplo.com</p>
                </div>
                <button
                  onClick={() => setShowUserMenu(false)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Ajustes</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
