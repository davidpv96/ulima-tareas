import React, { useState, useEffect } from 'react'

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      // Pequeño delay para la animación de salida
      setTimeout(() => {
        onFinish()
      }, 300)
    }, 2000) // 2 segundos de duración

    return () => clearTimeout(timer)
  }, [onFinish])

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-soft-blue to-blue-400 flex items-center justify-center z-50 transition-opacity duration-300 opacity-0">
        <div className="text-center">
          <img 
            src="/sphere-icon.png" 
            alt="Sphere" 
            className="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-lg"
          />
          <h1 className="text-4xl font-bold text-white mb-2">Sphere</h1>
          <p className="text-blue-100 text-lg">Calendar & Goals</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-soft-blue to-blue-400 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="text-center">
        <div className="relative">
          <img 
            src="/sphere-icon.png" 
            alt="Sphere" 
            className="w-20 h-20 mx-auto mb-6 rounded-2xl shadow-lg animate-pulse"
          />
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-white/20 animate-ping"></div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">Sphere</h1>
        <p className="text-blue-100 text-lg animate-fade-in-delay">Calendar & Goals</p>
        
        {/* Loading indicator */}
        <div className="mt-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

export default SplashScreen
