const IframeViewer = ({ url, filter }: { url: string, filter: string }) => {
  return (
    <div style={{ height: '80vh', width: '100%', filter: `url(#${filter})` }}>
      <iframe
        src={url}
        style={{ width: '100%', height: '100%', border: 'none' }}
        sandbox="allow-same-origin allow-scripts allow-forms"
        title="Filtered View"
      ></iframe>
    </div>
  );
}

export default IframeViewer