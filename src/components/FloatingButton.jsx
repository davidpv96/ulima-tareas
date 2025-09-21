import React from 'react'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

const FloatingButton = ({ onClick }) => {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-soft-blue to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center"
      aria-label="Añadir nueva tarea"
    >
      <motion.div
        initial={{ rotate: 0 }}
        whileHover={{ rotate: 90 }}
        transition={{ duration: 0.2 }}
      >
        <Plus className="w-6 h-6" />
      </motion.div>
    </motion.button>
  )
}

export default FloatingButton
