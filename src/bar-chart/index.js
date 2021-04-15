import React,{useEffect,useRef} from 'react';
import * as d3 from 'd3';
import {renderD3} from './render-d3.js';
import './bar.css'
import './slider.css'


const ray = ["Chocolate", "Vanilla", "Strawberry", "Blueberry", "Mint", "Cherry", "Grape","Banana","Pineapple","Coconut", "Lemon"]


function BarChart(){
  let vizRef = useRef(null)
  
  useEffect(() => {
    setD3()
  },[])

  const setD3 = () => {
    const data = Array.from({length:ray.length}, (_,i) => {return {name: ray[i], num: Math.ceil(Math.random() * 100)}})
    const goose = {
      ref:vizRef.current,
      data,
      width:vizRef.current.offsetWidth || 800,
      height:vizRef.current.offsetHeight || 400
    }
    renderD3(goose)
  }
  

  return (
    <>
      <div className="bar-slide-container">
      <span>All</span>
        <input 
          type="range" 
          id="bar-viz" 
          style={{width:"40%", margin:"0px 10px"}}
        />
        <span>Most Popular</span>
      </div>
     <div style={{height:'80vh', width:'80vw'}} ref={vizRef}></div>
     </>
  )
}

export default BarChart;