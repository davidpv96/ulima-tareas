import React, { useState, useEffect } from 'react'
import { Download, X, Smartphone, Monitor, Share } from 'lucide-react'

const DownloadPrompt = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    // Detectar si estamos en PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                  window.navigator.standalone === true ||
                  document.referrer.includes('android-app://')

    // Detectar si el navegador soporta PWA
    const supportsPWA = 'serviceWorker' in navigator

    // Verificar si ya se mostró antes (localStorage)
    const hasShownBefore = localStorage.getItem('sphere-download-shown')

    // Mostrar solo si:
    // 1. NO estamos en PWA
    // 2. Soporta PWA
    // 3. No se ha mostrado antes (o hace más de 7 días)
    if (!isPWA && supportsPWA && !hasShownBefore) {
      setIsVisible(true)
    }

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      setDeferredPrompt(null)
      setIsVisible(false)
    }
  }

  const handleClose = () => {
    // Marcar que ya se mostró
    localStorage.setItem('sphere-download-shown', 'true')
    setIsVisible(false)
    onClose()
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-soft-blue to-blue-400 p-6 text-white">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="/sphere-icon.png" 
              alt="Sphere" 
              className="w-12 h-12 rounded-xl"
            />
            <div>
              <h2 className="text-xl font-bold">Sphere</h2>
              <p className="text-blue-100 text-sm">Calendar & Goals</p>
            </div>
          </div>
          
          <p className="text-blue-100">
            ¡Instala la app para una mejor experiencia!
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Acceso rápido</h3>
                <p className="text-sm text-gray-600">Desde tu pantalla de inicio</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Monitor className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Funciona offline</h3>
                <p className="text-sm text-gray-600">Sin conexión a internet</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Share className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Notificaciones</h3>
                <p className="text-sm text-gray-600">Recordatorios de tareas</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-2">¿Cómo instalar?</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Chrome/Edge:</strong> Menú → "Instalar Sphere"</p>
              <p><strong>Safari:</strong> Compartir → "Añadir a pantalla de inicio"</p>
              <p><strong>Firefox:</strong> Menú → "Instalar"</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {deferredPrompt && (
              <button
                onClick={handleInstall}
                className="w-full bg-soft-blue text-white py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Instalar ahora</span>
              </button>
            )}
            
            <button
              onClick={handleClose}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Continuar en navegador
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPrompt
