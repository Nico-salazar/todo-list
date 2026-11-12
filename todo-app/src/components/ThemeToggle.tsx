import { useLayoutEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const themeStorageKey = 'todo-app-theme'

function getInitialTheme(): Theme {
  try {
    return window.localStorage.getItem(themeStorageKey) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme

    try {
      window.localStorage.setItem(themeStorageKey, theme)
    } catch {
      // The selected theme still works for the current page session.
    }
  }, [theme])

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-pressed={theme === 'light'}
      onClick={handleToggleTheme}
    >
      <span aria-hidden="true">{theme === 'dark' ? '☀' : '☾'}</span>
      <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
    </button>
  )
}
