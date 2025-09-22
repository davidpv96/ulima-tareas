import React from 'react'
import { Plus } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const FloatingButton = ({ onClick }) => {
  const { t } = useLanguage()
  
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-soft-blue to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
      aria-label={t('tasks.newTask')}
    >
      <Plus className="w-6 h-6" />
    </button>
  )
}

export default FloatingButton
