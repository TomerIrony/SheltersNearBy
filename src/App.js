import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import WrappedMap from './components/Map';

function App() {
  const [coords, setCoords] = useState({});
  const [state, setState] = useState(false);
  const [premission, setPremission] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setState(true);
    });
    navigator.geolocation.watchPosition(
      function (position) {
        setPremission(true);
      },
      function (error) {
        if (error.code === error.PERMISSION_DENIED) setPremission(false);
      },
    );

    const interval = setInterval(() => {
      if (premission) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setState(true);
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [premission]);

  return (
    <div className="App">
      <div style={{ width: '100vw', height: '100vh' }}>
        {state ? (
          <WrappedMap
            location={coords}
            premission={premission}
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
