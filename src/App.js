import './App.css';
import { Panel } from './Panel';
import { NavBar } from './NavBar';
import { MainMap } from './MainMap';
import {
  BrowserRouter,
  
} from "react-router-dom";
import { MapContainer } from 'react-leaflet';
function App() {
  const position = [24,70]
return (
  <BrowserRouter>
    <div className='h-screen'>
      <NavBar/>
    <div className='grid grid-cols-4 gap-0 '>
       <div className='col-span-3'>
        <MapContainer center={position} zoom={4} scrollWheelZoom={false}>
          <MainMap/>
          </MapContainer>
       </div>
       <div className='text-white col-span-1'>   
        <Panel/>
     </div>
    </div>
  </div>
  </BrowserRouter>
  );
}

export default App;
