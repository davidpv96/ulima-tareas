import { useState, useEffect } from 'react'
import { formatDateToString } from '../utils/dateUtils'

// Función para cargar metas desde localStorage
const loadGoalsFromStorage = () => {
  try {
    const savedGoals = localStorage.getItem('sphere-goals-2025')
    return savedGoals ? JSON.parse(savedGoals) : []
  } catch (error) {
    console.error('Error loading goals from localStorage:', error)
    return []
  }
}

export const useGoals = () => {
  const [goals, setGoals] = useState(() => loadGoalsFromStorage())
  
  // Guardar metas cuando cambien
  useEffect(() => {
    localStorage.setItem('sphere-goals-2025', JSON.stringify(goals))
  }, [goals])

  // Función para agregar una nueva meta
  const addGoal = (goalData) => {
    const goal = {
      id: Date.now().toString(),
      title: goalData.title,
      date: goalData.date,
      description: goalData.description,
      steps: [],
      completed: false,
      createdAt: new Date().toISOString()
    }

    setGoals(prev => [goal, ...prev])
    return goal
  }

  // Función para actualizar una meta
  const updateGoal = (goalId, goalData) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, ...goalData } // Usar la fecha tal como viene, igual que en tareas
        : goal
    ))
  }

  // Función para eliminar una meta
  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId))
  }

  // Función para agregar un paso a una meta
  const addStep = (goalId, stepData) => {
    const step = {
      id: Date.now().toString(),
      title: stepData.title,
      description: stepData.description,
      completed: false,
      createdAt: new Date().toISOString()
    }

    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, steps: [...goal.steps, step] }
        : goal
    ))
  }

  // Función para eliminar un paso
  const deleteStep = (goalId, stepId) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, steps: goal.steps.filter(step => step.id !== stepId) }
        : goal
    ))
  }

  // Función para marcar un paso como completado
  const toggleStep = (goalId, stepId) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            steps: goal.steps.map(step => 
              step.id === stepId 
                ? { ...step, completed: !step.completed }
                : step
            )
          }
        : goal
    ))
  }

  // Función para obtener metas de una fecha específica
  const getGoalsByDate = (date) => {
    const dateString = formatDateToString(date)
    return goals.filter(goal => goal.date === dateString)
  }

  // Función para obtener todas las metas como "tareas" para el calendario
  const getGoalsAsTasks = () => {
    return goals.map(goal => ({
      id: `goal-${goal.id}`,
      title: `🎯 ${goal.title}`,
      description: goal.description,
      date: goal.date,
      startTime: '',
      endTime: '',
      sphere: 'meta',
      completed: goal.completed,
      isGoal: true,
      goalId: goal.id
    }))
  }

  return {
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    addStep,
    deleteStep,
    toggleStep,
    getGoalsByDate,
    getGoalsAsTasks
  }
}
