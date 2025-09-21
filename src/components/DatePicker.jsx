import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

const DatePicker = ({ selectedDate, onDateChange, currentView }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState(selectedDate)

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

  const formatDisplayDate = () => {
    const shortMonths = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ]
    
    switch (currentView) {
      case 'día':
        return `${selectedDate.getDate()} ${shortMonths[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
      case 'semana':
        const startOfWeek = new Date(selectedDate)
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        
        // Versión más compacta para móviles
        if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
          return `${startOfWeek.getDate()}-${endOfWeek.getDate()} ${shortMonths[startOfWeek.getMonth()]}`
        } else {
          return `${startOfWeek.getDate()} ${shortMonths[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} ${shortMonths[endOfWeek.getMonth()]}`
        }
      case 'mes':
        return `${shortMonths[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
      case 'agenda':
        return `${shortMonths[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
      default:
        return `${shortMonths[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    }
  }

  const handleMonthChange = (monthIndex) => {
    const newDate = new Date(tempDate)
    newDate.setMonth(monthIndex)
    setTempDate(newDate)
  }

  const handleYearChange = (year) => {
    const newDate = new Date(tempDate)
    newDate.setFullYear(year)
    setTempDate(newDate)
  }

  const handleApply = () => {
    onDateChange(tempDate)
    setIsOpen(false)
  }

  const handleCancel = () => {
    setTempDate(selectedDate)
    setIsOpen(false)
  }

  const goToToday = () => {
    const today = new Date()
    setTempDate(today)
    onDateChange(today)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => {
            const newDate = new Date(selectedDate)
            switch (currentView) {
              case 'día':
                newDate.setDate(newDate.getDate() - 1)
                break
              case 'semana':
                newDate.setDate(newDate.getDate() - 7)
                break
              case 'mes':
                newDate.setMonth(newDate.getMonth() - 1)
                break
              case 'agenda':
                newDate.setDate(newDate.getDate() - 7)
                break
            }
            onDateChange(newDate)
          }}
          className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Anterior"
        >
          <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
        </button>

        {/* Date picker button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-2 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="font-medium text-gray-900 text-xs md:text-sm whitespace-nowrap">
            {formatDisplayDate()}
          </span>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </button>

        {/* Next button */}
        <button
          onClick={() => {
            const newDate = new Date(selectedDate)
            switch (currentView) {
              case 'día':
                newDate.setDate(newDate.getDate() + 1)
                break
              case 'semana':
                newDate.setDate(newDate.getDate() + 7)
                break
              case 'mes':
                newDate.setMonth(newDate.getMonth() + 1)
                break
              case 'agenda':
                newDate.setDate(newDate.getDate() + 7)
                break
            }
            onDateChange(newDate)
          }}
          className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title="Siguiente"
        >
          <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-600" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Seleccionar fecha</h3>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-soft-blue text-white rounded-md hover:bg-blue-400 transition-colors"
            >
              Hoy
            </button>
          </div>

          {/* Month and Year Selectors */}
          <div className="p-4">
            {/* Year Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
              <div className="grid grid-cols-5 gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      tempDate.getFullYear() === year
                        ? 'bg-soft-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Month Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
              <div className="grid grid-cols-3 gap-2">
                {months.map((month, index) => (
                  <button
                    key={index}
                    onClick={() => handleMonthChange(index)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      tempDate.getMonth() === index
                        ? 'bg-soft-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Navegación rápida</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    const newDate = new Date(tempDate)
                    newDate.setMonth(newDate.getMonth() - 1)
                    setTempDate(newDate)
                  }}
                  className="flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Mes anterior</span>
                </button>
                <button
                  onClick={() => {
                    const newDate = new Date(tempDate)
                    newDate.setMonth(newDate.getMonth() + 1)
                    setTempDate(newDate)
                  }}
                  className="flex items-center justify-center space-x-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span>Mes siguiente</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-2 p-4 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 text-sm bg-soft-blue text-white rounded-md hover:bg-blue-400 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DatePicker
