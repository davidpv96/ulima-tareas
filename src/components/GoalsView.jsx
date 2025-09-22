import React, { useState } from 'react'
import { 
  Plus, 
  Target, 
  Calendar,
  Check,
  Edit,
  Trash2,
  X,
  ArrowUp,
  Clock
} from 'lucide-react'
import { useGoals } from '../hooks/useGoals'
import { useLanguage } from '../contexts/LanguageContext'

const GoalsView = () => {
  const { t } = useLanguage()
  const { goals, addGoal, deleteGoal, addStep, deleteStep, toggleStep } = useGoals()
  const [selectedGoal, setSelectedGoal] = useState(null)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddStep, setShowAddStep] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: '', date: '', description: '' })
  const [newStep, setNewStep] = useState({ title: '', description: '', completed: false })

  // Función para agregar una nueva meta
  const handleAddGoal = () => {
    if (!newGoal.title.trim() || !newGoal.date) {
      alert(t('goals.required'))
      return
    }

    addGoal(newGoal)
    setNewGoal({ title: '', date: '', description: '' })
    setShowAddGoal(false)
  }

  // Función para eliminar una meta
  const handleDeleteGoal = (goalId) => {
    deleteGoal(goalId)
    if (selectedGoal && selectedGoal.id === goalId) {
      setSelectedGoal(null)
    }
  }

  // Función para agregar un paso a una meta
  const handleAddStep = () => {
    if (!newStep.title.trim()) {
      alert(t('goals.required'))
      return
    }

    addStep(selectedGoal.id, newStep)
    setNewStep({ title: '', description: '', completed: false })
    setShowAddStep(false)
  }

  // Función para eliminar un paso
  const handleDeleteStep = (goalId, stepId) => {
    deleteStep(goalId, stepId)
  }

  // Función para marcar un paso como completado
  const handleToggleStep = (goalId, stepId) => {
    toggleStep(goalId, stepId)
  }

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const months = [
      'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
      'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
    ]
    return `${months[date.getMonth()]} ${date.getDate()} | ${date.getFullYear()}`
  }

  // Función para obtener el progreso de una meta
  const getGoalProgress = (goal) => {
    if (goal.steps.length === 0) return 0
    const completedSteps = goal.steps.filter(step => step.completed).length
    return Math.round((completedSteps / goal.steps.length) * 100)
  }

  return (
    <div className="h-full bg-cream p-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-soft-blue rounded-full">
            <ArrowUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">{t('goals.title')}</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-600">{t('goals.subtitle')}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Goals */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">{t('goals.myGoals')}</h3>
            <button
              onClick={() => setShowAddGoal(true)}
              className="flex items-center space-x-2 bg-soft-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>{t('goals.addGoal')}</span>
            </button>
          </div>

          <div className="space-y-4">
            {goals
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedGoal?.id === goal.id 
                    ? 'border-soft-blue bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-soft-blue shadow-sm'
                }`}
                onClick={() => setSelectedGoal(goal)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-2 text-gray-900">{goal.title}</h4>
                    {goal.description && (
                      <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(goal.date)}</span>
                    </div>
                    {goal.steps.length > 0 && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-gray-500">Progreso:</span>
                          <span className="text-gray-900 font-medium">
                            {getGoalProgress(goal)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-soft-blue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getGoalProgress(goal)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteGoal(goal.id)
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {goals.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">{t('goals.noGoals')}</p>
                <p className="text-sm">{t('goals.noGoalsMessage')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Steps */}
        <div className="space-y-6">
          {selectedGoal ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedGoal.title}</h3>
                <button
                  onClick={() => setShowAddStep(true)}
                  className="flex items-center space-x-2 bg-soft-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Agregar Paso</span>
                </button>
              </div>

              <div className="space-y-3">
                {selectedGoal.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-soft-blue rounded flex items-center justify-center text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium ${step.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                            {step.title}
                          </h4>
                          {step.description && (
                            <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleToggleStep(selectedGoal.id, step.id)}
                            className={`p-2 rounded-full transition-colors ${
                              step.completed 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStep(selectedGoal.id, step.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {selectedGoal.steps.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No hay pasos definidos</p>
                    <p className="text-sm">Agrega pasos para alcanzar esta meta</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Selecciona una meta</p>
              <p className="text-sm">Elige una meta para ver y gestionar sus pasos</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Agregar Meta</h2>
              <button
                onClick={() => setShowAddGoal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título de la meta
                </label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Creación de Startup"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha objetivo
                </label>
                <input
                  type="date"
                  value={newGoal.date}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (opcional)
                </label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe tu meta..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddGoal}
                  className="flex-1 bg-soft-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Agregar Meta
                </button>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Step Modal */}
      {showAddStep && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Agregar Paso</h2>
              <button
                onClick={() => setShowAddStep(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título del paso
                </label>
                <input
                  type="text"
                  value={newStep.title}
                  onChange={(e) => setNewStep(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Creación del equipo"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (opcional)
                </label>
                <textarea
                  value={newStep.description}
                  onChange={(e) => setNewStep(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe este paso..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddStep}
                  className="flex-1 bg-soft-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Agregar Paso
                </button>
                <button
                  onClick={() => setShowAddStep(false)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GoalsView
