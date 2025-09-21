import { useState, useEffect } from 'react'

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
    const dateStr = date.toISOString().split('T')[0]
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
    getTasksStats
  }
}
