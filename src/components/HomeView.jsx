import React, { useMemo } from 'react'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Target, 
  TrendingUp,
  CalendarDays,
  CalendarRange,
  Grid3X3,
  BarChart3
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { getSpheresArray } from '../data/spheres'
import { formatDateToString } from '../utils/dateUtils'

const HomeView = ({ 
  tasks, 
  selectedDate, 
  onDateChange, 
  onViewChange, 
  onNewTask,
  onEditTask,
  onToggleTask,
  onSphereClick
}) => {
  const { t, formatDateShort } = useLanguage()
  const stats = useMemo(() => {
    const today = new Date()
    const todayStr = formatDateToString(today)
    
    const totalTasks = tasks.length
    const completedTasks = tasks.filter(t => t.completed).length
    const pendingTasks = totalTasks - completedTasks
    
    // Tareas de hoy
    const todayTasks = tasks.filter(task => {
      return task.date === todayStr
    })
    
    const todayCompleted = todayTasks.filter(t => t.completed).length
    const todayPending = todayTasks.length - todayCompleted
    
    // Próximas tareas (próximas 3)
    const upcomingTasks = tasks
      .filter(task => !task.completed && task.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))
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

  const getSphereEmoji = (sphereId) => {
    const sphere = getSpheresArray().find(s => s.id === sphereId)
    return sphere?.emoji || '📝'
  }

  const getSphereColor = (sphereId) => {
    const sphere = getSpheresArray().find(s => s.id === sphereId)
    if (sphere) {
      return `bg-[${sphere.color}]/20 border-[${sphere.color}]/30 text-gray-800`
    }
    return 'bg-gray-100 border-gray-200 text-gray-800'
  }

  const formatDate = (dateStr) => {
    // Crear fecha sin problemas de zona horaria
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    
    // Comparar solo la fecha sin la hora
    const todayStr = formatDateToString(today)
    const tomorrowStr = formatDateToString(tomorrow)
    const dateStrOnly = dateStr
    
    if (dateStrOnly === todayStr) {
      return t('app.today')
    } else if (dateStrOnly === tomorrowStr) {
      return t('app.tomorrow')
    } else {
      return formatDateShort(date)
    }
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return ''
    return timeStr.substring(0, 5) // HH:MM
  }

  const quickActions = [
    {
      id: 'agenda',
      label: t('navigation.agenda'),
      icon: Calendar,
      description: t('home.viewAllTasks'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'día',
      label: t('navigation.day'),
      icon: CalendarDays,
      description: t('home.dailyView'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'semana',
      label: t('navigation.week'),
      icon: CalendarRange,
      description: t('home.weeklyView'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'mes',
      label: t('navigation.month'),
      icon: Grid3X3,
      description: t('home.monthlyView'),
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'estadísticas',
      label: t('navigation.statistics'),
      icon: BarChart3,
      description: t('home.viewProgress'),
      color: 'bg-pink-500 hover:bg-pink-600'
    }
  ]

  return (
    <div className="h-full bg-cream p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('home.welcome')} Sphere!</h1>
        <p className="text-gray-600">{t('home.subtitle')}</p>
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
              <p className="text-sm text-gray-500">{t('statistics.totalTasks')}</p>
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
              <p className="text-sm text-gray-500">{t('statistics.completedTasks')}</p>
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
              <p className="text-sm text-gray-500">{t('statistics.pendingTasks')}</p>
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
              <p className="text-sm text-gray-500">{t('app.today')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      {stats.todayTasks > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('home.todayProgress')}</h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{t('statistics.completedTasks')}</span>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('home.upcomingTasks')}</h2>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('home.mostActiveSpheres')}</h2>
          <div className="space-y-3">
            {stats.topSpheres.map((sphere) => (
              <div 
                key={sphere.sphere} 
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onSphereClick && onSphereClick(sphere.sphere)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getSphereEmoji(sphere.sphere)}</span>
                  <span className="font-medium text-sm capitalize">{t(`spheres.${sphere.sphere}`)}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{sphere.completed}/{sphere.total}</p>
                  <p className="text-xs text-gray-500">{sphere.completionRate}% {t('tasks.completed')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('home.quickActions')}</h2>
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

    </div>
  )
}

export default HomeView
