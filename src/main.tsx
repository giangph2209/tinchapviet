import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import faviconUrl from './imports/logo.png'
import './index.css'

// Favicon: dùng logo thương hiệu (Vite tự xử lý đường dẫn theo `base`)
function setFavicon(href: string) {
  for (const rel of ['icon', 'apple-touch-icon']) {
    let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
    if (!link) {
      link = document.createElement('link')
      link.rel = rel
      document.head.appendChild(link)
    }
    link.type = 'image/png'
    link.href = href
  }
}

setFavicon(faviconUrl)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
