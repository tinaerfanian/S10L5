import React from 'react';
import WeatherComp from './Components/WeatherComp'; // Assicurati di importare WeatherComp

function App() {
  return (
    <div className="App">
      {/* App header (opzionale) */}
      <h1 className='weatherApp'>il meteo della matTINA</h1>

      {/* Usa il componente WeatherComp */}
      <WeatherComp />
    </div>
  );
}

export default App;
