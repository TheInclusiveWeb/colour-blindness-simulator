import { useEffect, useMemo, useState } from 'react';
import FilterSVG, { VisionDisorder } from './components/ui/iframeViewer/FilterSVG';
import IframeViewer from './components/ui/iframeViewer/IframeViewer';
import Sidebar from './components/ui/sidebar/Sidebar';
import Select, { SelectOption } from './components/ui/select/Select';
import Sun from './assets/sun.svg?react';
import Moon from './assets/moon.svg?react';
import Button from './components/ui/button/Button';
import { UrlInput } from './components/ui/urlInput/UrlInput';
import useDeviceType from './hooks/useDeviceType';
import DeviceToggle from './components/ui/deviceToggle/DeviceToggle';

type VisionDisorderOptions = VisionDisorder | 'None'

export default function App() {
  const VISION_DISORDER_OPTIONS: SelectOption[] = [
    {
      value: 'None',
      label: 'Full color vision'
    },
    {
      value: 'Protanomaly',
      label: 'Protanomaly / Red weak'
    },
    {
      value: 'Deuteranomaly',
      label: 'Deuteranomaly / Green weak'
    },
    {
      value: 'Tritanomaly',
      label: 'Titranomaly / Blue weak'
    },
  ]

  const VISION_DISORDER_STRENGTHS = [
    {
      value: '0.0',
      label: '0% (full color vision)'
    },
    {
      value: '0.1',
      label: '10%'
    },
    {
      value: '0.2',
      label: '20%'
    },
    {
      value: '0.3',
      label: '30%'
    },
    {
      value: '0.4',
      label: '40%'
    },
    {
      value: '0.5',
      label: '50%'
    },
    {
      value: '0.6',
      label: '60%'
    },
    {
      value: '0.7',
      label: '70%'
    },
    {
      value: '0.8',
      label: '80%'
    },
    {
      value: '0.9',
      label: '90%'
    },
    {
      value: '1.0',
      label: '100% (No color visible)'
    },
  ]

  const [url, setUrl] = useState<string>('');
  const [finalUrl, setFinalUrl] = useState<string>('');
  const [variant, setVariant] = useState<VisionDisorderOptions>('None')
  const [strength, setStrength] = useState<number>(0)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const deviceSize = useDeviceType();
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile'>(deviceSize)

  const toggleTheme = () => setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const filter = useMemo(() => `${variant.toLowerCase()}-${(strength * 10).toFixed(0)}`, [variant, strength])
  const handleUrlChange = (val: string) => {
    setUrl(`https://${val}`);
    if (val.length === 0) setFinalUrl('')
  }
  const startSimulation = () => setFinalUrl(url)



  return (
    <div className="app">
      {/* Sidebar component with url, filter for color vision disorder type and strength */}
      <Sidebar>
        {/* Url input */}
        <UrlInput value={url} onChange={handleUrlChange} onEnter={startSimulation} ariaLabelledBy="url-section" />

        {/* Color blindness type */}
        <Select onChange={(value: VisionDisorderOptions) => setVariant(value)} options={VISION_DISORDER_OPTIONS} value={variant} label='type of color deficiency' />

        {/* Color blindness severity (0-100) */}
        {variant !== 'None' && (
          <Select onChange={(value: number) => setStrength(value)} options={VISION_DISORDER_STRENGTHS} value={`${strength}`} label='Severity of the color deficiency' />
        )}

        {/* Device type toggle */}
        <DeviceToggle value={deviceType} onChange={setDeviceType} />

        {/* Confirmation button */}
        <Button
          data-umami-event='simulate-website'
          data-umami-website={url}
          label='Simulate'
          onClick={startSimulation}
        />

        {/* Theme toggle */}
        <div
          className="theme-icon"
          onClick={toggleTheme}
          role="button"
          tabIndex={0}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          onKeyDown={(e) => {
            if (e.code === 'Enter' || e.code === 'Space') {
              e.preventDefault();
              toggleTheme();
            }
          }}
          data-umami-event='theme-toggle'
        >
          {theme === 'light' ? (
            <Sun width={24} height={24} />
          ) : (
            <Moon color="#e0e0e0" width={24} height={24} />
          )}
        </div>
      </Sidebar>

      <section className='simulation-container'>
        {finalUrl && (
          <div className='filter-view-container'>
            <IframeViewer key={`${finalUrl}-${filter}`} url={finalUrl} filter={filter} deviceType={deviceType} />
            <FilterSVG />
          </div>
        )}
      </section>
    </div>
  );
}
