import React, { useState, useEffect } from 'react'
import { Phone, Mail, MessageCircle, X } from 'lucide-react'

const AdminContactOverlay = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Detectar si es móvil
    const isMobile = window.navigator.userAgent.includes('Mobile') ||
                     window.navigator.userAgent.includes('Android') ||
                     window.navigator.userAgent.includes('iPhone') ||
                     window.navigator.userAgent.includes('iPad') ||
                     window.innerWidth <= 768 // Fallback para dispositivos táctiles

    // Solo mostrar en dispositivos móviles
    if (isMobile) {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-sm w-full animate-in slide-in-from-right duration-300">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-6 text-white">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <img 
              src="/sphere-icon.png" 
              alt="Sphere" 
              className="w-12 h-12 rounded-xl bg-white/20 p-2"
            />
            <div>
              <h2 className="text-xl font-bold">Sphere</h2>
              <p className="text-red-100 text-sm">Calendar & Goals</p>
            </div>
          </div>
          
          <p className="text-red-100">
            Servicio temporalmente no disponible
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Contacta al administrador
            </h3>
            <p className="text-gray-600 text-sm">
              Esta aplicación no está disponible en dispositivos móviles. 
              Por favor contacta al administrador para obtener asistencia.
            </p>
          </div>

          {/* Contact Options */}
          <div className="space-y-3 mb-6">
            <a
              href="mailto:admin@sphere-app.com"
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Enviar email</p>
                <p className="text-sm text-gray-600">admin@sphere-app.com</p>
              </div>
            </a>
            
            <a
              href="tel:+1234567890"
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Llamar</p>
                <p className="text-sm text-gray-600">+1 (234) 567-8900</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminContactOverlay
