import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es') // Español por defecto

  // Cargar idioma guardado al montar el componente
  useEffect(() => {
    const savedLanguage = localStorage.getItem('sphere-language')
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Guardar idioma cuando cambie
  useEffect(() => {
    localStorage.setItem('sphere-language', language)
  }, [language])

  // Función para cambiar idioma
  const changeLanguage = (newLanguage) => {
    if (newLanguage === 'es' || newLanguage === 'en') {
      setLanguage(newLanguage)
    }
  }

  // Función para obtener traducción
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        // Fallback a español si no se encuentra la traducción
        value = translations.es
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey]
          } else {
            return key // Devolver la clave si no se encuentra
          }
        }
        break
      }
    }
    
    return value || key
  }

  // Función para formatear fechas según el idioma
  const formatDate = (date, options = {}) => {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }
    
    const locale = language === 'es' ? 'es-ES' : 'en-US'
    return new Date(date).toLocaleDateString(locale, { ...defaultOptions, ...options })
  }

  // Función para formatear fechas cortas
  const formatDateShort = (date) => {
    const locale = language === 'es' ? 'es-ES' : 'en-US'
    return new Date(date).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric'
    })
  }

  // Función para obtener nombre del mes
  const getMonthName = (monthIndex, short = false) => {
    const months = short ? 'monthsShort' : 'months'
    const monthKeys = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ]
    const shortMonthKeys = [
      'jan', 'feb', 'mar', 'apr', 'may', 'jun',
      'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
    ]
    
    const key = short ? shortMonthKeys[monthIndex] : monthKeys[monthIndex]
    return t(`months.${key}`)
  }

  // Función para obtener nombre del día
  const getDayName = (dayIndex, short = false) => {
    const dayKeys = [
      'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
    ]
    const shortDayKeys = [
      'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'
    ]
    
    const key = short ? shortDayKeys[dayIndex] : dayKeys[dayIndex]
    return t(`days.${key}`)
  }

  const value = {
    language,
    changeLanguage,
    t,
    formatDate,
    formatDateShort,
    getMonthName,
    getDayName,
    isSpanish: language === 'es',
    isEnglish: language === 'en'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

