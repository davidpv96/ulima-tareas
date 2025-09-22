import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import HomeView from './components/HomeView'
import WeekPlannerView from './components/WeekPlannerView'
import MotivationView from './components/MotivationView'
import VisionBoardView from './components/VisionBoardView'
import GoalsView from './components/GoalsView'
import CalendarView from './components/CalendarView'
import TaskModal from './components/TaskModal'
import SearchModal from './components/SearchModal'
import FloatingButton from './components/FloatingButton'
import SplashScreen from './components/SplashScreen'
import DownloadPrompt from './components/DownloadPrompt'
import { useTasks } from './hooks/useTasks'
import { useGoals } from './hooks/useGoals'
import { LanguageProvider } from './contexts/LanguageContext'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState('inicio')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  
  const { tasks, addTask, updateTask, deleteTask, hasTimeConflict, searchTasks } = useTasks()
  const { goals, getGoalsAsTasks } = useGoals()

  // Combinar tareas y metas para el calendario
  const allCalendarItems = [...tasks, ...getGoalsAsTasks()]

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

  const handleSearchClick = () => {
    setIsSearchModalOpen(true)
  }

  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false)
  }

  const handleToggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      updateTask(taskId, { completed: !task.completed })
    }
  }

  const handleSplashFinish = () => {
    setShowSplash(false)
    // Mostrar download prompt después del splash (solo si no es PWA)
    setTimeout(() => {
      setShowDownloadPrompt(true)
    }, 500)
  }

  const handleDownloadPromptClose = () => {
    setShowDownloadPrompt(false)
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />
  }

  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-cream">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentView={currentView}
          onViewChange={setCurrentView}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          tasks={tasks}
          onSearchClick={handleSearchClick}
        />
        
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        
        <main className="flex-1 pt-20">
          {currentView === 'inicio' ? (
            <HomeView 
              tasks={allCalendarItems}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              onViewChange={setCurrentView}
              onNewTask={handleAddTask}
              onEditTask={handleEditTask}
              onToggleTask={handleToggleTask}
            />
          ) : currentView === 'planner' ? (
            <WeekPlannerView />
          ) : currentView === 'motivacion' ? (
            <MotivationView />
          ) : currentView === 'visionboard' ? (
            <VisionBoardView />
          ) : currentView === 'metas' ? (
            <GoalsView />
          ) : (
            <CalendarView 
              currentView={currentView}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              tasks={allCalendarItems}
              onEditTask={handleEditTask}
              onToggleTask={handleToggleTask}
              onDeleteTask={deleteTask}
              onViewChange={setCurrentView}
            />
          )}
        </main>
        
        <FloatingButton onClick={handleAddTask} />
        
        {isTaskModalOpen && (
          <TaskModal
            task={editingTask}
            onSave={handleSaveTask}
            onClose={handleCloseTaskModal}
            hasTimeConflict={hasTimeConflict}
          />
        )}
        
        {isSearchModalOpen && (
          <SearchModal
            isOpen={isSearchModalOpen}
            onClose={handleCloseSearchModal}
            tasks={allCalendarItems}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            onToggleTask={handleToggleTask}
          />
        )}
        
        {showDownloadPrompt && (
          <DownloadPrompt onClose={handleDownloadPromptClose} />
        )}
      </div>
    </LanguageProvider>
  )
}

export default App