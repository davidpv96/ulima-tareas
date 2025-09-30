import React, { useState, useEffect, useMemo } from 'react'
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
import AdminContactOverlay from './components/AdminContactOverlay'
import SphereDetailView from './components/SphereDetailView'
import Toast from './components/Toast'
import { useTasks } from './hooks/useTasks'
import { useGoalsContext, GoalsProvider } from './contexts/GoalsContext'
import { getSpheresArray } from './data/spheres'
import { LanguageProvider } from './contexts/LanguageContext'
import { formatDateToString } from './utils/dateUtils'
import './App.css'

function AppContent() {
  const [showSplash, setShowSplash] = useState(true)
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false)
  const [showAdminContact, setShowAdminContact] = useState(false)
  const [isPWA, setIsPWA] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentView, setCurrentView] = useState('inicio')
  const [selectedSphere, setSelectedSphere] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [toast, setToast] = useState(null)
  
  const { tasks, addTask, updateTask, deleteTask, hasTimeConflict, searchTasks } = useTasks()
  const { goals, getGoalsAsTasks } = useGoalsContext()

  // Detectar si estamos en PWA al cargar
  useEffect(() => {
    const pwaCheck = window.matchMedia('(display-mode: standalone)').matches || 
                     window.navigator.standalone === true ||
                     document.referrer.includes('android-app://')
    
    setIsPWA(pwaCheck)
    
    // Detectar si es móvil
    const isMobile = window.navigator.userAgent.includes('Mobile') ||
                     window.navigator.userAgent.includes('Android') ||
                     window.navigator.userAgent.includes('iPhone') ||
                     window.navigator.userAgent.includes('iPad')
    
    // Solo NO mostrar download prompt si es PWA móvil
    // Mostrar en: web (todos dispositivos) y PWA desktop
    if (!(pwaCheck && isMobile)) {
      setShowDownloadPrompt(true)
    }
  }, [])

  // Combinar tareas y metas para el calendario
  const goalsAsTasks = useMemo(() => {
    return getGoalsAsTasks()
  }, [goals])
  
  const allCalendarItems = useMemo(() => {
    return [...tasks, ...goalsAsTasks]
  }, [tasks, goalsAsTasks])
  
  // Key para forzar re-renderizado cuando cambien las metas
  const calendarKey = useMemo(() => {
    return `calendar-${tasks.length}-${goals.length}-${Date.now()}`
  }, [tasks.length, goals.length])


  const handleAddTask = () => {
    setEditingTask({
      isNewTask: true,
      date: formatDateToString(selectedDate) // Usar la fecha seleccionada actual
    })
    setIsTaskModalOpen(true)
  }

  const handleEditTask = (task) => {
    setEditingTask(task)
    setIsTaskModalOpen(true)
  }

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false)
    setEditingTask(null)
    // No cambiar selectedSphere para mantener la página actual
  }

  const handleSaveTask = (taskData) => {
    if (editingTask && !editingTask.isNewTask) {
      updateTask(editingTask.id, taskData)
      setToast({
        message: '¡Tarea actualizada exitosamente!',
        type: 'success'
      })
    } else {
      addTask(taskData)
      setToast({
        message: '¡Tarea guardada exitosamente!',
        type: 'success'
      })
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
    // El download prompt ya se maneja en el useEffect inicial
  }

  const handleDownloadPromptClose = () => {
    setShowDownloadPrompt(false)
  }


  const handleSphereClick = (sphereId) => {
    console.log('Sphere clicked:', sphereId)
    
    // Solo abrir página de detalle si la esfera tiene subcategorías
    const spheres = getSpheresArray()
    const sphere = spheres.find(s => s.id === sphereId)
    if (sphere && sphere.hasSubcategories) {
      setSelectedSphere(sphereId)
    } else {
      console.log('Sphere has no subcategories, not opening detail page')
    }
  }

  const handleBackFromSphere = () => {
    setSelectedSphere(null)
  }

  const handleAddTaskFromSphere = (sphereData) => {
    // Si viene desde una esfera, crear un objeto de tarea nueva con la esfera pre-seleccionada
    if (sphereData.source === 'sphere-detail') {
      setEditingTask({
        sphere: sphereData.sphere,
        isNewTask: true,
        date: formatDateToString(selectedDate) // Usar la fecha seleccionada actual
      })
    } else {
      // Si es una tarea existente, usar los datos tal como vienen
      setEditingTask(sphereData)
    }
    setIsTaskModalOpen(true)
    // No cambiar selectedSphere para mantener la página actual
  }

  const handleAdminContactClose = () => {
    setShowAdminContact(false)
  }

  // Si hay download prompt, mostrarlo con prioridad absoluta
  if (showDownloadPrompt) {
    return (
      <LanguageProvider>
        <DownloadPrompt onClose={handleDownloadPromptClose} />
      </LanguageProvider>
    )
  }

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />
  }

  // Si hay una esfera seleccionada, mostrar su vista detallada
  if (selectedSphere) {
    return (
      <LanguageProvider>
        <SphereDetailView
          sphereId={selectedSphere}
          onBack={handleBackFromSphere}
          onAddTask={handleAddTaskFromSphere}
        />
        
        {isTaskModalOpen && (
          <TaskModal
            task={editingTask}
            onSave={handleSaveTask}
            onClose={handleCloseTaskModal}
            hasTimeConflict={hasTimeConflict}
          />
        )}
        
        {/* Admin contact popup */}
        {showAdminContact && (
          <AdminContactOverlay onClose={handleAdminContactClose} />
        )}
      </LanguageProvider>
    )
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
          onSphereClick={handleSphereClick}
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
              onSphereClick={handleSphereClick}
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
              key={calendarKey}
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
        

        {/* Toast notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        {/* Admin contact popup */}
        {showAdminContact && (
          <AdminContactOverlay onClose={handleAdminContactClose} />
        )}
        
      </div>
    </LanguageProvider>
  )
}

function App() {
  return (
    <GoalsProvider>
      <AppContent />
    </GoalsProvider>
  )
}

export default App