export const spheres = {
  personal: {
    id: 'personal',
    name: 'Personal',
    color: '#FFFFFF',
    emoji: '👤',
    hasSubcategories: false
  },
  grow: {
    id: 'grow',
    name: 'Grow',
    color: '#90EE90', // Light green
    emoji: '🌱',
    hasSubcategories: true,
    subcategories: [
      'Leer un libro a la semana 📚',
      'Tomar un curso online nuevo 💻',
      'Aprender un idioma 🌍',
      'Hacer journaling (escribir reflexiones diarias) ✍️',
      'Escuchar un pódcast educativo 🎧',
      'Mejorar tus habilidades de comunicación 💬',
      'Asistir a un taller o conferencia 🎓',
      'Definir metas a corto, mediano y largo plazo 🎯',
      'Crear una rutina de mañana productiva ☀️',
      'Crear un tablero de visión (visionboard) 🖼️',
      'Hacer networking con dos personas a la semana 🤝',
      'Practicar hablar en público 🎤',
      'Hacer un plan financiero personal 💰',
      'Estudiar sobre inteligencia emocional 🧠',
      'Hacer un reto de 30 días (hábitos positivos) 📅'
    ]
  },
  thrive: {
    id: 'thrive',
    name: 'Thrive',
    color: '#FFD700', // Yellow
    emoji: '🔝',
    hasSubcategories: true,
    subcategories: {
      'Desarrollo Académico': [
        'Completar lecturas complementarias semanales - Más allá del syllabus obligatorio 📖',
        'Formar grupos de estudio interdisciplinarios - Conectar con otras carreras 👥',
        'Asistir a conferencias académicas mensuales - Ampliar perspectiva profesional 🎓',
        'Crear un portafolio digital de proyectos - Documentar crecimiento académico 💼',
        'Hacer una investigación personal por ciclo - Profundizar en temas de interés 🔬',
        'Avanzar proyecto de tesis progresivamente - Planificar desde ciclos tempranos 📝'
      ],
      'Preparación Profesional': [
        'Conseguir una práctica pre-profesional relevante - Experiencia real de trabajo 💼',
        'Desarrollar un proyecto de emprendimiento - Aplicar conocimientos teóricos 🚀',
        'Aprender una habilidad técnica nueva - Excel, programación, design thinking 💻',
        'Crear una red de contactos profesionales - LinkedIn y networking eventos 🤝',
        'Participar en concursos académicos/empresariales - Como INNOVAULIMA 🏆'
      ],
      'Habilidades Transversales': [
        'Mejorar habilidades de presentación - Fundamental para cualquier carrera 🎤',
        'Aprender un segundo idioma a nivel conversacional - Ventaja competitiva 🌍',
        'Desarrollar pensamiento crítico - Análisis de casos y debates 🤔',
        'Practicar escritura profesional - Informes, propuestas, comunicación ✍️',
        'Estudiar tendencias globales de tu industria - Mantenerse actualizado 📊'
      ]
    }
  },
  connect: {
    id: 'connect',
    name: 'Connect',
    color: '#87CEEB', // Light blue
    emoji: '🗣️',
    hasSubcategories: false
  },
  create: {
    id: 'create',
    name: 'Create',
    color: '#FFA500', // Orange
    emoji: '🎨',
    hasSubcategories: false
  },
  universidad: {
    id: 'universidad',
    name: 'Universidad',
    color: '#FF8C00', // Dark orange
    emoji: '🎓',
    hasSubcategories: false
  },
  familia: {
    id: 'familia',
    name: 'Familia',
    color: '#4169E1', // Blue
    emoji: '👨‍👩‍👧‍👦',
    hasSubcategories: true,
    subcategories: {
      'En Casa': [
        'Noche de películas en familia 🎬',
        'Tarde de juegos de mesa 🎲',
        'Cocinar pizza casera todos juntos 🍕',
        'Karaoke en el salón 🎤',
        'Fortaleza de almohadas y sábanas 🏰',
        'Noche de talentos familiares 🌟',
        'Sesión de fotos divertidas 📸',
        'Preparar una receta en familia 🍳',
        'Día de parrilla/barbacoa 🍖',
        'Hacer galletas decoradas 🧁'
      ],
      'Actividades Culturales': [
        'Día de visita al cine o teatro 🎬',
        'Ver función ballet en el teatro 🩰',
        'Visitar museos interactivos 🏛️',
        'Conciertos al aire libre 🎵',
        'Ferias y festivales locales 🎡',
        'Cuentacuentos en bibliotecas 📚',
        'Mercados de agricultores 🛒',
        'Exposiciones de arte 🖼️',
        'Talleres de artesanía 🎨',
        'Espectáculos de marionetas 🎭'
      ],
      'Al Aire Libre': [
        'Partido de fútbol con los chicos ⚽',
        'Picnic en el campo 🧺',
        'Día de diversión en la playa 🏖️',
        'Día de parrilla/barbacoa 🔥',
        'Acampada en el patio 🏕️',
        'Búsqueda del tesoro 🗺️',
        'Volar cometas 🪁',
        'Montar en bicicleta 🚴',
        'Pescar en un lago 🎣',
        'Observar estrellas ⭐'
      ],
      'Aventuras Urbanas': [
        'Ir al parque 🏞️',
        'Ir por helado 🍦',
        'Día de parque de diversiones 🎢',
        'Día de centro comercial 🏬',
        'Tour en autobús turístico 🚌',
        'Zoológico o acuario local 🐅',
        'Supermercado 🛒',
        'Centros de trampolines 🤸',
        'Escape rooms familiares 🔓',
        'Paseos en barco ⛵'
      ],
      'Deportes y Ejercicio': [
        'Día de ir al estadio 🏟️',
        'Mini golf familiar ⛳',
        'Boliche con canaletas 🎳',
        'Piscina 🏊',
        'Tenis o ping pong 🏓',
        'Yoga familiar 🧘',
        'Carreras de obstáculos 🏃',
        'Patinaje sobre hielo ⛸️',
        'Senderismo con merienda 🥾',
        'Clases de baile familiares 💃'
      ],
      'Actividades Estacionales': [
        'Recoger frutas en granjas 🍎',
        'Laberinto de maíz 🌽',
        'Búsqueda de huevos 🥚',
        'Fogatas con malvaviscos 🔥',
        'Recolección de hojas 🍁',
        'Muñecos de nieve ⛄',
        'Decorar para festividades 🎄',
        'Mercados navideños 🎅',
        'Hacer cometas primaverales 🪁',
        'Parques acuáticos 💦'
      ],
      'Proyectos Creativos': [
        'Pintar cuadros en lienzo 🖼️',
        'Hacer pulseras y collares 📿',
        'Construir modelos o puzzles 🧩',
        'Charlas o charadas 🗣️',
        'Scrapbooking con recuerdos ✂️',
        'Instrumentos musicales caseros 🎵',
        'Decorar camisetas 👕',
        'Huerto de hierbas aromáticas 🌿',
        'Construir casas para pájaros 🏠',
        'Experimentos científicos 🔬'
      ],
      'Planes Especiales': [
        'Intercambio de roles por un día 🔄',
        'Día sin tecnología 📵',
        'Cápsula del tiempo familiar ⏰',
        'Búsqueda del tesoro nocturna 🔦',
        'Documental familiar casero 🎬',
        'Mini vacaciones de fin de semana 🏖️',
        'Crear tradiciones únicas 🎯',
        'Jardinería familiar 🌱',
        'Crear álbum digital familiar 📱',
        'Granjas educativas 🐄'
      ]
    }
  },
  trabajo: {
    id: 'trabajo',
    name: 'Trabajo',
    color: '#808080', // Gray
    emoji: '💼',
    hasSubcategories: false
  },
  pareja: {
    id: 'pareja',
    name: 'Pareja',
    color: '#FF0000', // Red
    emoji: '💕',
    hasSubcategories: false
  },
  gym: {
    id: 'gym',
    name: 'Gym',
    color: '#00FF00', // Green
    emoji: '💪',
    hasSubcategories: false
  },
  bienestar: {
    id: 'bienestar',
    name: 'Bienestar',
    color: '#808080', // Gray
    emoji: '🧘',
    hasSubcategories: false
  },
  deporte: {
    id: 'deporte',
    name: 'Deporte',
    color: '#20B2AA', // Teal
    emoji: '🏄‍♂️',
    hasSubcategories: true,
    subcategories: [
      'Fútbol ⚽️',
      'Tenis 🥎',
      'Natación 🏊‍♂️',
      'Surf 🏄‍♂️🌊',
      'Paddle 🏓',
      'Equitación 🏇',
      'Muay Thai 🥊',
      'Voleibol 🏐',
      'Básquetbol 🏀',
      'Rugby 🏉',
      'Golf ⛳️🏌️‍♀️',
      'Polo 🥅',
      'Hockey 🏑',
      'Ballet 🩰',
      'Gimnasia 🤸',
      'Karate 🥋'
    ]
  },
  viajes: {
    id: 'viajes',
    name: 'Viajes',
    color: '#FFA500', // Orange
    emoji: '✈️',
    hasSubcategories: false
  },
  social: {
    id: 'social',
    name: 'Social (Friends)',
    color: '#FF8C00', // Dark orange
    emoji: '👥',
    hasSubcategories: false
  }
}

// Función para obtener todas las esferas como array
export const getSpheresArray = () => {
  return Object.values(spheres)
}

// Función para obtener una esfera por ID
export const getSphereById = (id) => {
  return spheres[id]
}

// Función para obtener esferas con subcategorías
export const getSpheresWithSubcategories = () => {
  return Object.values(spheres).filter(sphere => sphere.hasSubcategories)
}

// Función para obtener subcategorías de una esfera
export const getSphereSubcategories = (sphereId, customActivities = {}) => {
  const sphere = spheres[sphereId]
  if (!sphere || !sphere.hasSubcategories) return []
  
  let baseSubcategories = []
  if (Array.isArray(sphere.subcategories)) {
    baseSubcategories = sphere.subcategories
  } else if (typeof sphere.subcategories === 'object') {
    baseSubcategories = Object.keys(sphere.subcategories)
  }
  
  // Agregar actividades personalizadas simples (arrays)
  const customSimple = customActivities[sphereId]
  if (Array.isArray(customSimple)) {
    baseSubcategories = [...baseSubcategories, ...customSimple]
  }
  
  // Agregar categorías personalizadas (objetos)
  if (customSimple && typeof customSimple === 'object' && !Array.isArray(customSimple)) {
    const customCategories = Object.keys(customSimple)
    baseSubcategories = [...baseSubcategories, ...customCategories]
  }
  
  console.log('Final subcategories for', sphereId, ':', baseSubcategories)
  return baseSubcategories
}

// Función para obtener subcategorías anidadas de una esfera
export const getSphereNestedSubcategories = (sphereId, customActivities = {}) => {
  const sphere = spheres[sphereId]
  if (!sphere || !sphere.hasSubcategories) return {}
  
  let baseSubcategories = {}
  if (typeof sphere.subcategories === 'object' && !Array.isArray(sphere.subcategories)) {
    baseSubcategories = { ...sphere.subcategories }
  }
  
  console.log('Base subcategories for', sphereId, ':', baseSubcategories)
  console.log('Custom activities for', sphereId, ':', customActivities[sphereId])
  
  // Agregar actividades personalizadas por categoría
  const customByCategory = customActivities[sphereId]
  if (customByCategory && typeof customByCategory === 'object' && !Array.isArray(customByCategory)) {
    console.log('Processing custom categories:', Object.keys(customByCategory))
    Object.keys(customByCategory).forEach(category => {
      if (!baseSubcategories[category]) {
        baseSubcategories[category] = []
        console.log('Created new category:', category)
      }
      baseSubcategories[category] = [...baseSubcategories[category], ...customByCategory[category]]
      console.log('Updated category', category, 'with activities:', baseSubcategories[category])
    })
  }
  
  console.log('Final subcategories:', baseSubcategories)
  return baseSubcategories
}
