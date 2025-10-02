import { useEffect, useState, createContext, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { useTelegramTheme } from './hooks/useTelegramTheme'
import TelegramClient from './pages/TelegramClient'

type Appearance = 'light' | 'dark'

interface ThemeContextType {
  appearance: Appearance
  setAppearance: (appearance: Appearance) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

function App() {
  const { platform } = useTelegramTheme()
  const [appearance, setAppearance] = useState<Appearance>('light')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Appearance | null
    if (savedTheme) {
      setAppearance(savedTheme)
    } else {
      // Fallback to system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setAppearance(isDark ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    // Expand Telegram WebApp to full height
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready()
      window.Telegram.WebApp.expand()
      setIsReady(true)
    } else {
      // For development outside Telegram
      setIsReady(true)
    }
  }, [])

  const handleSetAppearance = (newAppearance: Appearance) => {
    setAppearance(newAppearance)
    localStorage.setItem('theme', newAppearance)
  }

  if (!isReady) {
    return null
  }

  return (
    <ThemeContext.Provider value={{ appearance, setAppearance: handleSetAppearance }}>
      <AppRoot platform={platform === 'android' ? 'base' : platform} appearance={appearance}>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            <Route path="/" element={<TelegramClient />} />
            <Route path="/chat/:chatId" element={<TelegramClient />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppRoot>
    </ThemeContext.Provider>
  )
}

export default App
