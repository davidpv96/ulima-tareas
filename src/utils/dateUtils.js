// Utilidades para manejo de fechas consistentes

/**
 * Convierte una fecha a string en formato YYYY-MM-DD usando la zona horaria local
 * Esto evita problemas de zona horaria que pueden causar que las fechas se muestren un día antes
 */
export const formatDateToString = (date) => {
  if (!date) return ''
  
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

/**
 * Convierte un string de fecha YYYY-MM-DD a un objeto Date usando la zona horaria local
 */
export const parseDateString = (dateString) => {
  if (!dateString) return new Date()
  
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/**
 * Verifica si dos fechas son el mismo día (ignorando la hora)
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false
  
  return formatDateToString(date1) === formatDateToString(date2)
}

/**
 * Obtiene la fecha de hoy en formato string
 */
export const getTodayString = () => {
  return formatDateToString(new Date())
}

/**
 * Convierte un string de fecha de un input type="date" a un string de fecha local
 * Esto evita problemas de zona horaria cuando el navegador interpreta las fechas como UTC
 */
export const normalizeDateString = (dateString) => {
  if (!dateString) return getTodayString()
  
  // Si la fecha ya está en formato YYYY-MM-DD, parsearla y reformatearla
  // para asegurar que esté en zona horaria local
  if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateString.split('-').map(Number)
    const localDate = new Date(year, month - 1, day)
    return formatDateToString(localDate)
  }
  
  // Si no está en el formato esperado, devolver la fecha de hoy
  return getTodayString()
}
