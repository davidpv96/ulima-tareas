import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Target, CheckCircle, Clock, BarChart3 } from 'lucide-react'

const Statistics = ({ tasks }) => {
  const stats = React.useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    // Estadísticas por esfera
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

    // Convertir a array y ordenar por total
    const sortedSpheres = Object.entries(sphereStats)
      .map(([sphere, data]) => ({
        sphere,
        ...data,
        completionRate: Math.round((data.completed / data.total) * 100)
      }))
      .sort((a, b) => b.total - a.total)

    return {
      total,
      completed,
      pending,
      completionRate,
      sphereStats: sortedSpheres
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

  return (
    <div className="p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Estadísticas</h2>
        <p className="text-gray-600">Tu progreso en las diferentes esferas de vida</p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completadas</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pendientes</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
      >
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#AEE0F6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - stats.completionRate / 100)}`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
              <p className="text-xs text-gray-600">Completado</p>
            </div>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Progreso general</h3>
        <p className="text-sm text-gray-600">{stats.completed} de {stats.total} tareas completadas</p>
      </motion.div>

      {/* Sphere Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Por esferas</h3>
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          {stats.sphereStats.length === 0 ? (
            <div className="text-center py-8">
              <Target className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No hay tareas para mostrar estadísticas</p>
            </div>
          ) : (
            stats.sphereStats.map((sphere, index) => (
              <motion.div
                key={sphere.sphere}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getSphereEmoji(sphere.sphere)}</span>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{sphere.sphere}</p>
                    <p className="text-sm text-gray-600">
                      {sphere.completed} de {sphere.total} completadas
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-soft-blue h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${sphere.completionRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-10 text-right">
                    {sphere.completionRate}%
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Motivational Message */}
      {stats.completionRate > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-soft-blue to-blue-400 p-4 rounded-xl text-white text-center"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <h4 className="font-semibold mb-1">
            {stats.completionRate >= 80 
              ? '¡Excelente trabajo! 🎉' 
              : stats.completionRate >= 50 
              ? '¡Vas por buen camino! 💪' 
              : '¡Sigue así! 🌟'
            }
          </h4>
          <p className="text-sm opacity-90">
            {stats.completionRate >= 80 
              ? 'Estás dominando tus objetivos'
              : stats.completionRate >= 50 
              ? 'Mantén el ritmo y sigue progresando'
              : 'Cada paso cuenta hacia tus metas'
            }
          </p>
        </motion.div>
      )}
    </div>
  )
}

export default Statistics
