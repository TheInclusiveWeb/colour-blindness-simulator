import { useState } from 'react';
import FilterSelector from './components/FilterSelector';
import FilterSVG from './components/FilterSVG';
import IframeViewer from './components/IframeViewer';

export default function App() {
  const [url, setUrl] = useState('');
  const [filter, setFilter] = useState('none');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUrl(formData.get('url') as string);
    setFilter(formData.get('filter') as string);
  };


  return (
    <div className="app">
      <h1>Color Blindness Simulator</h1>
      <form onSubmit={handleSubmit}>
        <input type="url" name="url" placeholder="Enter a URL" required />
        <FilterSelector selected={filter} />
        <button type="submit">Load Page</button>
      </form>

      {url && (
        <>
          <IframeViewer url={url} filter={filter} />
          <FilterSVG />
        </>
      )}
    </div>
  );
}
