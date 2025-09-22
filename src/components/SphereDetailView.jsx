import React, { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Target, CheckCircle, Edit, Trash2, X, Settings } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { getSphereById, getSphereSubcategories, getSphereNestedSubcategories } from '../data/spheres'
import { useCustomActivities } from '../hooks/useCustomActivities'

const SphereDetailView = ({ sphereId, onBack, onAddTask }) => {
  const { t } = useLanguage()
  const { 
    customActivities, 
    addCustomActivity, 
    addSimpleCustomActivity,
    removeCustomActivity,
    removeSimpleCustomActivity,
    editCustomActivity,
    editSimpleCustomActivity,
    addCustomCategory,
    editCustomCategory,
    deleteCustomCategory
  } = useCustomActivities()
  
  // const [selectedSubcategory, setSelectedSubcategory] = useState('')
  // const [selectedNestedSubcategory, setSelectedNestedSubcategory] = useState('')
  const [customSubcategory, setCustomSubcategory] = useState('')
  const [showAddCustom, setShowAddCustom] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState('')
  const [editingActivity, setEditingActivity] = useState(null)
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [selectedCategoryForActivity, setSelectedCategoryForActivity] = useState(null)
  const [editingCategoryName, setEditingCategoryName] = useState('')
  const [showEditCategory, setShowEditCategory] = useState(false)

  // Función para extraer emoji del texto de la actividad
  const getActivityEmoji = (activityText) => {
    // Patrón mejorado para detectar emojis reales (no caracteres acentuados)
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F0FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]/gu
    
    // Buscar emojis al final del texto (después del último espacio)
    const emojiMatch = activityText.match(/\s+([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F0FF}\u{1F200}-\u{1F2FF}\u{1FA70}-\u{1FAFF}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]+)$/u)
    if (emojiMatch) {
      return emojiMatch[1].trim()
    }
    
    // Buscar emojis al principio del texto
    const emojiMatchStart = activityText.match(/^([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F0FF}\u{1F200}-\u{1F2FF}\u{1FA70}-\u{1FAFF}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F251}]+)\s/u)
    if (emojiMatchStart) {
      return emojiMatchStart[1].trim()
    }
    
    // Buscar cualquier emoji en el texto
    const anyEmojiMatch = activityText.match(emojiRegex)
    if (anyEmojiMatch) {
      return anyEmojiMatch[0]
    }
    
    // Si no hay emoji, usar emoji estándar genérico para todas las actividades personalizadas
    return '📝'
  }

  // Función para obtener el texto sin emoji
  const getActivityText = (activityText) => {
    // Patrón para emojis reales
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F0FF}]|[\u{1F200}-\u{1F2FF}]|[\u{1FA70}-\u{1FAFF}]|[\u{1F004}]|[\u{1F0CF}]|[\u{1F170}-\u{1F251}]/gu
    
    // Remover solo emojis reales del texto
    let text = activityText.replace(emojiRegex, '').trim()
    
    // Limpiar espacios múltiples
    text = text.replace(/\s+/g, ' ').trim()
    
    return text || activityText // Si no queda texto, devolver el original
  }

  // Función para obtener el texto traducido de una actividad
  const getTranslatedActivityText = (activityText) => {
    const cleanText = getActivityText(activityText)
    const translatedText = t(`sphereDetails.${sphereId}.activities.${activityText}`)
    
    // Si la traducción no existe, devolver el texto limpio
    if (translatedText === activityText || translatedText.includes('sphereDetails')) {
      return cleanText
    }
    
    return translatedText
  }

  // Función para obtener el nombre de categoría traducido
  const getTranslatedCategoryName = (categoryName) => {
    const translatedCategory = t(`sphereDetails.${sphereId}.categories.${categoryName}`)
    
    // Si la traducción no existe, devolver el nombre original
    if (translatedCategory === categoryName || translatedCategory.includes('sphereDetails')) {
      return categoryName
    }
    
    return translatedCategory
  }

  const sphere = getSphereById(sphereId)
  const subcategories = getSphereSubcategories(sphereId, customActivities)
  const nestedSubcategories = getSphereNestedSubcategories(sphereId, customActivities)
  
  // Determinar si la esfera tiene estructura simple (array) o anidada (objeto)
  const isSimpleStructure = sphere && Array.isArray(sphere.subcategories)
  const isNestedStructure = sphere && typeof sphere.subcategories === 'object' && !Array.isArray(sphere.subcategories)
  
  // Debug logs
  console.log('Sphere ID:', sphereId)
  console.log('Sphere structure:', sphere?.subcategories)
  console.log('Is Simple Structure:', isSimpleStructure)
  console.log('Is Nested Structure:', isNestedStructure)
  console.log('Custom Activities:', customActivities)
  console.log('Nested Subcategories:', nestedSubcategories)
  
  // Función para limpiar datos corruptos
  const cleanCorruptedData = () => {
    if (isSimpleStructure && customActivities[sphereId] && typeof customActivities[sphereId] === 'object' && !Array.isArray(customActivities[sphereId])) {
      console.log('Datos corruptos detectados para esfera simple:', sphereId)
      // Convertir de objeto a array para esferas simples
      const activities = []
      Object.values(customActivities[sphereId]).forEach(categoryActivities => {
        if (Array.isArray(categoryActivities)) {
          activities.push(...categoryActivities)
        }
      })
      // Guardar como array simple
      const newActivities = { ...customActivities }
      newActivities[sphereId] = activities
      localStorage.setItem('customActivities', JSON.stringify(newActivities))
      console.log('Datos limpiados:', newActivities)
      // No recargar automáticamente para evitar bucles
    }
  }
  
  // Ejecutar limpieza si es necesario (solo una vez)
  useEffect(() => {
    cleanCorruptedData()
  }, [sphereId]) // Removido customActivities para evitar bucles

  if (!sphere) {
    return (
      <div className="h-full bg-cream p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Esfera no encontrada</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  const handleAddTask = (subcategory = '', nestedSubcategory = '') => {
    onAddTask({
      sphere: sphereId,
      subcategory: subcategory || selectedSubcategory,
      nestedSubcategory: nestedSubcategory || selectedNestedSubcategory
    })
  }

  const handleAddCustomSubcategory = () => {
    if (customSubcategory.trim()) {
      console.log('=== AGREGANDO ACTIVIDAD SIMPLE ===')
      console.log('Actividad:', customSubcategory.trim())
      console.log('Esfera:', sphereId)
      console.log('Es simple estructura:', isSimpleStructure)
      console.log('Custom activities antes:', customActivities)
      
      // Guardar la actividad personalizada
      const result = addSimpleCustomActivity(sphereId, customSubcategory.trim())
      console.log('Resultado de addSimpleCustomActivity:', result)
      
      // Mostrar mensaje de éxito
      setShowSuccessMessage('¡Actividad agregada exitosamente!')
      setCustomSubcategory('')
      setShowAddCustom(false)
      
      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setShowSuccessMessage('')
      }, 3000)
      
      console.log('=== FIN AGREGAR ACTIVIDAD ===')
    } else {
      console.log('ERROR: No hay texto en customSubcategory')
    }
  }

  const handleAddCustomActivityToCategory = (category, activity) => {
    // Guardar la actividad personalizada en la categoría específica
    addCustomActivity(sphereId, category, activity)
    
    // Mostrar mensaje de éxito
    setShowSuccessMessage('¡Actividad agregada exitosamente!')
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setShowSuccessMessage('')
    }, 3000)
  }

  const handleEditActivity = (category, activity) => {
    setEditingActivity(activity)
    setEditingCategory(category)
    setCustomSubcategory(activity)
  }

  const handleSaveEdit = () => {
    if (editingActivity && customSubcategory.trim()) {
      if (editingCategory) {
        // Editar actividad con categoría
        editCustomActivity(sphereId, editingCategory, editingActivity, customSubcategory.trim())
      } else {
        // Editar actividad simple
        editSimpleCustomActivity(sphereId, editingActivity, customSubcategory.trim())
      }
      
      setShowSuccessMessage('¡Actividad editada exitosamente!')
      setEditingActivity(null)
      setEditingCategory(null)
      setCustomSubcategory('')
      
      setTimeout(() => {
        setShowSuccessMessage('')
      }, 3000)
    }
  }

  const handleDeleteActivity = (category, activity) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      if (category) {
        // Eliminar actividad con categoría
        removeCustomActivity(sphereId, category, activity)
      } else {
        // Eliminar actividad simple
        removeSimpleCustomActivity(sphereId, activity)
      }
      
      setShowSuccessMessage('¡Actividad eliminada exitosamente!')
      
      setTimeout(() => {
        setShowSuccessMessage('')
      }, 3000)
    }
  }

  const handleAddNewCategory = () => {
    if (newCategoryName.trim() && isNestedStructure) {
      console.log('Agregando nueva categoría:', newCategoryName.trim(), 'a esfera:', sphereId)
      addCustomCategory(sphereId, newCategoryName.trim())
      setShowSuccessMessage('¡Nueva categoría creada exitosamente!')
      setNewCategoryName('')
      setShowAddCategory(false)
      
      setTimeout(() => {
        setShowSuccessMessage('')
      }, 3000)
    }
  }

  const handleEditCategory = (categoryName) => {
    setEditingCategory(categoryName)
    setEditingCategoryName(categoryName)
    setShowEditCategory(true)
  }

  const handleSaveEditCategory = () => {
    if (editingCategoryName.trim() && editingCategory) {
      editCustomCategory(sphereId, editingCategory, editingCategoryName.trim())
      setShowSuccessMessage('¡Categoría editada exitosamente!')
      setEditingCategory(null)
      setEditingCategoryName('')
      setShowEditCategory(false)
      
      setTimeout(() => {
        setShowSuccessMessage('')
      }, 3000)
    }
  }

  const handleDeleteCategory = (categoryName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar la categoría "${categoryName}" y todas sus actividades?`)) {
      deleteCustomCategory(sphereId, categoryName)
      setShowSuccessMessage('¡Categoría eliminada exitosamente!')
      
      setTimeout(() => {
        setShowSuccessMessage('')
      }, 3000)
    }
  }

  const handleAddActivityToCategory = (category) => {
    if (customSubcategory.trim()) {
      console.log('Agregando actividad:', customSubcategory.trim(), 'a categoría:', category, 'en esfera:', sphereId)
      addCustomActivity(sphereId, category, customSubcategory.trim())
      setShowSuccessMessage('¡Actividad agregada exitosamente!')
      setCustomSubcategory('')
      setSelectedCategoryForActivity(null)
      setShowAddCustom(false)
      
      setTimeout(() => {
        setShowSuccessMessage('')
      }, 3000)
    }
  }

  return (
    <div className="h-full bg-cream p-4 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-white/50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center space-x-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: sphere.color }}
          >
            {sphere.emoji}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{sphere.name}</h1>
            <p className="text-gray-600">Explora las actividades disponibles</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {showSuccessMessage}
        </div>
      )}

      {/* Content */}
      <div className="space-y-6">
        {sphere.hasSubcategories ? (
          // Esfera con subcategorías
          <div className="space-y-4">
            {isNestedStructure ? (
              // Esfera con subcategorías anidadas (como Familia, Thrive)
              <div className="space-y-6">
                {Object.entries(nestedSubcategories).map(([categoryName, activities]) => (
                  <div key={categoryName} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-soft-blue to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                          <Target className="w-5 h-5 text-white" />
                        </div>
               <h2 className="text-xl font-bold text-gray-900">
                 {getTranslatedCategoryName(categoryName)}
               </h2>
                      </div>
                      {/* Solo mostrar botones de gestión para categorías personalizadas */}
                      {customActivities[sphereId] && customActivities[sphereId][categoryName] && (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditCategory(categoryName)}
                            className="p-1 rounded-full hover:bg-yellow-100 transition-colors"
                            title="Editar categoría"
                          >
                            <Edit className="w-4 h-4 text-yellow-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(categoryName)}
                            className="p-1 rounded-full hover:bg-red-100 transition-colors"
                            title="Eliminar categoría"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setShowAddCategory(true)}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{t('sphereDetail.newCategory')}</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCategoryForActivity(null)
                            setCustomSubcategory('')
                            setShowAddCustom(true)
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-soft-blue to-blue-600 text-white text-sm rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md"
                        >
                          <Plus className="w-4 h-4" />
                          <span>{t('sphereDetail.addActivity')}</span>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activities.map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-sm">{getActivityEmoji(activity)}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-800">{getTranslatedActivityText(activity)}</span>
                          </div>
                          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button
                              onClick={() => handleEditActivity(categoryName, activity)}
                              className="p-2 rounded-full hover:bg-yellow-50 transition-colors"
                              title="Editar actividad"
                            >
                              <Edit className="w-4 h-4 text-yellow-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteActivity(categoryName, activity)}
                              className="p-2 rounded-full hover:bg-red-50 transition-colors"
                              title="Eliminar actividad"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : isSimpleStructure ? (
              // Esfera con subcategorías simples (como Grow, Deporte)
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-soft-blue to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Target className="w-5 h-5 text-white" />
                    </div>
               <h2 className="text-xl font-bold text-gray-900">
                 {t('sphereDetail.availableActivities')}
               </h2>
                  </div>
                  {/* Botón removido para esferas simples - se usa el de la sección inferior */}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subcategories.map((subcategory, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-sm">{getActivityEmoji(subcategory)}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-800">{getTranslatedActivityText(subcategory)}</span>
                      </div>
                      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => handleEditActivity(null, subcategory)}
                          className="p-2 rounded-full hover:bg-yellow-50 transition-colors"
                          title="Editar actividad"
                        >
                          <Edit className="w-4 h-4 text-yellow-600" />
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(null, subcategory)}
                          className="p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Eliminar actividad"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* Agregar actividad personalizada - Solo para esferas simples */}
            {isSimpleStructure && (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{t('sphereDetail.addNewActivity')}</h3>
                  <button
                    onClick={() => setShowAddCustom(!showAddCustom)}
                    className="px-3 py-1 bg-soft-blue text-white text-sm rounded-lg hover:bg-blue-400 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{showAddCustom ? t('sphereDetail.cancel') : t('app.add')}</span>
                  </button>
                </div>
                
                {showAddCustom && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={customSubcategory}
                      onChange={(e) => setCustomSubcategory(e.target.value)}
                      placeholder="Escribe tu actividad personalizada..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAddCustomSubcategory}
                        className="px-4 py-2 bg-gradient-to-r from-soft-blue to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!customSubcategory.trim()}
                      >
       {t('sphereDetail.addActivityButton')}
                      </button>
                      <button
                        onClick={() => {
                          setCustomSubcategory('')
                          setShowAddCustom(false)
                        }}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
       {t('sphereDetail.cancel')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Esfera sin subcategorías
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: sphere.color }}>
              {sphere.emoji}
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{sphere.name}</h2>
            <p className="text-gray-600 mb-4">Esta esfera no tiene subcategorías específicas.</p>
            <button
              onClick={() => handleAddTask()}
              className="px-6 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Agregar tarea general</span>
            </button>
          </div>
        )}
      </div>

      {/* Modal para agregar nueva categoría */}
      {showAddCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nueva Categoría</h3>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Nombre de la nueva categoría..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleAddNewCategory}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                disabled={!newCategoryName.trim()}
              >
                Crear Categoría
              </button>
              <button
                onClick={() => {
                  setNewCategoryName('')
                  setShowAddCategory(false)
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('sphereDetail.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar actividad */}
      {showAddCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {selectedCategoryForActivity 
                ? `Agregar actividad a "${selectedCategoryForActivity}"`
                : "Agregar nueva actividad"
              }
            </h3>
            
            {/* Solo mostrar selector de categorías si es una esfera anidada y no se seleccionó una específica */}
            {!selectedCategoryForActivity && isNestedStructure && Object.keys(nestedSubcategories).length > 0 && (
              <div className="mb-4">
                 <label className="block text-sm font-medium text-gray-700 mb-2">
                   {t('sphereDetail.selectCategory')}
                 </label>
                <select
                  value={selectedCategoryForActivity || ''}
                  onChange={(e) => setSelectedCategoryForActivity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                >
                   <option value="">{t('sphereDetail.selectCategoryPlaceholder')}</option>
                  {Object.keys(nestedSubcategories).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <input
              type="text"
              value={customSubcategory}
              onChange={(e) => setCustomSubcategory(e.target.value)}
              placeholder={isNestedStructure 
                ? t('sphereDetail.activityPlaceholder') 
                : t('sphereDetail.activityPlaceholderSimple')
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (selectedCategoryForActivity) {
                    handleAddActivityToCategory(selectedCategoryForActivity)
                  } else {
                    handleAddCustomSubcategory()
                  }
                }}
                className="px-4 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors"
                disabled={!customSubcategory.trim() || (isNestedStructure && !selectedCategoryForActivity)}
              >
{t('sphereDetail.addActivityButton')}
              </button>
              <button
                onClick={() => {
                  setCustomSubcategory('')
                  setSelectedCategoryForActivity(null)
                  setShowAddCustom(false)
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('sphereDetail.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar categoría */}
      {showEditCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Categoría</h3>
            <input
              type="text"
              value={editingCategoryName}
              onChange={(e) => setEditingCategoryName(e.target.value)}
              placeholder="Nuevo nombre de la categoría..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveEditCategory}
                className="px-4 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors"
                disabled={!editingCategoryName.trim()}
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => {
                  setEditingCategory(null)
                  setEditingCategoryName('')
                  setShowEditCategory(false)
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('sphereDetail.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar actividad */}
      {editingActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar Actividad</h3>
            <input
              type="text"
              value={customSubcategory}
              onChange={(e) => setCustomSubcategory(e.target.value)}
              placeholder="Editar actividad..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-soft-blue focus:border-transparent mb-4"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-soft-blue text-white rounded-lg hover:bg-blue-400 transition-colors"
                disabled={!customSubcategory.trim()}
              >
                Guardar Cambios
              </button>
              <button
                onClick={() => {
                  setEditingActivity(null)
                  setEditingCategory(null)
                  setCustomSubcategory('')
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {t('sphereDetail.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante para agregar tarea */}
      <button
        onClick={() => onAddTask({ 
          sphere: sphereId, 
          isNewTask: true,
          source: 'sphere-detail' 
        })}
        className="fixed bottom-6 right-6 w-14 h-14 bg-soft-blue text-white rounded-full shadow-lg hover:bg-blue-400 transition-colors flex items-center justify-center z-40"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  )
}

export default SphereDetailView
