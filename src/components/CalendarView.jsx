import React, { useState, useMemo } from 'react'
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
            onDeleteTask={onDeleteTask}
          />
        )
      case 'semana':
        return (
          <WeekView 
            selectedDate={localDate}
            tasks={tasks}
            onEditTask={onEditTask}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        )
      case 'mes':
        return (
          <MonthView 
            selectedDate={localDate}
            tasks={tasks}
            onEditTask={onEditTask}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        )
      case 'estadísticas':
        return <Statistics tasks={tasks} />
      default:
        return <MonthView selectedDate={localDate} tasks={tasks} onEditTask={onEditTask} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} />
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Calendar Content */}
      <div className="flex-1 overflow-hidden">
        <div
          key={`${currentView}-${localDate.getTime()}`}
          className="h-full"
        >
          {renderView()}
        </div>
      </div>
    </div>
  )
}

export default CalendarView
