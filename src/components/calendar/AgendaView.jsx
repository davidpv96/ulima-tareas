import React, { useMemo, useState, useEffect } from 'react'
import { Check, Circle, Edit, Trash2, Clock } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { formatDateToString } from '../../utils/dateUtils'

const AgendaView = ({ selectedDate, tasks, onEditTask, onToggleTask, onDeleteTask }) => {
  const { t } = useLanguage()
  const [currentTime, setCurrentTime] = useState(new Date())

  // Actualizar tiempo cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000) // Cada minuto

    return () => clearInterval(timer)
  }, [])

  const { groupedTasks, currentMonthTasks } = useMemo(() => {
    // Filtrar tareas del mes actual y siguientes
    const currentMonth = selectedDate.getMonth()
    const currentYear = selectedDate.getFullYear()
    
    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date)
      return taskDate >= new Date(currentYear, currentMonth, 1)
    }).sort((a, b) => {
      // Ordenar por fecha y luego por hora
      const dateCompare = new Date(a.date) - new Date(b.date)
      if (dateCompare !== 0) return dateCompare
      
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime)
      }
      return 0
    })

    // Agrupar tareas por día
    const grouped = filteredTasks.reduce((acc, task) => {
      const taskDate = new Date(task.date)
      const dayKey = formatDateToString(taskDate)
      
      if (!acc[dayKey]) {
        acc[dayKey] = {
          date: taskDate,
          tasks: []
        }
      }
      acc[dayKey].tasks.push(task)
      return acc
    }, {})

    return {
      groupedTasks: Object.values(grouped),
      currentMonthTasks: filteredTasks
    }
  }, [tasks, selectedDate])

  const getSphereColor = (sphere) => {
    const colors = {
      'personal': 'bg-gray-100 text-gray-800',
      'grow': 'bg-light-green text-green-800',
      'thrive': 'bg-soft-orange text-orange-800',
      'connect': 'bg-soft-blue text-blue-800',
      'create': 'bg-pastel-lilac text-purple-800',
      'universidad': 'bg-soft-orange text-orange-800',
      'familia': 'bg-soft-blue text-blue-800',
      'trabajo': 'bg-gray-100 text-gray-800',
      'pareja': 'bg-soft-pink text-pink-800',
      'gym': 'bg-light-green text-green-800',
      'bienestar': 'bg-gray-100 text-gray-800',
      'deporte': 'bg-soft-blue text-blue-800',
      'viajes': 'bg-soft-orange text-orange-800',
      'social': 'bg-soft-orange text-orange-800'
    }
    return colors[sphere] || 'bg-gray-100 text-gray-800'
  }

  const formatMonthYear = (month, year) => {
    const months = [
      t('months.january'), t('months.february'), t('months.march'), t('months.april'), 
      t('months.may'), t('months.june'), t('months.july'), t('months.august'), 
      t('months.september'), t('months.october'), t('months.november'), t('months.december')
    ]
    return `${months[month]} ${year}`
  }

  const formatTaskDate = (dateStr) => {
    // Crear fecha sin problemas de zona horaria
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day) // month - 1 porque los meses van de 0-11
    const days = [
      t('days.sun').toUpperCase(), t('days.mon').toUpperCase(), t('days.tue').toUpperCase(), 
      t('days.wed').toUpperCase(), t('days.thu').toUpperCase(), t('days.fri').toUpperCase(), 
      t('days.sat').toUpperCase()
    ]
    const dayName = days[date.getDay()]
    const dayNumber = date.getDate()
    return { dayName, dayNumber }
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr.substring(0, 5) // HH:MM
  }

  const getTimeUntilTask = (taskDate, startTime) => {
    if (!startTime) return null
    
    const today = new Date()
    // Crear fecha sin problemas de zona horaria
    const [year, month, day] = taskDate.split('-').map(Number)
    const [hours, minutes] = startTime.split(':').map(Number)
    const taskDateTime = new Date(year, month - 1, day, hours, minutes)
    
    // Si la tarea ya pasó, no mostrar contador
    if (taskDateTime < today) return null
    
    const diffMs = taskDateTime - today
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (diffHours > 24) {
      const days = Math.floor(diffHours / 24)
      return `${t('tasks.inDays')} ${days} ${days > 1 ? t('tasks.days') : t('tasks.day')}`
    } else if (diffHours > 0) {
      return `${t('tasks.in')} ${diffHours}h ${diffMinutes}m`
    } else if (diffMinutes > 0) {
      return `${t('tasks.in')} ${diffMinutes} ${t('tasks.minutes')}`
    } else {
      return t('tasks.now')
    }
  }

  const formatDateHeader = (date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    // Comparar solo la fecha sin la hora
    const todayStr = formatDateToString(today)
    const tomorrowStr = formatDateToString(tomorrow)
    const dateStr = formatDateToString(date)
    
    if (dateStr === todayStr) {
      return t('app.today')
    } else if (dateStr === tomorrowStr) {
      return t('app.tomorrow')
    } else {
      const monthName = t(`months.${['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'][date.getMonth()]}`)
      return `${date.getDate()} de ${monthName}`
    }
  }

  if (currentMonthTasks.length === 0) {
    return (
      <div className="h-full flex items-start justify-center pt-16">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Circle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('tasks.noTasksToday')}</h3>
          <p className="text-gray-500">{t('tasks.addTaskMessage')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {groupedTasks.map((group) => (
          <div
            key={group.date.toISOString()}
            className="space-y-4"
          >
            {/* Day Header */}
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {formatDateHeader(group.date)}
              </h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Tasks for this day */}
            <div className="space-y-3">
              {group.tasks.map((task) => {
                const { dayName, dayNumber } = formatTaskDate(task.date)
                const timeUntil = getTimeUntilTask(task.date, task.startTime)
                
                return (
                  <div
                    key={task.id}
                    className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    {/* Date */}
                    <div className="flex-shrink-0 text-center">
                      <div className="text-xs font-medium text-gray-500 uppercase">
                        {dayName}
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {dayNumber}
                      </div>
                    </div>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <button
                              onClick={() => onToggleTask(task.id)}
                              className={`p-1 rounded-full transition-colors ${
                                task.completed 
                                  ? 'text-green-600 hover:text-green-700' 
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              {task.completed ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Circle className="w-4 h-4" />
                              )}
                            </button>
                            <h4 className={`font-medium ${
                              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                            }`}>
                              {task.title}
                            </h4>
                          </div>
                          
                          {task.description && (
                            <p className={`text-sm mb-2 ${
                              task.completed ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {task.description}
                            </p>
                          )}

                          {/* Time Display */}
                          {task.startTime && task.endTime && (
                            <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
                              <Clock className="w-3 h-3" />
                              <span>{formatTime(task.startTime)} - {formatTime(task.endTime)}</span>
                            </div>
                          )}

                          {/* Countdown Timer */}
                          {timeUntil && !task.completed && (
                            <div className="flex items-center space-x-1 text-xs text-soft-blue font-medium">
                              <Clock className="w-3 h-3" />
                              <span>{timeUntil}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Actions */}
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => onEditTask(task)}
                              className="p-1 rounded hover:bg-gray-100 transition-colors"
                              title="Editar"
                            >
                              <Edit className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              onClick={() => onDeleteTask(task.id)}
                              className="p-1 rounded hover:bg-red-100 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>

                          {/* Sphere Badge */}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSphereColor(task.sphere)}`}>
                            {task.sphere}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgendaView
