import React, { useMemo } from 'react'
import { Circle } from 'lucide-react'

const WeekView = ({ selectedDate, tasks, onEditTask, onToggleTask, onDeleteTask, onDateChange, onViewChange }) => {
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

  // Generar horas del día (6 AM a 11 PM)
  const generateTimeSlots = () => {
    const hours = []
    for (let i = 6; i <= 23; i++) {
      hours.push(i)
    }
    return hours
  }

  const timeSlots = generateTimeSlots()

  // Función para obtener tareas en un horario específico
  const getTasksAtTime = (day, hour) => {
    const dateStr = day.toISOString().split('T')[0]
    const dayTasks = weekTasks[dateStr] || []
    return dayTasks.filter(task => {
      if (!task.startTime) return false
      const taskHour = parseInt(task.startTime.split(':')[0])
      return taskHour === hour
    })
  }

  // Función para obtener tareas sin horario
  const getTasksWithoutTime = (day) => {
    const dateStr = day.toISOString().split('T')[0]
    const dayTasks = weekTasks[dateStr] || []
    return dayTasks.filter(task => !task.startTime)
  }

  return (
    <div className="h-full flex flex-col bg-cream">
      {/* Week header */}
      <div className="grid grid-cols-8 bg-white border-b border-gray-200">
        {/* Time column header */}
        <div className="p-3 text-center border-r border-gray-200 bg-gray-100">
          <div className="text-sm font-medium text-gray-600">Hora</div>
        </div>
        
        {/* Day headers */}
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

      {/* Week content with time slots */}
      <div className="flex-1 grid grid-cols-8">
        {/* Time column */}
        <div className="border-r border-gray-200 bg-gray-50">
          {timeSlots.map((hour) => (
            <div key={hour} className="h-12 border-b border-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-500 font-medium">
                {hour.toString().padStart(2, '0')}:00
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        {weekDays.map((day, index) => (
          <div key={index} className="border-r border-gray-200 last:border-r-0">
            {/* Time slots */}
            {timeSlots.map((hour) => {
              const tasksAtTime = getTasksAtTime(day, hour)
              
              return (
                <div key={hour} className="h-12 border-b border-gray-200 p-1">
                  {tasksAtTime.map((task) => (
                    <div
                      key={task.id}
                      className={`
                        w-full h-full rounded transition-all border-l-2
                        ${getSphereColor(task.sphere)}
                        ${task.completed ? 'opacity-60' : ''}
                        hover:shadow-sm cursor-pointer
                      `}
                      onClick={(e) => {
                        e.stopPropagation()
                        onDateChange(day)
                        onViewChange('día')
                      }}
                    >
                      <div className="flex items-center justify-center h-full">
                        <span className="text-sm font-bold">
                          {task.sphere}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
            
            {/* Tasks without time at the bottom */}
            {(() => {
              const tasksWithoutTime = getTasksWithoutTime(day)
              if (tasksWithoutTime.length > 0) {
                return (
                  <div className="p-2 border-t-2 border-gray-300 bg-gray-100">
                    <div className="text-xs text-gray-500 font-medium mb-1">Sin horario</div>
                    <div className="space-y-1">
                      {tasksWithoutTime.map((task) => (
                        <div
                          key={task.id}
                          className={`
                            p-1 rounded transition-all border-l-2
                            ${getSphereColor(task.sphere)}
                            ${task.completed ? 'opacity-60' : ''}
                            hover:shadow-sm cursor-pointer
                          `}
                          onClick={(e) => {
                            e.stopPropagation()
                            onDateChange(day)
                            onViewChange('día')
                          }}
                        >
                          <div className="flex items-center justify-center">
                            <span className="text-xs font-bold">
                              {task.sphere}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              return null
            })()}
          </div>
        ))}
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
