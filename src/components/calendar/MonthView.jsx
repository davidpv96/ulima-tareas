import React, { useMemo } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'

const MonthView = ({ selectedDate, tasks, onEditTask, onToggleTask, onDeleteTask, onDateChange, onViewChange }) => {
  const { calendarDays, monthName, year } = useMemo(() => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    
    // Primer día del mes y último día del mes
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    // Primer día de la semana del primer día del mes (domingo = 0)
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - firstDay.getDay())
    
    // Último día de la semana del último día del mes
    const endDate = new Date(lastDay)
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()))
    
    const days = []
    const currentDate = new Date(startDate)
    
    while (currentDate <= endDate) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    
    return {
      calendarDays: days,
      monthName: months[month],
      year
    }
  }, [selectedDate])

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return tasks.filter(task => task.date === dateStr)
  }

  const getSphereColor = (sphere) => {
    const colors = {
      'personal': 'bg-gray-200',
      'grow': 'bg-green-200',
      'thrive': 'bg-orange-200',
      'connect': 'bg-blue-200',
      'create': 'bg-purple-200',
      'universidad': 'bg-orange-200',
      'familia': 'bg-blue-200',
      'trabajo': 'bg-gray-200',
      'pareja': 'bg-pink-200',
      'gym': 'bg-green-200',
      'bienestar': 'bg-gray-200',
      'deporte': 'bg-blue-200',
      'viajes': 'bg-orange-200',
      'social': 'bg-orange-200'
    }
    return colors[sphere] || 'bg-gray-200'
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date) => {
    return date.getMonth() === selectedDate.getMonth()
  }

  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr.substring(0, 5) // HH:MM
  }

  return (
    <div className="h-full flex flex-col">
      {/* Week days header */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {weekDays.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6 border-r border-b border-gray-200">
        {calendarDays.map((date, index) => {
          const dayTasks = getTasksForDate(date)
          const isCurrentMonthDay = isCurrentMonth(date)
          const isTodayDate = isToday(date)
          
          return (
            <div
              key={index}
              className={`
                min-h-[100px] border-l border-t border-gray-200 p-2 cursor-pointer
                hover:bg-gray-50 transition-colors
                ${!isCurrentMonthDay ? 'bg-gray-50 text-gray-400' : 'bg-white'}
                ${isTodayDate ? 'bg-soft-blue/10' : ''}
              `}
              onClick={() => {
                // Navegar a vista de día para esta fecha
                onDateChange(date)
                onViewChange('día')
              }}
            >
              {/* Date number */}
              <div className="flex items-center justify-between mb-1">
                <span className={`
                  text-sm font-medium
                  ${isTodayDate ? 'bg-soft-blue text-white rounded-full w-6 h-6 flex items-center justify-center' : ''}
                  ${!isCurrentMonthDay ? 'text-gray-400' : 'text-gray-900'}
                `}>
                  {date.getDate()}
                </span>
              </div>

              {/* Tasks */}
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className={`
                      text-xs p-1 rounded truncate border-l-2 cursor-pointer
                      ${getSphereColor(task.sphere)}
                      ${task.completed ? 'opacity-60 line-through' : ''}
                      hover:opacity-80 transition-opacity
                    `}
                    onClick={(e) => {
                      e.stopPropagation()
                      // Navegar a vista de día para esta fecha
                      onDateChange(date)
                      onViewChange('día')
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1 truncate">
                        {task.title}
                      </span>
                      
                      {/* Time Display */}
                      {task.startTime && task.endTime && (
                        <div className="flex items-center space-x-1 text-xs text-gray-500 ml-1">
                          <Clock className="w-2 h-2" />
                          <span className="text-xs">{formatTime(task.startTime)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayTasks.length - 3} más
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MonthView
