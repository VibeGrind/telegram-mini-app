import { useState, useEffect } from 'react'
import {
  List,
  Section,
  Cell,
  Switch,
  Title,
  Caption,
  IconButton,
} from '@telegram-apps/telegram-ui'
import { useTheme } from '../App'
import './Settings.css'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const { appearance, setAppearance } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [notificationSound, setNotificationSound] = useState(true)
  const [notificationVibrate, setNotificationVibrate] = useState(true)
  const [messagePreview, setMessagePreview] = useState(true)

  const [autoPlayMedia, setAutoPlayMedia] = useState(true)
  const [autoDownloadPhotos, setAutoDownloadPhotos] = useState(true)
  const [autoDownloadVideos, setAutoDownloadVideos] = useState(false)

  const [enterToSend, setEnterToSend] = useState(true)
  const [showOnlineStatus, setShowOnlineStatus] = useState(true)
  const [readReceipts, setReadReceipts] = useState(true)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="settings-overlay"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1000,
        }}
      />
      <div
        className="settings-content"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--tgui--bg_color, #fff)',
          zIndex: 1001,
          overflowY: 'auto',
        }}
      >
        <div className="settings-header" style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          borderBottom: '1px solid var(--tgui--secondary_bg_color, #e0e0e0)',
          position: 'sticky',
          top: 0,
          backgroundColor: 'var(--tgui--bg_color, #fff)',
          zIndex: 10,
        }}>
          <IconButton mode="plain" size="m" onClick={onClose}>
            ←
          </IconButton>
          <Title level="2" style={{ margin: 0, marginLeft: '12px' }}>Настройки</Title>
        </div>
      <div className="settings">
        <List>
          {/* Notifications */}
          <Section header="Уведомления">
            <Cell
              Component="label"
              before={<span className="settings-icon">🔔</span>}
              after={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Уведомления</div>
                <Caption level="2">Получать уведомления о новых сообщениях</Caption>
              </div>
            </Cell>
            {notifications && (
              <>
                <Cell
                  Component="label"
                  before={<span className="settings-icon">🔊</span>}
                  after={
                    <Switch
                      checked={notificationSound}
                      onChange={(e) => setNotificationSound(e.target.checked)}
                    />
                  }
                >
                  Звук уведомлений
                </Cell>
                <Cell
                  Component="label"
                  before={<span className="settings-icon">📳</span>}
                  after={
                    <Switch
                      checked={notificationVibrate}
                      onChange={(e) => setNotificationVibrate(e.target.checked)}
                    />
                  }
                >
                  Вибрация
                </Cell>
                <Cell
                  Component="label"
                  before={<span className="settings-icon">👁️</span>}
                  after={
                    <Switch
                      checked={messagePreview}
                      onChange={(e) => setMessagePreview(e.target.checked)}
                    />
                  }
                >
                  Предпросмотр сообщений
                </Cell>
              </>
            )}
          </Section>

          {/* Privacy */}
          <Section header="Конфиденциальность">
            <Cell
              Component="label"
              before={<span className="settings-icon">👁️</span>}
              after={
                <Switch
                  checked={showOnlineStatus}
                  onChange={(e) => setShowOnlineStatus(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Показывать статус "онлайн"</div>
                <Caption level="2">Другие пользователи увидят когда вы онлайн</Caption>
              </div>
            </Cell>
            <Cell
              Component="label"
              before={<span className="settings-icon">✓</span>}
              after={
                <Switch
                  checked={readReceipts}
                  onChange={(e) => setReadReceipts(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Отметки о прочтении</div>
                <Caption level="2">Отправлять отметки о прочтении сообщений</Caption>
              </div>
            </Cell>
            <Cell
              before={<span className="settings-icon">🔒</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Последнее посещение
            </Cell>
            <Cell
              before={<span className="settings-icon">📱</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Номер телефона
            </Cell>
            <Cell
              before={<span className="settings-icon">📷</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Фото профиля
            </Cell>
          </Section>

          {/* Data and Storage */}
          <Section header="Данные и хранилище">
            <Cell
              Component="label"
              before={<span className="settings-icon">📷</span>}
              after={
                <Switch
                  checked={autoDownloadPhotos}
                  onChange={(e) => setAutoDownloadPhotos(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Автозагрузка фото</div>
                <Caption level="2">Загружать фото автоматически</Caption>
              </div>
            </Cell>
            <Cell
              Component="label"
              before={<span className="settings-icon">🎬</span>}
              after={
                <Switch
                  checked={autoDownloadVideos}
                  onChange={(e) => setAutoDownloadVideos(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Автозагрузка видео</div>
                <Caption level="2">Загружать видео автоматически</Caption>
              </div>
            </Cell>
            <Cell
              Component="label"
              before={<span className="settings-icon">▶️</span>}
              after={
                <Switch
                  checked={autoPlayMedia}
                  onChange={(e) => setAutoPlayMedia(e.target.checked)}
                />
              }
            >
              Автовоспроизведение медиа
            </Cell>
            <Cell
              before={<span className="settings-icon">💾</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Использование хранилища
            </Cell>
          </Section>

          {/* Appearance */}
          <Section header="Оформление">
            <Cell
              Component="label"
              before={<span className="settings-icon">🌙</span>}
              after={
                <Switch
                  checked={appearance === 'dark'}
                  onChange={(e) => setAppearance(e.target.checked ? 'dark' : 'light')}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Тёмная тема</div>
                <Caption level="2">Использовать тёмное оформление</Caption>
              </div>
            </Cell>
            <Cell
              before={<span className="settings-icon">🎨</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Цветовая схема
            </Cell>
            <Cell
              before={<span className="settings-icon">🖼️</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Фон чата
            </Cell>
            <Cell
              before={<span className="settings-icon">🔤</span>}
              after={<span className="settings-chevron">›</span>}
            >
              Размер шрифта
            </Cell>
          </Section>

          {/* Chat Behavior */}
          <Section header="Поведение чатов">
            <Cell
              Component="label"
              before={<span className="settings-icon">⏎</span>}
              after={
                <Switch
                  checked={enterToSend}
                  onChange={(e) => setEnterToSend(e.target.checked)}
                />
              }
            >
              <div className="settings-cell-content">
                <div>Enter для отправки</div>
                <Caption level="2">Shift+Enter для новой строки</Caption>
              </div>
            </Cell>
          </Section>

          {/* Language */}
          <Section header="Язык">
            <Cell
              before={<span className="settings-icon">🌐</span>}
              after={
                <div className="settings-value">
                  Русский <span className="settings-chevron">›</span>
                </div>
              }
            >
              Язык приложения
            </Cell>
          </Section>
        </List>

      </div>
      </div>
    </>
  )
}
