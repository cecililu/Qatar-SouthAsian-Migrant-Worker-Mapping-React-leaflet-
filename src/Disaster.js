import {Marker,Popup,Polygon,Polyline,GeoJSON, useMap} from 'react-leaflet'
import React, { useCallback, useEffect, useState } from 'react'
import { data } from './data';
import disasterimg from '../src/images.jpg'
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster';
import useSupercluster from 'use-supercluster';

const icons={}
const fetchIcon=(count,size)=>{
     if (!icons[count]){
        icons[count]=L.divIcon({
                html: `<div class='cluster-marker'>${count}</div>`
            ,}
        )
     }
}

function GetIcon(_iconSize,type){
  return L.icon({
    iconUrl:require('./'+ type?type:'fire'+'.jpg'),
    iconSize:_iconSize
  })
}


export const Disaster = () => {
    const limeOptions = { color: 'red' }

    const maxZoom = 22;
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(12);
    const map = useMap();
    
    const updateMap=function () {

        const b = map.getBounds();
        setBounds([
          b.getSouthWest().lng,
          b.getSouthWest().lat,
          b.getNorthEast().lng,
          b.getNorthEast().lat,
        ]);
        console.log("updating",b);
        setZoom(map.getZoom());
      }

      const onMove = useCallback(() => {
        updateMap();
      }, [map]);
      
      useEffect(() => {
        updateMap();
      }, [map]);

      useEffect(() => {
        map.on("move", onMove);
        
        return () => {
          map.off("move", onMove);
        };
      }, [map, onMove]);

      const points = data.features.map((item) => ({
        type: "Feature",
        properties: {
            "cluster":false,
            "disaterid":item.properties.id,
            "category":item.properties.name
        },
        geometry: {
          type: item.type,

          coordinates: [
            parseFloat(item.geometry.coordinates[1]),
            parseFloat(item.geometry.coordinates[0]),
          ],
        },
      }));

      console.log('the points are',points)
    
      const { clusters,supercluster } = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: { radius: 75, maxZoom: 17 },
      });

    console.log(clusters)

            return (
         <> 
          {clusters.map((cluster) => {
                console.log(cluster)
                const [longitude, latitude] = cluster.geometry.coordinates;
                const { cluster: isCluster, point_count: pointCount } =cluster.properties;

            if (isCluster){
                return (
                    <Marker
                      key={`cluster-${cluster.id}`}
                      position={[latitude, longitude]}
                      icon={fetchIcon(
                        pointCount,
                        10 + (pointCount / points.length) * 40
                      )}
                      eventHandlers={{
                        click: () => {
                          const expansionZoom = Math.min(
                            supercluster.getClusterExpansionZoom(cluster.id),
                            maxZoom
                          );
                          map.setView([latitude, longitude], expansionZoom, {
                            animate: true,
                          });
                        },
                      }}
                    />
                  );
            }
            return (
                <div>
                    
                { data.features.map((item)=>{
                    if(item.geometry.type=='Point'){
                    return  <MarkerClusterGroup >             
                        <Marker 
                        key={item.properties.id} 
                            position={[
                                item.geometry.coordinates[1],
                                item.geometry.coordinates[0]
                            ]}
                            icon={GetIcon(40,'fire')}
                            >
                                <Popup>
                                <div>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <a href="#">
                                            <img className="rounded-t-lg" src={disasterimg} alt="" />
                                        </a>
                                        <div className="p-5">
                                            <a href="#">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.properties.id}</h5>
                                            </a>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.properties.name}</p>
                                            <a href="#" className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center  bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <span className='text-white'> More Information</span>
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </a>
                                        </div>
                                    </div>
                                        
                                </div> 
                                </Popup>  
                            </Marker>
                        </MarkerClusterGroup>

                        }})    
                    }
                {data.features.map((item)=>{
                    if(item.geometry.type=='LineString'){
                        console.log("line",[
                        [item.geometry.coordinates[0][1], item.geometry.coordinates[0][0]],  
                        [item.geometry.coordinates[1][1],item.geometry.coordinates[1][0]]  
                        ])
                    return <Polyline pathOptions={limeOptions} 
                        key={item.properties.id} 
                            positions={[
                                [item.geometry.coordinates[0][1], item.geometry.coordinates[0][0]],  
                                [item.geometry.coordinates[1][1],item.geometry.coordinates[1][0]]  
                            ]}
                            >
                                <Popup>
                                <div>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <a href="#">
                                            <img className="rounded-t-lg" src={disasterimg} alt="" />
                                        </a>
                                        <div className="p-5">
                                            <a href="#">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.properties.id}</h5>
                                            </a>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.properties.name}</p>
                                            <a href="#" className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center  bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <span className='text-white'> More Information</span>
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div> 
                                </Popup>  
                            </Polyline>
                        }})    
                    } 
                    
                    { data.features.map((item)=>{
                    if(item.geometry.type=='Polygon'){
                    console.log('before ply')
                    const coordinates=item.geometry.coordinates[0]
                    const ply=[
                        [coordinates[0][1],coordinates[0][0]],

                        [coordinates[1][1],coordinates[1][0]],
                        
                        [coordinates[2][1],coordinates[2][0]],
                        
                        [coordinates[3][1],coordinates[3][0]],
                        
                        [coordinates[4][1],coordinates[4][0]],
                        
                        [coordinates[5][1],coordinates[5][0]],
                        
                        [coordinates[5][1],coordinates[5][0]],

                        [coordinates[6][1],coordinates[6][0]]
                    ]
                    console.log('ply',ply)
                    return <MarkerClusterGroup> <Polygon 
                        key={item.properties.id}  pathOptions={limeOptions}
                            positions={ply}
                            icon={GetIcon(40,'water')}
                            >
                                <Popup>
                                <div>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <a href="#">
                                            <img className="rounded-t-lg" src={disasterimg} alt="" />
                                        </a>
                                        <div className="p-5">
                                            <a href="#">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.properties.id}</h5>
                                            </a>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.properties.name}</p>
                                            <a href="#" className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center  bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                <span className='text-white'> More Information</span>
                                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </a>
                                        </div>
                                    </div>
                                        
                                </div> 
                                </Popup>  
                            </Polygon>
                            </MarkerClusterGroup>
                        }})    
                    } 
                </div>)
                }
        )}
        </>
        );
}
