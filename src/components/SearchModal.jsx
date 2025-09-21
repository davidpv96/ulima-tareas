import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Calendar, Clock, Check, Circle, Edit, Trash2 } from 'lucide-react'

const SearchModal = ({ isOpen, onClose, tasks, onEditTask, onDeleteTask, onToggleTask }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.sphere.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, tasks])

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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
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

  const handleClose = () => {
    setSearchQuery('')
    setSearchResults([])
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 1, opacity: 0, y: "100%" }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1, opacity: 0, y: "100%" }}
        transition={{ 
          type: "spring",
          damping: 25,
          stiffness: 300,
          mass: 0.8
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-t-xl sm:rounded-xl shadow-2xl max-h-[90vh] sm:max-h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Buscar tareas</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título, descripción o esfera..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {searchQuery.trim() === '' ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Buscar tareas</h3>
              <p className="text-gray-500">Escribe algo para buscar en tus tareas</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sin resultados</h3>
              <p className="text-gray-500">No se encontraron tareas que coincidan con tu búsqueda</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
              </p>
              
              {searchResults.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1], delay: index * 0.03 }}
                  className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`p-1 rounded-full transition-colors mt-1 ${
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

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className={`font-medium ${
                        task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h4>
                      
                      {/* Actions */}
                      <div className="flex items-center space-x-1 ml-2">
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
                    </div>
                    
                    {task.description && (
                      <p className={`text-sm mb-2 ${
                        task.completed ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {task.description}
                      </p>
                    )}

                    {/* Task Details */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(task.date)}</span>
                      </div>
                      
                      {task.startTime && task.endTime && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTime(task.startTime)} - {formatTime(task.endTime)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Sphere Badge */}
                  <div className="flex-shrink-0">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getSphereColor(task.sphere)}`}>
                      <span>{getSphereEmoji(task.sphere)}</span>
                      <span className="capitalize">{task.sphere}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SearchModal
