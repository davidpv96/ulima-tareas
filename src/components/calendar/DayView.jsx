import React, { useMemo } from 'react'
import { Check, Circle, Plus } from 'lucide-react'

const DayView = ({ selectedDate, tasks, onEditTask, onToggleTask }) => {
  const { dayTasks, dateInfo } = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0]
    const dayTasks = tasks.filter(task => task.date === dateStr)
    
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]
    
    const dateInfo = {
      dayName: days[selectedDate.getDay()],
      dayNumber: selectedDate.getDate(),
      monthName: months[selectedDate.getMonth()],
      year: selectedDate.getFullYear()
    }
    
    return { dayTasks, dateInfo }
  }, [selectedDate, tasks])

  const getSphereColor = (sphere) => {
    const colors = {
      'personal': 'bg-gray-100 text-gray-800 border-gray-200',
      'grow': 'bg-light-green text-green-800 border-green-200',
      'thrive': 'bg-soft-orange text-orange-800 border-orange-200',
      'connect': 'bg-soft-blue text-blue-800 border-blue-200',
      'create': 'bg-pastel-lilac text-purple-800 border-purple-200',
      'universidad': 'bg-soft-orange text-orange-800 border-orange-200',
      'familia': 'bg-soft-blue text-blue-800 border-blue-200',
      'trabajo': 'bg-gray-100 text-gray-800 border-gray-200',
      'pareja': 'bg-soft-pink text-pink-800 border-pink-200',
      'gym': 'bg-light-green text-green-800 border-green-200',
      'bienestar': 'bg-gray-100 text-gray-800 border-gray-200',
      'deporte': 'bg-soft-blue text-blue-800 border-blue-200',
      'viajes': 'bg-soft-orange text-orange-800 border-orange-200',
      'social': 'bg-soft-orange text-orange-800 border-orange-200'
    }
    return colors[sphere] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getSphereEmoji = (sphere) => {
    const emojis = {
      'personal': '👤',
      'grow': '🌱',
      'thrive': '🚀',
      'connect': '👻',
      'create': '🎨',
      'universidad': '🎓',
      'familia': '👨‍👩‍👧‍👦',
      'trabajo': '💼',
      'pareja': '💕',
      'gym': '💪',
      'bienestar': '🧘',
      'deporte': '🏄‍♂️',
      'viajes': '✈️',
      'social': '👥'
    }
    return emojis[sphere] || '📝'
  }

  const groupedTasks = useMemo(() => {
    const groups = {}
    dayTasks.forEach(task => {
      if (!groups[task.sphere]) {
        groups[task.sphere] = []
      }
      groups[task.sphere].push(task)
    })
    return groups
  }, [dayTasks])

  return (
    <div className="h-full overflow-y-auto bg-cream">
      <div className="p-4">
        {/* Date Header */}
        <div className="mb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {dateInfo.dayNumber}
            </h1>
            <h2 className="text-lg font-medium text-gray-700">
              {dateInfo.dayName}, {dateInfo.monthName} {dateInfo.year}
            </h2>
          </div>
        </div>

        {/* Tasks Section */}
        {dayTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nada planeado
            </h3>
            <p className="text-gray-500 mb-4">
              Toca el botón + para añadir una nueva tarea
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedTasks).map(([sphere, sphereTasks]) => (
              <div
                key={sphere}
                className="space-y-3"
              >
                {/* Sphere Header */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xl">{getSphereEmoji(sphere)}</span>
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {sphere}
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({sphereTasks.length})
                  </span>
                </div>

                {/* Tasks in this sphere */}
                <div className="space-y-2">
                  {sphereTasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`
                        p-4 rounded-lg border-l-4 shadow-sm
                        ${getSphereColor(task.sphere)}
                        ${task.completed ? 'opacity-60' : ''}
                        hover:shadow-md transition-all cursor-pointer
                      `}
                      onClick={() => onEditTask(task)}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onToggleTask(task.id)
                          }}
                          className={`mt-1 p-1 rounded-full transition-colors ${
                            task.completed 
                              ? 'text-green-600 hover:text-green-700' 
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {task.completed ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium mb-1 ${
                            task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h4>
                          
                          {task.description && (
                            <p className={`text-sm ${
                              task.completed ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {task.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Progress Summary */}
        {dayTasks.length > 0 && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-2">Resumen del día</h4>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">
                  {dayTasks.filter(t => t.completed).length} completadas
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-gray-600">
                  {dayTasks.filter(t => !t.completed).length} pendientes
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DayView
