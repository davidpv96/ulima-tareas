import React, { useState, useEffect } from 'react'
import { 
  RefreshCw, 
  Heart, 
  Star, 
  Zap, 
  Target, 
  Sparkles,
  Quote,
  Calendar,
  Clock,
  Sun
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const MotivationView = () => {
  const { t, formatDate, language } = useLanguage()
  const [currentQuote, setCurrentQuote] = useState(null)
  const [lastUpdateDate, setLastUpdateDate] = useState(null)

  const motivationalQuotes = t('motivationalQuotes')

  // Función para obtener una frase aleatoria
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
    return motivationalQuotes[randomIndex]
  }

  // Función para verificar si es un nuevo día
  const isNewDay = () => {
    const today = new Date().toDateString()
    return lastUpdateDate !== today
  }

  // Función para cargar la frase del día
  const loadDailyQuote = () => {
    const today = new Date().toDateString()
    const savedQuote = localStorage.getItem('sphere-daily-quote')
    const savedDate = localStorage.getItem('sphere-daily-quote-date')
    const savedLanguage = localStorage.getItem('sphere-language')

    // Verificar si es el mismo día Y el mismo idioma
    if (savedQuote && savedDate === today && savedLanguage === language) {
      // Usar la frase guardada del día
      setCurrentQuote(JSON.parse(savedQuote))
      setLastUpdateDate(savedDate)
    } else {
      // Generar nueva frase para el día
      const newQuote = getRandomQuote()
      setCurrentQuote(newQuote)
      setLastUpdateDate(today)
      
      // Guardar en localStorage
      localStorage.setItem('sphere-daily-quote', JSON.stringify(newQuote))
      localStorage.setItem('sphere-daily-quote-date', today)
    }
  }

  // Función para cambiar manualmente la frase
  const changeQuote = () => {
    const newQuote = getRandomQuote()
    setCurrentQuote(newQuote)
    
    // Actualizar la fecha para que no cambie automáticamente hasta mañana
    const today = new Date().toDateString()
    setLastUpdateDate(today)
    localStorage.setItem('sphere-daily-quote', JSON.stringify(newQuote))
    localStorage.setItem('sphere-daily-quote-date', today)
  }

  // Cargar frase al montar el componente y cuando cambie el idioma
  useEffect(() => {
    loadDailyQuote()
  }, [t, language])

  // Verificar si es un nuevo día cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      if (isNewDay()) {
        loadDailyQuote()
      }
    }, 60000) // Verificar cada minuto

    return () => clearInterval(interval)
  }, [lastUpdateDate])

  const getCategoryIcon = (category) => {
    const icons = {
      'Éxito': Star, 'Success': Star,
      'Perseverancia': Target, 'Perseverance': Target,
      'Sueños': Sparkles, 'Dreams': Sparkles,
      'Pasión': Heart, 'Passion': Heart,
      'Esfuerzo': Zap, 'Effort': Zap,
      'Vida': Calendar, 'Life': Calendar,
      'Optimismo': Sun, 'Optimism': Sun,
      'Futuro': Clock, 'Future': Clock,
      'Persistencia': Target, 'Persistence': Target,
      'Decisión': Zap, 'Decision': Zap,
      'Constancia': Star, 'Consistency': Star,
      'Posibilidades': Sparkles, 'Possibilities': Sparkles,
      'Hábitos': Target, 'Habits': Target,
      'Oportunidad': Star, 'Opportunity': Star,
      'Excelencia': Sparkles, 'Excellence': Sparkles,
      'Acción': Zap, 'Action': Zap
    }
    return icons[category] || Star
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Éxito': 'bg-yellow-100 text-yellow-800', 'Success': 'bg-yellow-100 text-yellow-800',
      'Perseverancia': 'bg-blue-100 text-blue-800', 'Perseverance': 'bg-blue-100 text-blue-800',
      'Sueños': 'bg-purple-100 text-purple-800', 'Dreams': 'bg-purple-100 text-purple-800',
      'Pasión': 'bg-red-100 text-red-800', 'Passion': 'bg-red-100 text-red-800',
      'Esfuerzo': 'bg-orange-100 text-orange-800', 'Effort': 'bg-orange-100 text-orange-800',
      'Vida': 'bg-green-100 text-green-800', 'Life': 'bg-green-100 text-green-800',
      'Optimismo': 'bg-yellow-100 text-yellow-800', 'Optimism': 'bg-yellow-100 text-yellow-800',
      'Futuro': 'bg-indigo-100 text-indigo-800', 'Future': 'bg-indigo-100 text-indigo-800',
      'Persistencia': 'bg-blue-100 text-blue-800', 'Persistence': 'bg-blue-100 text-blue-800',
      'Decisión': 'bg-pink-100 text-pink-800', 'Decision': 'bg-pink-100 text-pink-800',
      'Constancia': 'bg-gray-100 text-gray-800', 'Consistency': 'bg-gray-100 text-gray-800',
      'Posibilidades': 'bg-purple-100 text-purple-800', 'Possibilities': 'bg-purple-100 text-purple-800',
      'Hábitos': 'bg-green-100 text-green-800', 'Habits': 'bg-green-100 text-green-800',
      'Oportunidad': 'bg-yellow-100 text-yellow-800', 'Opportunity': 'bg-yellow-100 text-yellow-800',
      'Excelencia': 'bg-red-100 text-red-800', 'Excellence': 'bg-red-100 text-red-800',
      'Acción': 'bg-orange-100 text-orange-800', 'Action': 'bg-orange-100 text-orange-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="h-full bg-cream p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('navigation.motivation')}</h1>
        <p className="text-gray-600">{t('motivation.subtitle')}</p>
      </div>

      {/* Daily Quote Card */}
      {currentQuote && (
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
          <div className="text-center space-y-6">
            {/* Quote Icon */}
            <div className="flex justify-center">
              <div className="p-4 bg-soft-blue rounded-full">
                <Quote className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Quote Text */}
            <blockquote className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed">
              "{currentQuote.text}"
            </blockquote>

            {/* Author */}
            <div className="text-lg text-gray-600">
              — {currentQuote.author}
            </div>

            {/* Category Badge */}
            <div className="flex justify-center">
              <span className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
                getCategoryColor(currentQuote.category)
              }`}>
                {React.createElement(getCategoryIcon(currentQuote.category), { className: "w-4 h-4" })}
                <span>{currentQuote.category}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">{t('motivation.needMoreMotivation')}</h2>
          <p className="text-gray-600">
            {t('motivation.motivationMessage')}
          </p>
          
          <button
            onClick={changeQuote}
            className="inline-flex items-center space-x-2 bg-soft-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t('motivation.newQuote')}</span>
          </button>
        </div>
      </div>

      {/* Daily Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">{t('motivation.dailyQuote')}</h2>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>
              {lastUpdateDate ? formatDate(new Date(lastUpdateDate)) : t('app.loading')}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {t('motivation.dailyQuoteMessage')}
          </p>
        </div>
      </div>

      {/* Motivational Tips */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">{t('motivation.tips')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">{t('motivation.tip1Title')}</h3>
              <p className="text-sm text-blue-700">{t('motivation.tip1Content')}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-1">{t('motivation.tip2Title')}</h3>
              <p className="text-sm text-green-700">{t('motivation.tip2Content')}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-purple-900 mb-1">{t('motivation.tip3Title')}</h3>
              <p className="text-sm text-purple-700">{t('motivation.tip3Content')}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-orange-900 mb-1">{t('motivation.tip4Title')}</h3>
              <p className="text-sm text-orange-700">{t('motivation.tip4Content')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MotivationView
