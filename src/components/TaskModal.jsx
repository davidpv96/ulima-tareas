import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Calendar, FileText, Clock, AlertCircle } from 'lucide-react'

const TaskModal = ({ task, onSave, onClose, hasTimeConflict }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    sphere: 'personal'
  })
  const [timeConflict, setTimeConflict] = useState(false)

  const spheres = [
    { id: 'personal', label: 'Personal', emoji: '👤', color: 'bg-gray-100 text-gray-800' },
    { id: 'grow', label: 'Grow', emoji: '🌱', color: 'bg-light-green text-green-800' },
    { id: 'thrive', label: 'Thrive', emoji: '🚀', color: 'bg-soft-orange text-orange-800' },
    { id: 'connect', label: 'Connect', emoji: '👻', color: 'bg-soft-blue text-blue-800' },
    { id: 'create', label: 'Create', emoji: '🎨', color: 'bg-pastel-lilac text-purple-800' },
    { id: 'universidad', label: 'Universidad', emoji: '🎓', color: 'bg-soft-orange text-orange-800' },
    { id: 'familia', label: 'Familia', emoji: '👨‍👩‍👧‍👦', color: 'bg-soft-blue text-blue-800' },
    { id: 'trabajo', label: 'Trabajo', emoji: '💼', color: 'bg-gray-100 text-gray-800' },
    { id: 'pareja', label: 'Pareja', emoji: '💕', color: 'bg-soft-pink text-pink-800' },
    { id: 'gym', label: 'Gym', emoji: '💪', color: 'bg-light-green text-green-800' },
    { id: 'bienestar', label: 'Bienestar', emoji: '🧘', color: 'bg-gray-100 text-gray-800' },
    { id: 'deporte', label: 'Deporte (Surf)', emoji: '🏄‍♂️', color: 'bg-soft-blue text-blue-800' },
    { id: 'viajes', label: 'Viajes', emoji: '✈️', color: 'bg-soft-orange text-orange-800' },
    { id: 'social', label: 'Social (Friends)', emoji: '👥', color: 'bg-soft-orange text-orange-800' }
  ]

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        date: task.date || new Date().toISOString().split('T')[0],
        startTime: task.startTime || '',
        endTime: task.endTime || '',
        sphere: task.sphere || 'personal'
      })
    }
  }, [task])

  // Validar conflictos de horario cuando cambien los tiempos
  useEffect(() => {
    if (formData.startTime && formData.endTime && hasTimeConflict) {
      const date = new Date(formData.date)
      const conflict = hasTimeConflict(date, formData.startTime, formData.endTime, task?.id)
      setTimeConflict(conflict)
    } else {
      setTimeConflict(false)
    }
  }, [formData.startTime, formData.endTime, formData.date, hasTimeConflict, task?.id])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return
    if (timeConflict) return // No permitir guardar si hay conflicto
    
    onSave(formData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-xl shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {task ? 'Editar tarea' : 'Nueva tarea'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="¿Qué necesitas hacer?"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detalles adicionales..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Fecha
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
            />
          </div>

          {/* Time Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Horario (opcional)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hora inicio</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Hora fin</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Time Conflict Warning */}
            {timeConflict && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Este horario ya está ocupado</span>
              </motion.div>
            )}
          </div>

          {/* Sphere */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Esfera de vida
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {spheres.map((sphere) => (
                <button
                  key={sphere.id}
                  type="button"
                  onClick={() => handleInputChange('sphere', sphere.id)}
                  className={`
                    p-3 rounded-lg border-2 transition-all text-left
                    ${formData.sphere === sphere.id 
                      ? 'border-soft-blue bg-soft-blue/10' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{sphere.emoji}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {sphere.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!formData.title.trim() || timeConflict}
              className="flex-1 px-4 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {task ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default TaskModal
