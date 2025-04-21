import type React from "react"
import styles from "./sidebar.module.css"

interface SidebarProps extends React.PropsWithChildren {
  defaultUrl?: string
  onUrlChange?: (url: string) => void
  onStartSimulation?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  children
}) => {
  return (
    <aside className={styles.sidebar} aria-label="Color blindness simulator sidebar">
      <header className={styles.header}>
        <h2 id="sidebar-title" className={styles.title}>
          Settings
        </h2>
      </header>
      <div className={styles.content}>
        {children}
      </div>
    </aside>
  )
}

export default Sidebar
