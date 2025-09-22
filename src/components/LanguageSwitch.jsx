import React, { useState } from 'react'
import { Globe, Check } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageSwitch = () => {
  const { language, changeLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        title={t('header.language')}
      >
        <Globe className="w-5 h-5 text-gray-600" />
        <span className="text-lg">{currentLanguage?.flag}</span>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors ${
                    language === lang.code ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {lang.name}
                    </span>
                  </div>
                  {language === lang.code && (
                    <Check className="w-4 h-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitch

