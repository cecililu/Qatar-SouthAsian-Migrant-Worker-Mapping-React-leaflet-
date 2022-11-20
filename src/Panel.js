import React, { useEffect, useState } from 'react'
import s from './s.json'
import { Link, Route, Routes } from "react-router-dom"
import { PanelDashboard } from './PanelDashboard';
import { AddData } from './AddData';
import { Chart } from './Chart';
export const Panel = ({focus,focusHandler}) => {
  const [data, setdata] = useState('')
  
  const getdata=async()=>{
   let dataCountry=await fetch('https://restcountries.com/v3.1/name/'+focus)
   dataCountry= await dataCountry.json()
   setdata(dataCountry)
  console.log(data[0])  
}
const handlercross=()=>{
   console.log('clickde')
   focusHandler(null)
}

  useEffect(() => {
      if (focus){
      getdata()
     
   }
 }, [focus])
 
if (focus && data){
   return (
   <div>
 
      <ul className="flex justify-evenly py-2 border-4">
          <li className='
          '>
            <span to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Country Statistics</span>

             </span>
          </li>    

          </ul>
          <div className="container rounded-lg shadow-lg bg-white dark:bg-gray-700 dark:text-white pb-4">
            <div  className='flex justify-between m-4'>
               <span className='text-black'><span className='text-sm text-gray-500'>Official Name:</span> {data[0]['name'].official}
               </span>
               <button onClick={handlercross}className="w-7 h-7 rounded-full 
                       bg-blue-500 hover:bg-red-500 text-white">X
            </button>
            </div>
            <div className='flex justify-center m-4'>
              <img src={data[0]['flags'].png} className=" h-24 " alt='' />
            </div>
            
            <div className="p-4 flex justify-evenly align-center">
               
                <p className="text-xs text-gray-500">Region: <span className="text-gray-700 dark:text-gray-300">{data[0].population.subregion}</span></p>
                <p className="text-xs text-gray-500">Population: <span className="text-gray-700 dark:text-gray-300">{data[0].population}</span></p>
                <p className="text-xs text-gray-500">Capital: <span className="text-gray-700 dark:text-gray-300">Delhi</span></p>  
            </div>
            <div className='flex justify-center'>
            <p className="text-xs text-gray-500 my-7">Death in 2010-2020: <span className="text-gray-700 dark:text-gray-300">{s[focus]}</span></p>  
            </div>
        </div>
  
  </div>
  )}
  return(<div>
   <ul className="flex justify-evenly py-2 border-4">
       <li className='
       '>
         <span to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
             <svg aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
             <span className="flex-1 ml-3 whitespace-nowrap">Country Statistics</span>

          </span>
       </li>    

       </ul>
       
     
      <Chart/>
</div>)
}
