import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CalendarView from './components/CalendarView'
import TaskModal from './components/TaskModal'
import FloatingButton from './components/FloatingButton'
import { useTasks } from './hooks/useTasks'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState('month')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  
  const { tasks, addTask, updateTask, deleteTask } = useTasks()

  const handleAddTask = () => {
    setEditingTask(null)
    setIsTaskModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false)
    setEditingTask(null)
  }

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
    } else {
      addTask(taskData)
    }
    handleCloseTaskModal()
  }

  return (
    <div className="App min-h-screen bg-cream">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        tasks={tasks}
      />
      
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="flex-1 pt-16">
        <CalendarView 
          currentView={currentView}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          tasks={tasks}
          onEditTask={handleEditTask}
          onToggleTask={updateTask}
        />
      </main>
      
      <FloatingButton onClick={handleAddTask} />
      
      <AnimatePresence>
        {isTaskModalOpen && (
          <TaskModal
            task={editingTask}
            onSave={handleSaveTask}
            onClose={handleCloseTaskModal}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App