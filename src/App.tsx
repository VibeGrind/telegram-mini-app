import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppRoot } from '@telegram-apps/telegram-ui'
import { useTelegramTheme } from './hooks/useTelegramTheme'
import TelegramClient from './pages/TelegramClient'

function App() {
  const { platform, appearance } = useTelegramTheme()
  const [isReady, setIsReady] = useState(false)

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

  if (!isReady) {
    return null
  }

  return (
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
  )
}

export default App
