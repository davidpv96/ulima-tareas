import React, { useMemo } from 'react'
import { Check, Circle, Edit, Trash2, Clock } from 'lucide-react'

const WeekView = ({ selectedDate, tasks, onEditTask, onToggleTask, onDeleteTask }) => {
  const { weekDays, weekTasks } = useMemo(() => {
    // Encontrar el primer día de la semana (domingo)
    const startOfWeek = new Date(selectedDate)
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay())
    
    // Generar los 7 días de la semana
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    
    // Obtener tareas para cada día de la semana
    const tasksByDay = {}
    days.forEach(day => {
      const dateStr = day.toISOString().split('T')[0]
      tasksByDay[dateStr] = tasks.filter(task => task.date === dateStr)
    })
    
    return {
      weekDays: days,
      weekTasks: tasksByDay
    }
  }, [selectedDate, tasks])

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

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr.substring(0, 5) // HH:MM
  }

  return (
    <div className="h-full flex flex-col bg-cream">
      {/* Week header */}
      <div className="grid grid-cols-7 bg-white border-b border-gray-200">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className={`
              p-3 text-center border-r border-gray-200 last:border-r-0
              ${isToday(day) ? 'bg-soft-blue text-white' : 'bg-gray-50'}
            `}
          >
            <div className="text-sm font-medium text-gray-500 mb-1">
              {dayNames[index]}
            </div>
            <div className={`text-lg font-bold ${
              isToday(day) ? 'text-white' : 'text-gray-900'
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Week content */}
      <div className="flex-1 grid grid-cols-7">
        {weekDays.map((day, index) => {
          const dateStr = day.toISOString().split('T')[0]
          const dayTasks = weekTasks[dateStr] || []
          
          return (
            <div
              key={index}
              className={`
                min-h-[400px] border-r border-gray-200 last:border-r-0 p-2
                ${isToday(day) ? 'bg-soft-blue/5' : 'bg-white'}
                hover:bg-gray-50 transition-colors
              `}
            >
              {/* Day content */}
              <div className="space-y-2">
                {dayTasks.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                      <Circle className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-400">Sin tareas</p>
                  </div>
                ) : (
                  dayTasks.map((task, taskIndex) => (
                    <div
                      key={task.id}
                      className={`
                        p-2 rounded-lg transition-all border-l-2
                        ${getSphereColor(task.sphere)}
                        ${task.completed ? 'opacity-60' : ''}
                        hover:shadow-sm cursor-pointer
                      `}
                      onClick={() => onEditTask(task)}
                    >
                      <div className="flex items-start space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onToggleTask(task.id)
                          }}
                          className={`mt-0.5 transition-colors ${
                            task.completed 
                              ? 'text-green-600 hover:text-green-700' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {task.completed ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Circle className="w-3 h-3" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`
                            text-xs font-medium truncate
                            ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}
                          `}>
                            {task.title}
                          </h4>
                          
                          {/* Time Display */}
                          {task.startTime && task.endTime && (
                            <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                              <Clock className="w-2 h-2" />
                              <span>{formatTime(task.startTime)}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onEditTask(task)
                            }}
                            className="p-0.5 rounded hover:bg-gray-100 transition-colors"
                            title="Editar"
                          >
                            <Edit className="w-3 h-3 text-gray-500" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onDeleteTask(task.id)
                            }}
                            className="p-0.5 rounded hover:bg-red-100 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Week summary */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">
                {weekDays.reduce((acc, day) => {
                  const dateStr = day.toISOString().split('T')[0]
                  return acc + (weekTasks[dateStr]?.filter(t => t.completed).length || 0)
                }, 0)} completadas esta semana
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-gray-600">
                {weekDays.reduce((acc, day) => {
                  const dateStr = day.toISOString().split('T')[0]
                  return acc + (weekTasks[dateStr]?.filter(t => !t.completed).length || 0)
                }, 0)} pendientes
              </span>
            </div>
          </div>
          
          <div className="text-gray-500">
            {weekDays.reduce((acc, day) => {
              const dateStr = day.toISOString().split('T')[0]
              return acc + (weekTasks[dateStr]?.length || 0)
            }, 0)} tareas totales
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeekView
