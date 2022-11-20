import './App.css';
import { Panel } from './Panel';
import { NavBar } from './NavBar';
import { MainMap } from './MainMap';
import {
  BrowserRouter,
  
} from "react-router-dom";
import { MapContainer } from 'react-leaflet';
import { useState } from 'react';
function App() {
  const position = [24,70]
  const [countryFocus, setcountryFocus] = useState('')
  const focusHandler=(data)=>setcountryFocus(data)
console.log(countryFocus)
return (
  <BrowserRouter>
    <div className='h-screen'>
      <NavBar/>
    <div className='grid grid-cols-5 gap-0 '>
       <div className='col-span-3'>
        <MapContainer   center={position} zoom={4} scrollWheelZoom={false}>
          <MainMap focusHandler={focusHandler} />
          </MapContainer >
       </div>
       <div className='text-white col-span-2'>   
        <Panel focusHandler={focusHandler} focus={countryFocus}/>
     </div>
    </div>
  </div>
  </BrowserRouter>
  );
}

export default App;
