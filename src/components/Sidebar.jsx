import React from 'react'
import { 
  Calendar, 
  CalendarDays, 
  CalendarRange, 
  Grid3X3,
  Target,
  BookOpen,
  Heart,
  Lightbulb,
  FileText,
  Image,
  User,
  LogOut,
  Settings,
  BarChart3,
  Home
} from 'lucide-react'

const Sidebar = ({ isOpen, onClose, currentView, onViewChange }) => {
  const viewOptions = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'día', label: 'Día', icon: CalendarDays },
    { id: 'semana', label: 'Semana', icon: CalendarRange },
    { id: 'mes', label: 'Mes', icon: Grid3X3 },
    { id: 'estadísticas', label: 'Estadísticas', icon: BarChart3 }
  ]

  const customButtons = [
    { 
      id: 'metas', 
      label: 'My World on Top', 
      sublabel: 'Metas 2025',
      icon: Target,
      iconColor: 'bg-soft-blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      hoverColor: 'hover:bg-blue-100'
    },
    { 
      id: 'planner', 
      label: 'Semana Planner',
      icon: BookOpen,
      iconColor: 'bg-pastel-lilac',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800',
      hoverColor: 'hover:bg-purple-100'
    },
    { 
      id: 'motivacion', 
      label: 'Motivación',
      icon: Heart,
      iconColor: 'bg-soft-pink',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-800',
      hoverColor: 'hover:bg-pink-100'
    },
    { 
      id: 'actividades', 
      label: 'Sugerencia Actividades',
      sublabel: 'Generador Planes',
      icon: Lightbulb,
      iconColor: 'bg-soft-orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-800',
      hoverColor: 'hover:bg-orange-100'
    },
    { 
      id: 'visionboard', 
      label: 'My Visionboard',
      icon: Image,
      iconColor: 'bg-light-green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      hoverColor: 'hover:bg-green-100'
    }
  ]

  const handleLogout = () => {
    // Implementar logout
    console.log('Logout')
    onClose()
  }

  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
          
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <img 
                    src="/sphere-icon.png" 
                    alt="Sphere" 
                    className="w-8 h-8 rounded-lg"
                  />
                  <h1 className="text-2xl font-bold text-gray-900">
                    SPHERE
                  </h1>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* View Options */}
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Vistas
                </h2>
                <div className="space-y-1">
                  {viewOptions.map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          onViewChange(option.id)
                          onClose()
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          currentView === option.id
                            ? 'bg-soft-blue text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-8"></div>

              {/* Custom Buttons */}
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Herramientas
                </h2>
                <div className="space-y-2">
                  {customButtons.map((button) => {
                    const Icon = button.icon
                    return (
                      <button
                        key={button.id}
                        onClick={() => {
                          // Implementar funcionalidad específica para cada botón
                          console.log(`Clicked ${button.id}`)
                          onClose()
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${button.bgColor} ${button.textColor} ${button.hoverColor}`}
                      >
                        <div className={`p-2 rounded-lg ${button.iconColor}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">
                            {button.label}
                          </div>
                          {button.sublabel && (
                            <div className="text-xs opacity-70">
                              {button.sublabel}
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-8"></div>

              {/* User Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className="w-10 h-10 bg-soft-blue rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Usuario</p>
                    <p className="text-sm text-gray-500">usuario@ejemplo.com</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      console.log('Settings clicked')
                      onClose()
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Ajustes</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default Sidebar
