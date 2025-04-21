import React from 'react';
import styles from './IframeViewer.module.css';

interface IframeViewerProps {
  url: string;
  filter: string;
}

const IframeViewer: React.FC<IframeViewerProps> = ({ url, filter }) => {
  return (
    <div className={styles.viewerContainer} style={{ filter: `url(#${filter})` }}>
      <iframe
        src={url}
        className={styles.iframe}
        sandbox="allow-same-origin allow-scripts allow-forms"
        title="Filtered View"
      ></iframe>
    </div>
  );
};

export default IframeViewer;
