// Shims for Spark hooks when building for production
import { useState, useEffect } from 'react'

export function useKV<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue
    
    try {
      const stored = localStorage.getItem(`kv_${key}`)
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(`kv_${key}`, JSON.stringify(value))
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  }, [key, value])

  const deleteValue = () => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.removeItem(`kv_${key}`)
      setValue(defaultValue)
    } catch (error) {
      console.warn('Failed to delete from localStorage:', error)
    }
  }

  return [value, setValue, deleteValue]
}