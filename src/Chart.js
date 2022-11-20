import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' ,
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const labels = ['India', 'Nepal', 'Bangaladesh','SriLanka'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Deaths',
      data: [2711,1641,1018,557],
      borderColor: '#00FFFF',
      backgroundColor: '#454B1B',
    }

  ],
};

export function Chart() {
  return <>
  <div className='flex justify-center mt-4'>
   <span className='text-center text-black mx-auto underline'>Death of South Asian migrant workers in World Cup 2022,Qatar was announced</span>
   </div>
    <div className='mx-5'>
    <Bar options={options} data={data} />;
    </div>
    <div className='border mx-5'>
    <span className='text-gray-400 text-sm '>Source: Supreme Council of Health (Qatar), Embassy of India (Qatar), Embassy of Nepal (Qatar), Foreign Employment board (Nepal), Wage Earners' Welfare Board (Bangladesh), Embassy of Sri Lanka (Qatar). Figures 2011 to late 2020 for nationals from India, Nepal, Bangladesh and Sri Lanka. Pakistan figures from 2010 to 2020(via Guardian)</span>
    </div>
</>}
