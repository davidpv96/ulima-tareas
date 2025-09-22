export const translations = {
  es: {
    // App General
    app: {
      title: "Sphere - Calendar & Goals",
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      cancel: "Cancelar",
      save: "Guardar",
      delete: "Eliminar",
      edit: "Editar",
      add: "Agregar",
      close: "Cerrar",
      search: "Buscar",
      today: "Hoy",
      yesterday: "Ayer",
      tomorrow: "Mañana",
      apply: "Aplicar"
    },

    // Navigation
    navigation: {
      home: "Inicio",
      agenda: "Agenda",
      day: "Día",
      week: "Semana",
      month: "Mes",
      statistics: "Estadísticas",
      goals: "Mi Mundo en la Cima",
      planner: "Planificador Semanal",
      motivation: "Motivación",
      visionBoard: "Mi Tablero de Visión"
    },

    // Header
    header: {
      searchPlaceholder: "Buscar tareas...",
      userMenu: "Menú de usuario",
      settings: "Ajustes",
      logout: "Cerrar sesión",
      language: "Idioma"
    },

    // Search
    search: {
      typeToSearch: "Escribe algo para buscar en tus tareas",
      noResults: "Sin resultados",
      noResultsMessage: "No se encontraron tareas que coincidan con tu búsqueda",
      resultsFound: "resultados encontrados"
    },

    // Sidebar
    sidebar: {
      views: "Vistas",
      tools: "Herramientas",
      user: "Usuario",
      email: "usuario@ejemplo.com"
    },

    // Tasks
    tasks: {
      newTask: "Nueva tarea",
      editTask: "Editar tarea",
      deleteTask: "Eliminar tarea",
      completeTask: "Completar tarea",
      taskTitle: "Título de la tarea",
      taskDescription: "Descripción",
      taskDate: "Fecha",
      taskTime: "Horario",
      taskSphere: "Esfera",
      startTime: "Hora inicio",
      endTime: "Hora fin",
      timeConflict: "Conflicto de horario",
      invalidTimeRange: "La hora de fin debe ser posterior a la hora de inicio",
      durationError: "La duración no puede ser mayor a 24 horas",
      required: "Campo obligatorio",
      noTasks: "No hay tareas",
      noTasksToday: "No tienes tareas para hoy",
      upcomingTasks: "Próximas tareas",
      completedTasks: "Tareas completadas",
      addTaskMessage: "Toca el botón + para agregar una nueva tarea",
      daySummary: "Resumen del día",
      completed: "completadas",
      pending: "pendientes",
      inDays: "En",
      in: "En",
      day: "día",
      days: "días",
      minutes: "min",
      now: "¡Ahora!",
      taskTitlePlaceholder: "¿Qué necesitas hacer?",
      taskDescriptionPlaceholder: "Detalles adicionales...",
      invalidTimeFormat: "Formato de horario inválido"
    },

    // Goals
    goals: {
      title: "Mi Mundo en la Cima",
      subtitle: "Metas 2025",
      myGoals: "Mis Metas",
      addGoal: "Agregar Meta",
      addStep: "Agregar Paso",
      goalTitle: "Título de la meta",
      goalDate: "Fecha objetivo",
      goalDescription: "Descripción (opcional)",
      stepTitle: "Título del paso",
      stepDescription: "Descripción (opcional)",
      progress: "Progreso",
      noGoals: "No tienes metas para 2025",
      noGoalsMessage: "Agrega tu primera meta para comenzar",
      noSteps: "No hay pasos definidos",
      noStepsMessage: "Agrega pasos para alcanzar esta meta",
      selectGoal: "Selecciona una meta",
      selectGoalMessage: "Elige una meta para ver y gestionar sus pasos",
      exampleGoal: "Ej: Creación de Startup",
      exampleStep: "Ej: Creación del equipo",
      describeGoal: "Describe tu meta...",
      describeStep: "Describe este paso...",
      required: "Por favor completa todos los campos obligatorios"
    },

    // Week Planner
    planner: {
      title: "Planificador Semanal",
      subtitle: "Organiza tu semana",
      addNote: "Agregar Nota",
      editNote: "Editar Nota",
      deleteNote: "Eliminar Nota",
      noteTitle: "Título de la nota",
      noteContent: "Contenido",
      priority: "Prioridad",
      high: "Alta",
      medium: "Media",
      low: "Baja",
      noNotes: "No tienes notas",
      noNotesMessage: "Agrega tu primera nota para comenzar",
      searchNotes: "Buscar notas...",
      exampleTitle: "Ej: Reunión importante",
      exampleContent: "Escribe el contenido de tu nota..."
    },

    // Motivation
    motivation: {
      title: "Motivación",
      subtitle: "Tu dosis diaria de inspiración",
      newQuote: "Nueva frase",
      dailyQuote: "Frase del día",
      dailyQuoteMessage: "Esta frase se mantendrá hasta mañana, cuando se actualizará automáticamente.",
      needMoreMotivation: "¿Necesitas más motivación?",
      motivationMessage: "La frase cambia automáticamente cada día, pero puedes obtener una nueva cuando quieras.",
      tips: "Consejos de motivación",
      tip1Title: "Establece metas claras",
      tip1Content: "Define objetivos específicos y medibles para mantenerte enfocado.",
      tip2Title: "Celebra los pequeños logros",
      tip2Content: "Reconoce cada paso hacia tu objetivo, por pequeño que sea.",
      tip3Title: "Mantén una actitud positiva",
      tip3Content: "La mentalidad positiva atrae resultados positivos.",
      tip4Title: "Toma acción diaria",
      tip4Content: "Pequeñas acciones consistentes llevan a grandes resultados."
    },

    // Motivational Quotes
    motivationalQuotes: [
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
      }
    ],

    // Vision Board
    visionBoard: {
      title: "Mi Tablero de Visión 2025",
      subtitle: "Visualiza tus metas y sueños",
      addImage: "Agregar Imagen",
      selectImage: "Seleccionar imagen",
      imageTitle: "Título de la imagen",
      imageDescription: "Descripción (opcional)",
      selectImageMessage: "Selecciona una imagen a la vez",
      processingImage: "Procesando imagen...",
      multipleImagesMessage: "Puedes seleccionar múltiples imágenes a la vez",
      noImages: "Tu Tablero de Visión está vacío",
      noImagesMessage: "Agrega imágenes que representen tus metas y sueños para 2025",
      startVisionBoard: "Comenzar mi Tablero de Visión",
      createVisionBoard: "Crea tu Tablero de Visión 2025",
      createMessage: "Visualiza tus metas y sueños con imágenes que te inspiren cada día",
      imageCount: "imágenes",
      download: "Descargar",
      delete: "Eliminar",
      exampleTitle: "Ej: Mi casa soñada",
      exampleDescription: "Describe qué representa esta imagen para ti...",
      maxImagesError: "Solo puedes subir máximo",
      maxImagesReached: "Has alcanzado el límite máximo de",
      imageLoadError: "Error al cargar la imagen. Intenta de nuevo.",
      invalidFileType: "Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.)"
    },

    // Calendar Views
    calendar: {
      noTasks: "No hay tareas para este día",
      noTasksWeek: "No hay tareas para esta semana",
      noTasksMonth: "No hay tareas para este mes",
      clickToAdd: "Haz clic para agregar una tarea",
      previous: "Anterior",
      next: "Siguiente",
      goToToday: "Ir a hoy",
      selectDate: "Seleccionar fecha",
      year: "Año",
      month: "Mes",
      quickNavigation: "Navegación rápida",
      previousMonth: "Mes anterior",
      nextMonth: "Mes siguiente"
    },

    // Statistics
    statistics: {
      title: "Estadísticas",
      subtitle: "Tu progreso en las diferentes esferas de vida",
      totalTasks: "Total de tareas",
      completedTasks: "Completadas",
      pendingTasks: "Pendientes",
      completionRate: "Tasa de finalización",
      tasksBySphere: "Tareas por esfera",
      tasksByMonth: "Tareas por mes",
      productivity: "Productividad",
      generalProgress: "Progreso general",
      bySpheres: "Por esferas",
      completed: "completadas",
      of: "de",
      tasksCompleted: "tareas completadas",
      noTasksMessage: "No hay tareas para mostrar estadísticas",
      excellentWork: "¡Excelente trabajo! 🎉",
      goodProgress: "¡Vas por buen camino! 💪",
      keepGoing: "¡Sigue así! 🌟",
      dominatingGoals: "Estás dominando tus objetivos",
      keepRythm: "Mantén el ritmo y sigue progresando",
      everyStepCounts: "Cada paso cuenta hacia tus metas"
    },

    // Home View
    home: {
      welcome: "Bienvenido a",
      subtitle: "Tu calendario y gestor de metas personal",
      todayTasks: "Tareas de hoy",
      upcomingTasks: "Próximas tareas",
      activeSpheres: "Esferas activas",
      mostActiveSpheres: "Esferas más activas",
      quickStats: "Estadísticas rápidas",
      quickActions: "Acciones rápidas",
      totalTasks: "Total de tareas",
      completedTasks: "Completadas",
      pendingTasks: "Pendientes",
      todayProgress: "Progreso de hoy",
      noTasksToday: "No tienes tareas para hoy",
      noUpcomingTasks: "No tienes tareas próximas",
      viewAll: "Ver todas",
      viewAllTasks: "Ver todas las tareas",
      dailyView: "Vista diaria",
      weeklyView: "Vista semanal",
      monthlyView: "Vista mensual",
      viewProgress: "Ver progreso"
    },

    // Spheres
    spheres: {
      work: "Trabajo",
      personal: "Personal",
      health: "Salud",
      learning: "Aprendizaje",
      family: "Familia",
      finance: "Finanzas",
      social: "Social",
      hobby: "Hobby",
      meta: "Meta"
    },

    // Days of week
    days: {
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
      sunday: "Domingo",
      mon: "Lun",
      tue: "Mar",
      wed: "Mié",
      thu: "Jue",
      fri: "Vie",
      sat: "Sáb",
      sun: "Dom"
    },

    // Months
    months: {
      january: "Enero",
      february: "Febrero",
      march: "Marzo",
      april: "Abril",
      may: "Mayo",
      june: "Junio",
      july: "Julio",
      august: "Agosto",
      september: "Septiembre",
      october: "Octubre",
      november: "Noviembre",
      december: "Diciembre",
      jan: "Ene",
      feb: "Feb",
      mar: "Mar",
      apr: "Abr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Ago",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dic"
    }
  },

  en: {
    // App General
    app: {
      title: "Sphere - Calendar & Goals",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      close: "Close",
      search: "Search",
      today: "Today",
      yesterday: "Yesterday",
      tomorrow: "Tomorrow",
      apply: "Apply"
    },

    // Navigation
    navigation: {
      home: "Home",
      agenda: "Agenda",
      day: "Day",
      week: "Week",
      month: "Month",
      statistics: "Statistics",
      goals: "My World on Top",
      planner: "Week Planner",
      motivation: "Motivation",
      visionBoard: "My Vision Board"
    },

    // Header
    header: {
      searchPlaceholder: "Search tasks...",
      userMenu: "User menu",
      settings: "Settings",
      logout: "Logout",
      language: "Language"
    },

    // Search
    search: {
      typeToSearch: "Type something to search in your tasks",
      noResults: "No results",
      noResultsMessage: "No tasks found that match your search",
      resultsFound: "results found"
    },

    // Sidebar
    sidebar: {
      views: "Views",
      tools: "Tools",
      user: "User",
      email: "user@example.com"
    },

    // Tasks
    tasks: {
      newTask: "New task",
      editTask: "Edit task",
      deleteTask: "Delete task",
      completeTask: "Complete task",
      taskTitle: "Task title",
      taskDescription: "Description",
      taskDate: "Date",
      taskTime: "Schedule",
      taskSphere: "Life Sphere",
      startTime: "Start time",
      endTime: "End time",
      timeConflict: "Time conflict",
      invalidTimeRange: "End time must be after start time",
      durationError: "Duration cannot be more than 24 hours",
      required: "Required field",
      noTasks: "No tasks",
      noTasksToday: "You have no tasks for today",
      upcomingTasks: "Upcoming tasks",
      completedTasks: "Completed tasks",
      addTaskMessage: "Tap the + button to add a new task",
      daySummary: "Day Summary",
      completed: "completed",
      pending: "pending",
      inDays: "In",
      in: "In",
      day: "day",
      days: "days",
      minutes: "min",
      now: "Now!",
      taskTitlePlaceholder: "What do you need to do?",
      taskDescriptionPlaceholder: "Additional details...",
      invalidTimeFormat: "Invalid time format"
    },

    // Goals
    goals: {
      title: "My World on Top",
      subtitle: "Goals 2025",
      myGoals: "My Goals",
      addGoal: "Add Goal",
      addStep: "Add Step",
      goalTitle: "Goal title",
      goalDate: "Target date",
      goalDescription: "Description (optional)",
      stepTitle: "Step title",
      stepDescription: "Description (optional)",
      progress: "Progress",
      noGoals: "You have no goals for 2025",
      noGoalsMessage: "Add your first goal to get started",
      noSteps: "No steps defined",
      noStepsMessage: "Add steps to achieve this goal",
      selectGoal: "Select a goal",
      selectGoalMessage: "Choose a goal to view and manage its steps",
      exampleGoal: "Ex: Startup Creation",
      exampleStep: "Ex: Team creation",
      describeGoal: "Describe your goal...",
      describeStep: "Describe this step...",
      required: "Please complete all required fields"
    },

    // Week Planner
    planner: {
      title: "Week Planner",
      subtitle: "Organize your week",
      addNote: "Add Note",
      editNote: "Edit Note",
      deleteNote: "Delete Note",
      noteTitle: "Note title",
      noteContent: "Content",
      priority: "Priority",
      high: "High",
      medium: "Medium",
      low: "Low",
      noNotes: "You have no notes",
      noNotesMessage: "Add your first note to get started",
      searchNotes: "Search notes...",
      exampleTitle: "Ex: Important meeting",
      exampleContent: "Write your note content..."
    },

    // Motivation
    motivation: {
      title: "Motivation",
      subtitle: "Your daily dose of inspiration",
      newQuote: "New quote",
      dailyQuote: "Quote of the day",
      dailyQuoteMessage: "This quote will remain until tomorrow, when it will update automatically.",
      needMoreMotivation: "Need more motivation?",
      motivationMessage: "The quote changes automatically each day, but you can get a new one whenever you want.",
      tips: "Motivation tips",
      tip1Title: "Set clear goals",
      tip1Content: "Define specific and measurable objectives to stay focused.",
      tip2Title: "Celebrate small wins",
      tip2Content: "Recognize every step toward your goal, no matter how small.",
      tip3Title: "Maintain a positive attitude",
      tip3Content: "Positive mindset attracts positive results.",
      tip4Title: "Take daily action",
      tip4Content: "Small consistent actions lead to great results."
    },

    // Motivational Quotes
    motivationalQuotes: [
      {
        text: "Success is not the key to happiness. Happiness is the key to success.",
        author: "Albert Schweitzer",
        category: "Success"
      },
      {
        text: "Don't worry about failures, worry about the chances you miss when you don't even try.",
        author: "Jack Canfield",
        category: "Perseverance"
      },
      {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "Dreams"
      },
      {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
        category: "Passion"
      },
      {
        text: "There are no shortcuts to any place worth going.",
        author: "Beverly Sills",
        category: "Effort"
      },
      {
        text: "Life is what happens to you while you're busy making other plans.",
        author: "John Lennon",
        category: "Life"
      },
      {
        text: "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
        author: "Helen Keller",
        category: "Optimism"
      },
      {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
        category: "Future"
      },
      {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius",
        category: "Persistence"
      },
      {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
        category: "Decision"
      },
      {
        text: "Success is the sum of small efforts repeated day in and day out.",
        author: "Robert Collier",
        category: "Consistency"
      },
      {
        text: "Nothing is impossible, the word itself says 'I'm possible'.",
        author: "Audrey Hepburn",
        category: "Possibilities"
      },
      {
        text: "Motivation gets you started. Habit keeps you going.",
        author: "Jim Ryun",
        category: "Habits"
      },
      {
        text: "Every day is a new opportunity to change your life.",
        author: "Anonymous",
        category: "Opportunity"
      },
      {
        text: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson",
        category: "Excellence"
      },
      {
        text: "Don't wait for the perfect moment, take the moment and make it perfect.",
        author: "Anonymous",
        category: "Action"
      }
    ],

    // Vision Board
    visionBoard: {
      title: "My Vision Board 2025",
      subtitle: "Visualize your goals and dreams",
      addImage: "Add Image",
      selectImage: "Select image",
      imageTitle: "Image title",
      imageDescription: "Description (optional)",
      selectImageMessage: "Select one image at a time",
      processingImage: "Processing image...",
      multipleImagesMessage: "You can select multiple images at once",
      noImages: "Your Vision Board is empty",
      noImagesMessage: "Add images that represent your goals and dreams for 2025",
      startVisionBoard: "Start my Vision Board",
      createVisionBoard: "Create your Vision Board 2025",
      createMessage: "Visualize your goals and dreams with images that inspire you every day",
      imageCount: "images",
      download: "Download",
      delete: "Delete",
      exampleTitle: "Ex: My dream house",
      exampleDescription: "Describe what this image represents to you...",
      maxImagesError: "You can only upload a maximum of",
      maxImagesReached: "You have reached the maximum limit of",
      imageLoadError: "Error loading image. Try again.",
      invalidFileType: "Only image files are allowed (JPG, PNG, GIF, etc.)"
    },

    // Calendar Views
    calendar: {
      noTasks: "No tasks for this day",
      noTasksWeek: "No tasks for this week",
      noTasksMonth: "No tasks for this month",
      clickToAdd: "Click to add a task",
      previous: "Previous",
      next: "Next",
      goToToday: "Go to today",
      selectDate: "Select date",
      year: "Year",
      month: "Month",
      quickNavigation: "Quick navigation",
      previousMonth: "Previous month",
      nextMonth: "Next month"
    },

    // Statistics
    statistics: {
      title: "Statistics",
      totalTasks: "Total tasks",
      completedTasks: "Completed tasks",
      pendingTasks: "Pending tasks",
      completionRate: "Completion rate",
      tasksBySphere: "Tasks by sphere",
      tasksByMonth: "Tasks by month",
      productivity: "Productivity"
    },

    // Home View
    home: {
      welcome: "Welcome to",
      subtitle: "Your personal calendar and goals manager",
      todayTasks: "Today's tasks",
      upcomingTasks: "Upcoming tasks",
      activeSpheres: "Active spheres",
      mostActiveSpheres: "Most active spheres",
      quickStats: "Quick stats",
      quickActions: "Quick actions",
      totalTasks: "Total tasks",
      completedTasks: "Completed",
      pendingTasks: "Pending",
      todayProgress: "Today's progress",
      noTasksToday: "You have no tasks for today",
      noUpcomingTasks: "You have no upcoming tasks",
      viewAll: "View all",
      viewAllTasks: "View all tasks",
      dailyView: "Daily view",
      weeklyView: "Weekly view",
      monthlyView: "Monthly view",
      viewProgress: "View progress"
    },

    // Spheres
    spheres: {
      work: "Work",
      personal: "Personal",
      health: "Health",
      learning: "Learning",
      family: "Family",
      finance: "Finance",
      social: "Social",
      hobby: "Hobby",
      meta: "Goal"
    },

    // Days of week
    days: {
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
      sunday: "Sunday",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun"
    },

    // Months
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December",
      jan: "Jan",
      feb: "Feb",
      mar: "Mar",
      apr: "Apr",
      may: "May",
      jun: "Jun",
      jul: "Jul",
      aug: "Aug",
      sep: "Sep",
      oct: "Oct",
      nov: "Nov",
      dec: "Dec"
    },

    // Statistics (updated section)
    statistics: {
      title: "Statistics",
      subtitle: "Your progress in the different spheres of life",
      totalTasks: "Total tasks",
      completedTasks: "Completed",
      pendingTasks: "Pending",
      completionRate: "Completion rate",
      mostProductiveDay: "Most productive day",
      averageTasksPerDay: "Average tasks per day",
      tasksBySphere: "Tasks by sphere",
      weeklyProgress: "Weekly progress",
      monthlyProgress: "Monthly progress",
      productivity: "Productivity",
      generalProgress: "General progress",
      bySpheres: "By spheres",
      completed: "completed",
      of: "of",
      tasksCompleted: "tasks completed",
      noTasksMessage: "No tasks to show statistics",
      excellentWork: "Excellent work! 🎉",
      goodProgress: "You're on the right track! 💪",
      keepGoing: "Keep it up! 🌟",
      dominatingGoals: "You're dominating your goals",
      keepRythm: "Keep the pace and keep progressing",
      everyStepCounts: "Every step counts towards your goals"
    }
  }
}
