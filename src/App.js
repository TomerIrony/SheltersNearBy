import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import WrappedMap from './components/Map';

function App() {
  const [coords, setCoords] = useState({});
  const [state, setState] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setState(true);
    });
  }, []);

  return (
    <div className="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        {state ? (
          <WrappedMap
            location={coords}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?
    v=3.exp&libraries=geometry,
    drawing,places`}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        ) : (
          <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?
v=3.exp&libraries=geometry,
drawing,places`}
            location={{ lat: 31.994174, lng: 34.95205 }}
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        )}
      </div>
    </div>
  );
}

export default App;
