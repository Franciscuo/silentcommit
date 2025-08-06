// Production shim for spark global object
declare global {
  interface Window {
    spark: {
      llmPrompt: (strings: string[], ...values: any[]) => string
      llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>
      user: () => Promise<{ avatarUrl: string; email: string; id: string; isOwner: boolean; login: string }>
      kv: {
        keys: () => Promise<string[]>
        get: <T>(key: string) => Promise<T | undefined>
        set: <T>(key: string, value: T) => Promise<void>
        delete: (key: string) => Promise<void>
      }
    }
  }
}

// Mock implementation for production builds
if (typeof window !== 'undefined' && !window.spark) {
  window.spark = {
    llmPrompt: (strings: string[], ...values: any[]) => {
      return strings.map((str, i) => str + (values[i] || '')).join('')
    },
    
    llm: async (prompt: string) => {
      console.warn('LLM functionality not available in production build')
      return 'LLM not available in production'
    },
    
    user: async () => ({
      avatarUrl: '',
      email: '',
      id: 'production-user',
      isOwner: false,
      login: 'production-user'
    }),
    
    kv: {
      keys: async () => {
        const keys = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key?.startsWith('kv_')) {
            keys.push(key.substring(3))
          }
        }
        return keys
      },
      
      get: async <T>(key: string): Promise<T | undefined> => {
        try {
          const value = localStorage.getItem(`kv_${key}`)
          return value ? JSON.parse(value) : undefined
        } catch {
          return undefined
        }
      },
      
      set: async <T>(key: string, value: T): Promise<void> => {
        try {
          localStorage.setItem(`kv_${key}`, JSON.stringify(value))
        } catch (error) {
          console.warn('Failed to save to localStorage:', error)
        }
      },
      
      delete: async (key: string): Promise<void> => {
        try {
          localStorage.removeItem(`kv_${key}`)
        } catch (error) {
          console.warn('Failed to delete from localStorage:', error)
        }
      }
    }
  }
}

export {}