import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Accessibility from './Accessibility'
import Privacy from './Privacy'
import './index.css'
import './accessibility.css'

function Router() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname
      const hash = window.location.hash

      if (path.includes('accessibility')) {
        setPage('accessibility')
      } else if (path.includes('privacy') || hash.includes('privacy')) {
        setPage('privacy')
      } else {
        setPage('home')
      }
    }

    handleNavigation()
    window.addEventListener('popstate', handleNavigation)
    window.addEventListener('hashchange', handleNavigation)
    return () => {
      window.removeEventListener('popstate', handleNavigation)
      window.removeEventListener('hashchange', handleNavigation)
    }
  }, [])

  const navigateTo = (path) => {
    window.history.pushState(null, '', path)
    if (path.includes('accessibility')) {
      setPage('accessibility')
    } else if (path.includes('privacy') || path.includes('#privacy')) {
      setPage('privacy')
    } else {
      setPage('home')
    }
    window.scrollTo(0, 0)
  }

  if (page === 'accessibility') return <Accessibility />
  if (page === 'privacy') return <Privacy />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)

