import styles from './deviceToggle.module.css';

type DeviceType = 'desktop' | 'mobile';

interface DeviceToggleProps {
  value: DeviceType;
  onChange: (newType: DeviceType) => void;
}

const DeviceToggle = ({ value, onChange }: DeviceToggleProps) => {
  return (
    <div className={styles.toggleContainer} role="group" aria-label="Device type toggle">
      <button
        type="button"
        role='button'
        onClick={() => onChange('desktop')}
        className={`${styles.toggleButton} ${value === 'desktop' ? styles.active : ''}`}
        aria-pressed={value === 'desktop'}
        aria-label="Switch to desktop view"
      >
        {/* Desktop SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M4 4h16v12H4z" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M8 20h8m-4-4v4" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <button
        type="button"
        role='button'
        onClick={() => onChange('mobile')}
        className={`${styles.toggleButton} ${value === 'mobile' ? styles.active : ''}`}
        aria-pressed={value === 'mobile'}
        aria-label="Switch to mobile view"
      >
        {/* Mobile SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" aria-hidden="true" focusable="false">
          <rect x="2" y="1" width="16" height="22" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="10" cy="20" r="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
};

export default DeviceToggle;
