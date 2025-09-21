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

const MotivationView = () => {
  const [currentQuote, setCurrentQuote] = useState(null)
  const [lastUpdateDate, setLastUpdateDate] = useState(null)

  const motivationalQuotes = [
    {
      text: "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito.",
      author: "Albert Schweitzer",
      category: "Éxito"
    },
    {
      text: "No te preocupes por los fracasos, preocúpate por las oportunidades que pierdes cuando ni siquiera lo intentas.",
      author: "Jack Canfield",
      category: "Perseverancia"
    },
    {
      text: "El futuro pertenece a aquellos que creen en la belleza de sus sueños.",
      author: "Eleanor Roosevelt",
      category: "Sueños"
    },
    {
      text: "La única forma de hacer un gran trabajo es amar lo que haces.",
      author: "Steve Jobs",
      category: "Pasión"
    },
    {
      text: "No hay atajos para llegar a cualquier lugar que valga la pena.",
      author: "Beverly Sills",
      category: "Esfuerzo"
    },
    {
      text: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.",
      author: "John Lennon",
      category: "Vida"
    },
    {
      text: "El optimismo es la fe que lleva al logro. Nada puede hacerse sin esperanza y confianza.",
      author: "Helen Keller",
      category: "Optimismo"
    },
    {
      text: "La mejor manera de predecir el futuro es creándolo.",
      author: "Peter Drucker",
      category: "Futuro"
    },
    {
      text: "No importa lo lento que vayas, siempre y cuando no te detengas.",
      author: "Confucio",
      category: "Persistencia"
    },
    {
      text: "La única persona que está destinada a ser es la persona que decides ser.",
      author: "Ralph Waldo Emerson",
      category: "Decisión"
    },
    {
      text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
      author: "Robert Collier",
      category: "Constancia"
    },
    {
      text: "No hay nada imposible, la palabra misma dice 'soy posible'.",
      author: "Audrey Hepburn",
      category: "Posibilidades"
    },
    {
      text: "La motivación te ayuda a empezar. El hábito te ayuda a continuar.",
      author: "Jim Ryun",
      category: "Hábitos"
    },
    {
      text: "Cada día es una nueva oportunidad para cambiar tu vida.",
      author: "Anónimo",
      category: "Oportunidad"
    },
    {
      text: "La diferencia entre lo ordinario y lo extraordinario es ese pequeño extra.",
      author: "Jimmy Johnson",
      category: "Excelencia"
    },
    {
      text: "No esperes el momento perfecto, toma el momento y hazlo perfecto.",
      author: "Anónimo",
      category: "Acción"
    },
    {
      text: "La confianza en ti mismo es el primer secreto del éxito.",
      author: "Ralph Waldo Emerson",
      category: "Confianza"
    },
    {
      text: "El único modo de hacer un gran trabajo es amar lo que haces.",
      author: "Steve Jobs",
      category: "Amor al trabajo"
    },
    {
      text: "La vida es 10% lo que te pasa y 90% cómo reaccionas a ello.",
      author: "Charles R. Swindoll",
      category: "Actitud"
    },
    {
      text: "Los ganadores nunca se rinden y los que se rinden nunca ganan.",
      author: "Vince Lombardi",
      category: "Determinación"
    }
  ]

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

    if (savedQuote && savedDate === today) {
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

  // Cargar frase al montar el componente
  useEffect(() => {
    loadDailyQuote()
  }, [])

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
      'Éxito': Star,
      'Perseverancia': Target,
      'Sueños': Sparkles,
      'Pasión': Heart,
      'Esfuerzo': Zap,
      'Vida': Calendar,
      'Optimismo': Sun,
      'Futuro': Clock,
      'Persistencia': Target,
      'Decisión': Zap,
      'Constancia': Star,
      'Posibilidades': Sparkles,
      'Hábitos': Target,
      'Oportunidad': Star,
      'Excelencia': Sparkles,
      'Acción': Zap,
      'Confianza': Heart,
      'Amor al trabajo': Heart,
      'Actitud': Star,
      'Determinación': Target
    }
    return icons[category] || Star
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Éxito': 'bg-yellow-100 text-yellow-800',
      'Perseverancia': 'bg-blue-100 text-blue-800',
      'Sueños': 'bg-purple-100 text-purple-800',
      'Pasión': 'bg-red-100 text-red-800',
      'Esfuerzo': 'bg-orange-100 text-orange-800',
      'Vida': 'bg-green-100 text-green-800',
      'Optimismo': 'bg-yellow-100 text-yellow-800',
      'Futuro': 'bg-indigo-100 text-indigo-800',
      'Persistencia': 'bg-blue-100 text-blue-800',
      'Decisión': 'bg-pink-100 text-pink-800',
      'Constancia': 'bg-gray-100 text-gray-800',
      'Posibilidades': 'bg-purple-100 text-purple-800',
      'Hábitos': 'bg-green-100 text-green-800',
      'Oportunidad': 'bg-yellow-100 text-yellow-800',
      'Excelencia': 'bg-red-100 text-red-800',
      'Acción': 'bg-orange-100 text-orange-800',
      'Confianza': 'bg-blue-100 text-blue-800',
      'Amor al trabajo': 'bg-red-100 text-red-800',
      'Actitud': 'bg-green-100 text-green-800',
      'Determinación': 'bg-purple-100 text-purple-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="h-full bg-cream p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Motivación</h1>
        <p className="text-gray-600">Tu dosis diaria de inspiración</p>
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
          <h2 className="text-lg font-semibold text-gray-900">¿Necesitas más motivación?</h2>
          <p className="text-gray-600">
            La frase cambia automáticamente cada día, pero puedes obtener una nueva cuando quieras.
          </p>
          
          <button
            onClick={changeQuote}
            className="inline-flex items-center space-x-2 bg-soft-blue text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Nueva frase</span>
          </button>
        </div>
      </div>

      {/* Daily Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <div className="text-center space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Frase del día</h2>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span>
              {lastUpdateDate ? new Date(lastUpdateDate).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Cargando...'}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Esta frase se mantendrá hasta mañana, cuando se actualizará automáticamente.
          </p>
        </div>
      </div>

      {/* Motivational Tips */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Consejos de motivación</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Establece metas claras</h3>
              <p className="text-sm text-blue-700">Define objetivos específicos y medibles para mantenerte enfocado.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <Star className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-1">Celebra los pequeños logros</h3>
              <p className="text-sm text-green-700">Reconoce cada paso hacia tu objetivo, por pequeño que sea.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium text-purple-900 mb-1">Mantén una actitud positiva</h3>
              <p className="text-sm text-purple-700">La mentalidad positiva atrae resultados positivos.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-orange-900 mb-1">Toma acción diaria</h3>
              <p className="text-sm text-orange-700">Pequeñas acciones consistentes llevan a grandes resultados.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MotivationView
