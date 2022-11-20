import { TileLayer, MapContainer,GeoJSON,Tooltip, Polyline, Marker, CircleMarker} from 'react-leaflet'
import React, { useState } from 'react'
import L from "leaflet"
import district from './sho.json'
import qatar from './Qatar.json'
import 'leaflet/dist/leaflet.css'



export const MainMap = (props) => {
     const layerurl='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
    
     const Style = {
         fillColor:'red',
         fillOpacity:.01,
         color:'black',
        weight:1 
      }
    
    const position = [24,70]
    const onEachFeature=(country,layer)=>{
      
      const flag='https://flagcdn.com/16x12/'+'pe'+'.png'
      
       layer.bindPopup(`<div class="max-w-sm p-6 bg-white ">
           <img src=${flag}>
           <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><span class='mt-5 mx-8 text-justify mx-2 text-center  text-sm font-normal text-gray-500'>Name :</span>${country.properties.name}</h5>
           <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><span class='mt-5 mx-8 text-justify mx-2 text-center  text-sm font-normal text-gray-500'>CODE:</span>${country.properties.iso3}</h5>
       <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
       <a href="#" class="bg-blue-500 text-white inline-flex items-center px-3 py-2 text-sm font-medium text-center">
          <span class='text-white'> Read more</span>
           <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
       </a>
   </div>
   `)
  
  
   layer.on({
     click:(e)=>{
       props.focusHandler(country.properties.name)
        console.log('target',e.target.setStyle)
        e.target.setStyle({
           color:'red',
           fillColor:'red',
           fillOpacity:.5,
          })
     },
     mouseover:(e)=>{
      e.target.setStyle({
        color:'red',
        fillColor:'red',
        fillOpacity:.7,
       })
       
     },
     mouseout:(e)=>{
      e.target.setStyle({ fillColor:'red',
      fillOpacity:0.1,
      color:'black',
     weight:1 })
     }
   })
    }
  
    return (
      <>    
    <GeoJSON  data={district.features} pathOptions={Style} onEachFeature={onEachFeature}/>
    <GeoJSON  data={qatar} pathOptions={Style} />
    <CircleMarker  radius={5} center={[25, 51]}  ><Tooltip>Qatar</Tooltip></CircleMarker>
    <TileLayer
       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       url={layerurl}/>     
       <Polyline pathOptions={{color:'purple'}} positions={[[28,84],[25, 51.1839]]} />
       <Polyline pathOptions={{color:'blue'}} positions={[[20,78],[25, 51.1839]]} />
       <Polyline pathOptions={{color:'pink'}} positions={[[33,67],[25, 51.1839]]} />
       <Polyline pathOptions={{color:'orange',dashArray: '20, 10',weight:2, dashOffset: '20'}} positions={[[23,90],[25, 51.1839]]} />
       <Polyline pathOptions={{color:'green'}} positions={[[30,69],[25, 51.1839]]} />
       <Polyline pathOptions={{color:'yellow'}} positions={[[28,84],[25, 51.1839]]} />
       <Polyline pathOptions={{color:'red'}} positions={[[7,80],[25, 51.1839]]} />
       </> 
  )
}
