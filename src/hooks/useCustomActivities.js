import { useState, useEffect } from 'react'
import { spheres } from '../data/spheres'

export const useCustomActivities = () => {
  const [customActivities, setCustomActivities] = useState({})

  // Cargar actividades personalizadas del localStorage
  useEffect(() => {
    console.log('=== useCustomActivities: Loading from localStorage ===')
    const saved = localStorage.getItem('customActivities')
    console.log('Raw localStorage data:', saved)
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log('Parsed activities:', parsed)
        
        // Limpiar datos mal formateados
        const cleaned = {}
        Object.keys(parsed).forEach(sphereId => {
          const sphereData = parsed[sphereId]
          console.log(`Processing sphere ${sphereId}:`, sphereData, 'Type:', typeof sphereData, 'IsArray:', Array.isArray(sphereData))
          
          if (Array.isArray(sphereData)) {
            // Para esferas simples, mantener como array
            cleaned[sphereId] = [...sphereData]
            console.log(`Kept as array for simple sphere ${sphereId}:`, cleaned[sphereId])
          } else if (typeof sphereData === 'object' && sphereData !== null) {
            // Verificar si es una esfera simple que se guardó incorrectamente como objeto
            const sphere = spheres[sphereId]
            if (sphere && Array.isArray(sphere.subcategories)) {
              // Es una esfera simple, convertir de objeto a array
              const activities = []
              Object.values(sphereData).forEach(categoryActivities => {
                if (Array.isArray(categoryActivities)) {
                  activities.push(...categoryActivities)
                }
              })
              cleaned[sphereId] = activities
              console.log(`Converted object to array for simple sphere ${sphereId}:`, cleaned[sphereId])
            } else {
              // Es una esfera compleja, mantener como objeto
              cleaned[sphereId] = sphereData
              console.log(`Kept as object for complex sphere ${sphereId}:`, cleaned[sphereId])
            }
          }
        })
        
        console.log('Final cleaned activities:', cleaned)
        setCustomActivities(cleaned)
        
        // Guardar la versión limpia si hubo cambios
        if (JSON.stringify(parsed) !== JSON.stringify(cleaned)) {
          localStorage.setItem('customActivities', JSON.stringify(cleaned))
          console.log('Saved cleaned data to localStorage')
        }
      } catch (error) {
        console.error('Error loading custom activities:', error)
        setCustomActivities({})
      }
    } else {
      console.log('No saved activities found')
      setCustomActivities({})
    }
    console.log('=== END useCustomActivities: Loading ===')
  }, [])

  // Log cuando el estado cambie
  useEffect(() => {
    console.log('Custom activities state changed:', customActivities)
  }, [customActivities])

  // Guardar actividades personalizadas
  const saveCustomActivities = (activities) => {
    console.log('=== saveCustomActivities ===')
    console.log('Activities to save:', activities)
    console.log('Stringified:', JSON.stringify(activities))
    
    setCustomActivities(activities)
    localStorage.setItem('customActivities', JSON.stringify(activities))
    
    // Verificar que se guardó correctamente
    const saved = localStorage.getItem('customActivities')
    console.log('Verified saved data:', saved)
    console.log('=== END saveCustomActivities ===')
  }

  // Agregar una nueva actividad personalizada
  const addCustomActivity = (sphereId, category, activity) => {
    const newActivities = { ...customActivities }
    
    console.log('Adding activity:', activity, 'to category:', category, 'in sphere:', sphereId)
    console.log('Current activities:', newActivities)
    
    if (!newActivities[sphereId]) {
      newActivities[sphereId] = {}
      console.log('Created new sphere entry for:', sphereId)
    }
    
    if (!newActivities[sphereId][category]) {
      newActivities[sphereId][category] = []
      console.log('Created new category:', category)
    }
    
    // Verificar que la actividad no exista ya
    if (!newActivities[sphereId][category].includes(activity)) {
      newActivities[sphereId][category].push(activity)
      console.log('Added activity to category:', category, 'activities now:', newActivities[sphereId][category])
      saveCustomActivities(newActivities)
      console.log('Saved new activities:', newActivities)
    } else {
      console.log('Activity already exists in category:', category)
    }
    
    return newActivities
  }

  // Agregar una actividad simple (sin categoría)
  const addSimpleCustomActivity = (sphereId, activity) => {
    console.log('=== addSimpleCustomActivity ===')
    console.log('Sphere ID:', sphereId)
    console.log('Activity:', activity)
    console.log('Current customActivities:', customActivities)
    
    const newActivities = { ...customActivities }
    
    // Para esferas simples, guardar como array
    if (!newActivities[sphereId]) {
      newActivities[sphereId] = []
      console.log('Created new array for sphere:', sphereId)
    }
    
    // Si es un objeto, convertirlo a array (limpiar datos corruptos)
    if (typeof newActivities[sphereId] === 'object' && !Array.isArray(newActivities[sphereId])) {
      console.log('Converting object to array for sphere:', sphereId)
      const activities = []
      Object.values(newActivities[sphereId]).forEach(categoryActivities => {
        if (Array.isArray(categoryActivities)) {
          activities.push(...categoryActivities)
        }
      })
      newActivities[sphereId] = activities
    }
    
    // Verificar que la actividad no exista ya
    if (!newActivities[sphereId].includes(activity)) {
      newActivities[sphereId].push(activity)
      console.log('Added activity to array:', newActivities[sphereId])
      saveCustomActivities(newActivities)
    } else {
      console.log('Activity already exists:', activity)
    }
    
    console.log('Final newActivities:', newActivities)
    console.log('=== END addSimpleCustomActivity ===')
    return newActivities
  }

  // Obtener actividades personalizadas para una esfera
  const getCustomActivities = (sphereId) => {
    return customActivities[sphereId] || {}
  }

  // Obtener actividades personalizadas simples para una esfera
  const getSimpleCustomActivities = (sphereId) => {
    const activities = customActivities[sphereId]
    if (Array.isArray(activities)) {
      return activities
    } else if (activities && activities['General']) {
      return activities['General']
    }
    return []
  }

  // Eliminar una actividad personalizada
  const removeCustomActivity = (sphereId, category, activity) => {
    const newActivities = { ...customActivities }
    
    if (newActivities[sphereId] && newActivities[sphereId][category]) {
      newActivities[sphereId][category] = newActivities[sphereId][category].filter(
        item => item !== activity
      )
      
      // Si la categoría queda vacía, eliminarla
      if (newActivities[sphereId][category].length === 0) {
        delete newActivities[sphereId][category]
      }
      
      saveCustomActivities(newActivities)
    }
    
    return newActivities
  }

  // Eliminar una actividad simple
  const removeSimpleCustomActivity = (sphereId, activity) => {
    const newActivities = { ...customActivities }
    
    if (newActivities[sphereId] && Array.isArray(newActivities[sphereId])) {
      newActivities[sphereId] = newActivities[sphereId].filter(item => item !== activity)
      
      // Si no hay actividades, eliminar la esfera
      if (newActivities[sphereId].length === 0) {
        delete newActivities[sphereId]
      }
      
      saveCustomActivities(newActivities)
    }
    
    return newActivities
  }

  // Editar una actividad personalizada
  const editCustomActivity = (sphereId, category, oldActivity, newActivity) => {
    const newActivities = { ...customActivities }
    
    if (newActivities[sphereId] && newActivities[sphereId][category]) {
      const index = newActivities[sphereId][category].indexOf(oldActivity)
      if (index !== -1) {
        newActivities[sphereId][category][index] = newActivity
        saveCustomActivities(newActivities)
      }
    }
    
    return newActivities
  }

  // Editar una actividad simple
  const editSimpleCustomActivity = (sphereId, oldActivity, newActivity) => {
    const newActivities = { ...customActivities }
    
    if (newActivities[sphereId] && Array.isArray(newActivities[sphereId])) {
      const index = newActivities[sphereId].indexOf(oldActivity)
      if (index !== -1) {
        newActivities[sphereId][index] = newActivity
        saveCustomActivities(newActivities)
      }
    }
    
    return newActivities
  }

  // Agregar una nueva categoría personalizada
  const addCustomCategory = (sphereId, categoryName) => {
    const newActivities = { ...customActivities }
    
    console.log('Adding category:', categoryName, 'to sphere:', sphereId)
    console.log('Current activities:', newActivities)
    
    if (!newActivities[sphereId]) {
      newActivities[sphereId] = {}
      console.log('Created new sphere entry for:', sphereId)
    }
    
    if (!newActivities[sphereId][categoryName]) {
      newActivities[sphereId][categoryName] = []
      console.log('Created new category:', categoryName)
      saveCustomActivities(newActivities)
      console.log('Saved new activities:', newActivities)
    }
    
    return newActivities
  }

  // Editar nombre de una categoría personalizada
  const editCustomCategory = (sphereId, oldCategoryName, newCategoryName) => {
    const newActivities = { ...customActivities }
    
    if (newActivities[sphereId] && newActivities[sphereId][oldCategoryName]) {
      const activities = [...newActivities[sphereId][oldCategoryName]]
      delete newActivities[sphereId][oldCategoryName]
      newActivities[sphereId][newCategoryName] = activities
      saveCustomActivities(newActivities)
      console.log('Renamed category from', oldCategoryName, 'to', newCategoryName)
    }
    
    return newActivities
  }

  // Eliminar una categoría personalizada completa
  const deleteCustomCategory = (sphereId, categoryName) => {
    const newActivities = { ...customActivities }
    
    if (newActivities[sphereId] && newActivities[sphereId][categoryName]) {
      delete newActivities[sphereId][categoryName]
      
      // Si no quedan categorías, eliminar la esfera
      if (Object.keys(newActivities[sphereId]).length === 0) {
        delete newActivities[sphereId]
      }
      
      saveCustomActivities(newActivities)
      console.log('Deleted category:', categoryName, 'from sphere:', sphereId)
    }
    
    return newActivities
  }

  return {
    customActivities,
    addCustomActivity,
    addSimpleCustomActivity,
    getCustomActivities,
    getSimpleCustomActivities,
    removeCustomActivity,
    removeSimpleCustomActivity,
    editCustomActivity,
    editSimpleCustomActivity,
    addCustomCategory,
    editCustomCategory,
    deleteCustomCategory
  }
}
