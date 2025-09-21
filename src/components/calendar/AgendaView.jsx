import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Check, Circle, Edit, Trash2, Clock } from 'lucide-react'

const AgendaView = ({ selectedDate, tasks, onEditTask, onToggleTask, onDeleteTask }) => {
  const { groupedTasks, currentMonthTasks } = useMemo(() => {
    // Filtrar tareas del mes actual y siguientes
    const currentMonth = selectedDate.getMonth()
    const currentYear = selectedDate.getFullYear()
    
    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date)
      return taskDate >= new Date(currentYear, currentMonth, 1)
    }).sort((a, b) => new Date(a.date) - new Date(b.date))

    // Agrupar tareas por mes
    const grouped = filteredTasks.reduce((acc, task) => {
      const taskDate = new Date(task.date)
      const monthKey = `${taskDate.getFullYear()}-${taskDate.getMonth()}`
      
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: taskDate.getMonth(),
          year: taskDate.getFullYear(),
          tasks: []
        }
      }
      acc[monthKey].tasks.push(task)
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
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    return `${months[month]} ${year}`
  }

  const formatTaskDate = (dateStr) => {
    const date = new Date(dateStr)
    const days = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB']
    const dayName = days[date.getDay()]
    const dayNumber = date.getDate()
    return { dayName, dayNumber }
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr.substring(0, 5) // HH:MM
  }

  if (currentMonthTasks.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Circle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay tareas programadas</h3>
          <p className="text-gray-500">Toca el botón + para agregar una nueva tarea</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {groupedTasks.map((group) => (
          <motion.div
            key={`${group.year}-${group.month}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Month Header */}
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-semibold text-gray-900">
                {formatMonthYear(group.month, group.year)}
              </h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Tasks for this month */}
            <div className="space-y-3">
              {group.tasks.map((task) => {
                const { dayName, dayNumber } = formatTaskDate(task.date)
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
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
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default AgendaView
