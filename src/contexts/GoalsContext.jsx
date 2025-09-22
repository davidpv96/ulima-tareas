import React, { createContext, useContext } from 'react'
import { useGoals } from '../hooks/useGoals'

const GoalsContext = createContext()

export const GoalsProvider = ({ children }) => {
  const goalsData = useGoals()
  
  return (
    <GoalsContext.Provider value={goalsData}>
      {children}
    </GoalsContext.Provider>
  )
}

export const useGoalsContext = () => {
  const context = useContext(GoalsContext)
  if (!context) {
    throw new Error('useGoalsContext must be used within a GoalsProvider')
  }
  return context
}
