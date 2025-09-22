import React, { useState, useEffect } from 'react'
import { X, Calendar, FileText, Clock, AlertCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const TaskModal = ({ task, onSave, onClose, hasTimeConflict }) => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    sphere: 'personal'
  })
  const [timeConflict, setTimeConflict] = useState(false)
  const [invalidTimeRange, setInvalidTimeRange] = useState(false)

  const spheres = [
    { id: 'personal', label: t('spheres.personal'), emoji: '👤', color: 'bg-gray-100 text-gray-800' },
    { id: 'grow', label: t('spheres.learning'), emoji: '🌱', color: 'bg-light-green text-green-800' },
    { id: 'thrive', label: t('spheres.work'), emoji: '🚀', color: 'bg-soft-orange text-orange-800' },
    { id: 'connect', label: t('spheres.social'), emoji: '👻', color: 'bg-soft-blue text-blue-800' },
    { id: 'create', label: t('spheres.hobby'), emoji: '🎨', color: 'bg-pastel-lilac text-purple-800' },
    { id: 'universidad', label: t('spheres.learning'), emoji: '🎓', color: 'bg-soft-orange text-orange-800' },
    { id: 'familia', label: t('spheres.family'), emoji: '👨‍👩‍👧‍👦', color: 'bg-soft-blue text-blue-800' },
    { id: 'trabajo', label: t('spheres.work'), emoji: '💼', color: 'bg-gray-100 text-gray-800' },
    { id: 'pareja', label: t('spheres.personal'), emoji: '💕', color: 'bg-soft-pink text-pink-800' },
    { id: 'gym', label: t('spheres.health'), emoji: '💪', color: 'bg-light-green text-green-800' },
    { id: 'bienestar', label: t('spheres.health'), emoji: '🧘', color: 'bg-gray-100 text-gray-800' },
    { id: 'deporte', label: t('spheres.health'), emoji: '🏄‍♂️', color: 'bg-soft-blue text-blue-800' },
    { id: 'viajes', label: t('spheres.personal'), emoji: '✈️', color: 'bg-soft-orange text-orange-800' },
    { id: 'social', label: t('spheres.social'), emoji: '👥', color: 'bg-soft-orange text-orange-800' }
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

  // Función para validar si el rango de horarios es válido
  const validateTimeRange = (startTime, endTime) => {
    if (!startTime || !endTime) return true // Si no hay horarios, es válido
    
    // Validar formato de tiempo
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return false
    }
    
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    
    // No permitir horarios que crucen medianoche (más de 24 horas)
    const duration = endMinutes - startMinutes
    if (duration <= 0 || duration > 24 * 60) {
      return false
    }
    
    return true
  }

  // Validar rango de horarios y conflictos cuando cambien los tiempos
  useEffect(() => {
    // Validar rango de horarios
    const isValidRange = validateTimeRange(formData.startTime, formData.endTime)
    setInvalidTimeRange(!isValidRange)
    
    // Validar conflictos de horario
    if (formData.startTime && formData.endTime && hasTimeConflict && isValidRange) {
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
    if (!formData.startTime || !formData.endTime) return // Horario obligatorio
    if (timeConflict) return // No permitir guardar si hay conflicto
    if (invalidTimeRange) return // No permitir guardar si el rango de horarios es inválido
    
    onSave(formData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-t-xl sm:rounded-xl shadow-2xl max-h-[90vh] sm:max-h-none overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {task ? t('tasks.editTask') : t('tasks.newTask')}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tasks.taskTitle')} *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={t('tasks.taskTitlePlaceholder')}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              {t('tasks.taskDescription')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t('tasks.taskDescriptionPlaceholder')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent resize-none"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              {t('tasks.taskDate')}
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
              {t('tasks.taskTime')} *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('tasks.startTime')} *</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">{t('tasks.endTime')} *</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            {/* Required time message */}
            {(!formData.startTime || !formData.endTime) && (
              <div className="mt-2 text-xs text-gray-500">
                * {t('tasks.required')}
              </div>
            )}
            
            {/* Time Range Validation Warning */}
            {invalidTimeRange && (
              <div className="mt-2 flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">
                  {formData.startTime && formData.endTime && 
                   (() => {
                     const [startHour] = formData.startTime.split(':').map(Number)
                     const [endHour] = formData.endTime.split(':').map(Number)
                     const duration = (endHour * 60 + parseInt(formData.endTime.split(':')[1])) - 
                                    (startHour * 60 + parseInt(formData.startTime.split(':')[1]))
                     
                     if (duration <= 0) {
                       return t('tasks.invalidTimeRange')
                     } else if (duration > 24 * 60) {
                       return t('tasks.durationError')
                     } else {
                       return t('tasks.invalidTimeFormat')
                     }
                   })()
                  }
                </span>
              </div>
            )}
            
            {/* Time Conflict Warning */}
            {timeConflict && (
              <div className="mt-2 flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{t('tasks.timeConflict')}</span>
              </div>
            )}
          </div>

          {/* Sphere */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('tasks.taskSphere')}
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
              {t('app.cancel')}
            </button>
            <button
              type="submit"
              disabled={!formData.title.trim() || !formData.startTime || !formData.endTime || timeConflict || invalidTimeRange}
              className="flex-1 px-4 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {task ? t('app.save') : t('app.add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal
