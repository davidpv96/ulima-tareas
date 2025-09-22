import { useState, useEffect } from 'react'
import { formatDateToString, parseDateString } from '../utils/dateUtils'

const STORAGE_KEY = 'sphere-tasks'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])

  // Cargar tareas desde localStorage al inicializar
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks))
      } catch (error) {
        console.error('Error loading tasks:', error)
      }
    }
  }, [])

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      date: taskData.date,
      startTime: taskData.startTime || '',
      endTime: taskData.endTime || '',
      sphere: taskData.sphere,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setTasks(prev => [...prev, newTask])
  }

  const updateTask = (id, updates) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    )
  }

  const getTasksByDate = (date) => {
    const dateStr = formatDateToString(date)
    return tasks.filter(task => task.date === dateStr)
  }

  const getTasksBySphere = (sphere) => {
    return tasks.filter(task => task.sphere === sphere)
  }

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed)
  }

  const getPendingTasks = () => {
    return tasks.filter(task => !task.completed)
  }

  const getTasksStats = () => {
    const total = tasks.length
    const completed = getCompletedTasks().length
    const pending = getPendingTasks().length
    const completionRate = total > 0 ? (completed / total) * 100 : 0

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

    return {
      total,
      completed,
      pending,
      completionRate: Math.round(completionRate),
      sphereStats
    }
  }

  // Validar conflictos de horarios
  const hasTimeConflict = (date, startTime, endTime, excludeTaskId = null) => {
    if (!startTime || !endTime) return false
    
    const dateStr = formatDateToString(date)
    const tasksOnDate = tasks.filter(task => 
      task.date === dateStr && 
      task.id !== excludeTaskId &&
      task.startTime && 
      task.endTime
    )

    // Convertir horarios a minutos para comparación correcta
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number)
      return hours * 60 + minutes
    }

    const newStartMinutes = timeToMinutes(startTime)
    const newEndMinutes = timeToMinutes(endTime)

    return tasksOnDate.some(task => {
      const taskStartMinutes = timeToMinutes(task.startTime)
      const taskEndMinutes = timeToMinutes(task.endTime)
      
      // Verificar si hay solapamiento: nuevo horario se superpone con horario existente
      return (newStartMinutes < taskEndMinutes && newEndMinutes > taskStartMinutes)
    })
  }

  // Buscar tareas por texto
  const searchTasks = (query) => {
    if (!query.trim()) return tasks
    
    const lowercaseQuery = query.toLowerCase()
    return tasks.filter(task => 
      task.title.toLowerCase().includes(lowercaseQuery) ||
      task.description.toLowerCase().includes(lowercaseQuery) ||
      task.sphere.toLowerCase().includes(lowercaseQuery)
    )
  }

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTasksByDate,
    getTasksBySphere,
    getCompletedTasks,
    getPendingTasks,
    getTasksStats,
    hasTimeConflict,
    searchTasks
  }
}
