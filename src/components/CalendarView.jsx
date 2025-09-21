import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AgendaView from './calendar/AgendaView'
import DayView from './calendar/DayView'
import WeekView from './calendar/WeekView'
import MonthView from './calendar/MonthView'
import Statistics from './Statistics'

const CalendarView = ({ 
  currentView, 
  selectedDate, 
  onDateChange, 
  tasks, 
  onEditTask, 
  onToggleTask,
  onDeleteTask
}) => {
  const [localDate, setLocalDate] = useState(selectedDate)

  // Actualizar fecha local cuando cambie la fecha seleccionada
  React.useEffect(() => {
    setLocalDate(selectedDate)
  }, [selectedDate])

  const navigateDate = (direction) => {
    const newDate = new Date(localDate)
    
    switch (currentView) {
      case 'día':
        newDate.setDate(newDate.getDate() + direction)
        break
      case 'semana':
        newDate.setDate(newDate.getDate() + (direction * 7))
        break
      case 'mes':
        newDate.setMonth(newDate.getMonth() + direction)
        break
      case 'agenda':
        // Para agenda, navegar por semanas
        newDate.setDate(newDate.getDate() + (direction * 7))
        break
      default:
        break
    }
    
    setLocalDate(newDate)
    onDateChange(newDate)
  }

  const goToToday = () => {
    const today = new Date()
    setLocalDate(today)
    onDateChange(today)
  }

  const formatDateHeader = () => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    const days = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ]

    switch (currentView) {
      case 'día':
        return `${days[localDate.getDay()]} ${localDate.getDate()} de ${months[localDate.getMonth()]} ${localDate.getFullYear()}`
      case 'semana':
        const startOfWeek = new Date(localDate)
        startOfWeek.setDate(localDate.getDate() - localDate.getDay())
        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 6)
        
        if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
          return `${startOfWeek.getDate()} - ${endOfWeek.getDate()} de ${months[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`
        } else {
          return `${startOfWeek.getDate()} de ${months[startOfWeek.getMonth()]} - ${endOfWeek.getDate()} de ${months[endOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`
        }
      case 'mes':
        return `${months[localDate.getMonth()]} ${localDate.getFullYear()}`
      case 'agenda':
        return 'Agenda'
      case 'estadísticas':
        return 'Estadísticas'
      default:
        return ''
    }
  }

  const renderView = () => {
    switch (currentView) {
      case 'agenda':
        return (
          <AgendaView 
            selectedDate={localDate}
            tasks={tasks}
            onEditTask={onEditTask}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        )
      case 'día':
        return (
          <DayView 
            selectedDate={localDate}
            tasks={tasks}
            onEditTask={onEditTask}
            onToggleTask={onToggleTask}
          />
        )
      case 'semana':
        return (
          <WeekView 
            selectedDate={localDate}
            tasks={tasks}
            onEditTask={onEditTask}
            onToggleTask={onToggleTask}
          />
        )
      case 'mes':
        return (
          <MonthView 
            selectedDate={localDate}
            tasks={tasks}
            onEditTask={onEditTask}
            onToggleTask={onToggleTask}
          />
        )
      case 'estadísticas':
        return <Statistics tasks={tasks} />
      default:
        return <MonthView selectedDate={localDate} tasks={tasks} onEditTask={onEditTask} onToggleTask={onToggleTask} />
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Navigation Header */}
      {currentView !== 'estadísticas' && (
        <div className="flex items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateDate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={() => navigateDate(1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {formatDateHeader()}
          </h2>
        </div>

        <button
          onClick={goToToday}
          className="px-4 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors font-medium"
        >
          Hoy
        </button>
      </div>
      )}

      {/* Calendar Content */}
      <div className="flex-1 overflow-hidden">
        <motion.div
          key={`${currentView}-${localDate.getTime()}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          className="h-full"
        >
          {renderView()}
        </motion.div>
      </div>
    </div>
  )
}

export default CalendarView
