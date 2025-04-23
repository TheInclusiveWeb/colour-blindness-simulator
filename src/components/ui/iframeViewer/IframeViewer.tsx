import React from 'react';
import styles from './IframeViewer.module.css';
import type { DeviceType } from '../../../hooks/useDeviceType';

interface IframeViewerProps {
  url: string;
  filter: string;
  deviceType: DeviceType
}

const IframeViewer: React.FC<IframeViewerProps> = ({ url, filter, deviceType }) => {
  return (
    <div className={styles.viewerContainer} style={{ filter: `url(#${filter})` }}>
      <iframe
        src={url}
        className={`${deviceType === 'mobile' ? styles.mobile : styles.desktop}`}
        sandbox="allow-same-origin allow-scripts allow-forms"
        title="Filtered View"
      ></iframe>
    </div>
  );
};

export default IframeViewer;
