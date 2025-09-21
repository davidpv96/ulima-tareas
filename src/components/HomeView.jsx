import React, { useMemo } from 'react'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Target, 
  TrendingUp,
  Plus,
  CalendarDays,
  CalendarRange,
  Grid3X3,
  BarChart3
} from 'lucide-react'

const HomeView = ({ 
  tasks, 
  selectedDate, 
  onDateChange, 
  onViewChange, 
  onNewTask,
  onEditTask,
  onToggleTask 
}) => {
  const stats = useMemo(() => {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.completed).length
    const pendingTasks = totalTasks - completedTasks
    
    // Tareas de hoy
    const todayTasks = tasks.filter(task => {
      const taskDate = new Date(task.date)
      return taskDate.toISOString().split('T')[0] === todayStr
    })
    
    const todayCompleted = todayTasks.filter(t => t.completed).length
    const todayPending = todayTasks.length - todayCompleted
    
    // Próximas tareas (próximas 3)
    const upcomingTasks = tasks
      .filter(task => !task.completed && new Date(task.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3)
    
    // Tareas por esfera
    const sphereStats = {}
    tasks.forEach(task => {
      if (!sphereStats[task.sphere]) {
        sphereStats[task.sphere] = { total: 0, completed: 0 }
      }
      sphereStats[task.sphere].total++
      if (task.completed) {
        sphereStats[task.sphere].completed++
      }
    })
    
    const topSpheres = Object.entries(sphereStats)
      .map(([sphere, data]) => ({
        sphere,
        ...data,
        completionRate: Math.round((data.completed / data.total) * 100)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 3)

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      todayTasks: todayTasks.length,
      todayCompleted,
      todayPending,
      upcomingTasks,
      topSpheres
    }
  }, [tasks])

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

  const getSphereColor = (sphere) => {
    const colors = {
      'personal': 'bg-blue-100 border-blue-200 text-blue-800',
      'grow': 'bg-green-100 border-green-200 text-green-800',
      'thrive': 'bg-purple-100 border-purple-200 text-purple-800',
      'connect': 'bg-pink-100 border-pink-200 text-pink-800',
      'create': 'bg-orange-100 border-orange-200 text-orange-800',
      'universidad': 'bg-indigo-100 border-indigo-200 text-indigo-800',
      'familia': 'bg-red-100 border-red-200 text-red-800',
      'trabajo': 'bg-gray-100 border-gray-200 text-gray-800',
      'pareja': 'bg-rose-100 border-rose-200 text-rose-800',
      'gym': 'bg-yellow-100 border-yellow-200 text-yellow-800',
      'bienestar': 'bg-teal-100 border-teal-200 text-teal-800',
      'deporte': 'bg-cyan-100 border-cyan-200 text-cyan-800',
      'viajes': 'bg-sky-100 border-sky-200 text-sky-800',
      'social': 'bg-emerald-100 border-emerald-200 text-emerald-800'
    }
    return colors[sphere] || 'bg-gray-100 border-gray-200 text-gray-800'
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoy'
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana'
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      })
    }
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr.substring(0, 5) // HH:MM
  }

  const quickActions = [
    {
      id: 'agenda',
      label: 'Agenda',
      icon: Calendar,
      description: 'Ver todas las tareas',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'día',
      label: 'Día',
      icon: CalendarDays,
      description: 'Vista diaria',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'semana',
      label: 'Semana',
      icon: CalendarRange,
      description: 'Vista semanal',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'mes',
      label: 'Mes',
      icon: Grid3X3,
      description: 'Vista mensual',
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'estadísticas',
      label: 'Estadísticas',
      icon: BarChart3,
      description: 'Ver progreso',
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ]

  return (
    <div className="h-full bg-cream p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Bienvenido a Sphere!</h1>
        <p className="text-gray-600">Tu calendario y gestor de metas personal</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTasks}</p>
              <p className="text-sm text-gray-500">Total tareas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTasks}</p>
              <p className="text-sm text-gray-500">Completadas</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</p>
              <p className="text-sm text-gray-500">Pendientes</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.todayTasks}</p>
              <p className="text-sm text-gray-500">Hoy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      {stats.todayTasks > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Progreso de hoy</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Tareas completadas</span>
                <span>{stats.todayCompleted}/{stats.todayTasks}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-soft-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.todayTasks > 0 ? (stats.todayCompleted / stats.todayTasks) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-soft-blue">
                {stats.todayTasks > 0 ? Math.round((stats.todayCompleted / stats.todayTasks) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Tasks */}
      {stats.upcomingTasks.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximas tareas</h2>
          <div className="space-y-3">
            {stats.upcomingTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border ${getSphereColor(task.sphere)}`}
              >
                <span className="text-xl">{getSphereEmoji(task.sphere)}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{task.title}</p>
                  <p className="text-xs opacity-75">
                    {formatDate(task.date)} {task.startTime && `• ${formatTime(task.startTime)}`}
                  </p>
                </div>
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="p-1 rounded-full hover:bg-white/50 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Spheres */}
      {stats.topSpheres.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Esferas más activas</h2>
          <div className="space-y-3">
            {stats.topSpheres.map((sphere) => (
              <div key={sphere.sphere} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getSphereEmoji(sphere.sphere)}</span>
                  <span className="font-medium text-sm capitalize">{sphere.sphere}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{sphere.completed}/{sphere.total}</p>
                  <p className="text-xs text-gray-500">{sphere.completionRate}% completado</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onViewChange(action.id)}
              className={`${action.color} text-white p-4 rounded-lg transition-colors text-center`}
            >
              <action.icon className="w-6 h-6 mx-auto mb-2" />
              <p className="font-medium text-sm">{action.label}</p>
              <p className="text-xs opacity-90">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Add Task Button */}
      <div className="text-center">
        <button
          onClick={onNewTask}
          className="inline-flex items-center space-x-2 bg-soft-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva tarea</span>
        </button>
      </div>
    </div>
  )
}

export default HomeView
