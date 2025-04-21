import type React from "react"
import { useState, type ChangeEvent } from "react"
import styles from "./sidebar.module.css"

interface SidebarProps extends React.PropsWithChildren {
  defaultUrl?: string
  onUrlChange?: (url: string) => void
  onStartSimulation?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  defaultUrl = "",
  onUrlChange,
  onStartSimulation,
  children
}) => {
  const [url, setUrl] = useState(defaultUrl)

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    onUrlChange?.(e.target.value)
  }

  return (
    <aside className={styles.sidebar} aria-label="Color blindness simulator sidebar">
      <header className={styles.header}>
        <h2 id="sidebar-title" className={styles.title}>
          Settings
        </h2>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.formGroup}>
            <label htmlFor="url-input" className={styles.label}>
              URL to preview
            </label>
            <input
              id="url-input"
              type="url"
              className={styles.input}
              placeholder="https://example.com"
              value={url}
              onChange={handleUrlChange}
              onKeyDown={(e) => {
                if (e.code === 'Enter') onStartSimulation?.()
              }}
              aria-labelledby="url-section"
            />
          </div>
        </section>
        {children}
      </div>
    </aside>
  )
}

export default Sidebar
