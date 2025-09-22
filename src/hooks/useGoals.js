import { useState, useEffect } from 'react'
import { formatDateToString, normalizeDateString } from '../utils/dateUtils'

export const useGoals = () => {
  const [goals, setGoals] = useState([])

  // Cargar metas guardadas al montar el componente
  useEffect(() => {
    const savedGoals = localStorage.getItem('sphere-goals-2025')
    if (savedGoals) {
      try {
        const parsedGoals = JSON.parse(savedGoals)
        console.log('=== DEBUG: Loading existing goals ===')
        console.log('Raw goals from localStorage:', parsedGoals)
        
        // Limpiar fechas de metas existentes para corregir problemas de zona horaria
        const cleanedGoals = parsedGoals.map(goal => {
          const originalDate = goal.date
          const normalizedDate = normalizeDateString(goal.date)
          console.log(`Goal "${goal.title}": ${originalDate} -> ${normalizedDate}`)
          
          return {
            ...goal,
            date: normalizedDate
          }
        })
        
        console.log('Cleaned goals:', cleanedGoals)
        console.log('=== END DEBUG ===')
        
        setGoals(cleanedGoals)
      } catch (error) {
        console.error('Error loading goals:', error)
      }
    }
  }, [])

  // Guardar metas cuando cambien
  useEffect(() => {
    localStorage.setItem('sphere-goals-2025', JSON.stringify(goals))
  }, [goals])

  // Función para agregar una nueva meta
  const addGoal = (goalData) => {
    console.log('=== DEBUG: Adding goal ===')
    console.log('Original date from input:', goalData.date)
    const normalizedDate = normalizeDateString(goalData.date)
    console.log('Normalized date:', normalizedDate)
    
    const goal = {
      id: Date.now().toString(),
      title: goalData.title,
      date: normalizedDate,
      description: goalData.description,
      steps: [],
      completed: false,
      createdAt: new Date().toISOString()
    }

    console.log('Final goal object:', goal)
    console.log('=== END DEBUG ===')

    setGoals(prev => [goal, ...prev])
    return goal
  }

  // Función para actualizar una meta
  const updateGoal = (goalId, goalData) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { 
            ...goal, 
            ...goalData,
            // Normalizar la fecha si se está actualizando
            ...(goalData.date && { date: normalizeDateString(goalData.date) })
          }
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
