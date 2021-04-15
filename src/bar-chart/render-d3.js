import * as d3 from 'd3';
import { create } from 'd3';


export const renderD3 = ({ref,data, width, height}) => {
  if(ref.children.length > 0){return}
  let margin = {top: 30, right: 30, bottom: 100, left: 30},
      marginY = margin.top + margin.bottom,
      marginX = margin.left + margin.right;
    width = width - marginX;
    height = height - marginY;

  /// SETUP scales
  let x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0,width])
    .padding(0.1);

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.num)])
    .range([height,0]).nice();

  /// CREATE SVG
  let svg = d3.select(ref)
    .append('svg')
    .attr('width', width + marginX)
    .attr('height', height + marginY)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  /// DISPLAY axes
  svg.append('g')
    .call(d3.axisLeft(y))

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('x', '20')
    .attr('y', '0')
    .attr('dy', '.35rem')
    .attr('transform', 'rotate(90)')
    .attr('text-anchor', 'start')
    .attr('class','x-axis')

  createBars(data)
  let slider = document.getElementById("bar-viz")
  slider.min = 0;
  slider.max = d3.max(data, d => d.num)
  slider.value = 0;
  slider.onchange = () => {
    let filteredData = data.filter(d => d.num >= slider.value)
    createBars(filteredData)
  }

  /// BUILD bars
  function createBars(data){
    svg.selectAll('.bar-group')
    .data(data, d => d.name)
    .join(
      enter => {
        let bar = enter.append('g')
        .attr('class', 'bar-group')
        .style('opacity', 1);
      
      bar.append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(0))
        .attr('width', x.bandwidth())
        .attr('height', 0)
        .transition()
          .duration(910)
          .attr('y', d => y(d.num))
          .attr('height', d => height - y(d.num))
    
        bar.append('text')
        .text(d => d.num)
        .attr('x', d => x(d.name) + (x.bandwidth()/2))
        .attr('y', d => y(d.num) - 10)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')
        .style('font-size', '.8rem')
        .style('opacity', 0)
        .transition()
          .duration(1400)
          .style('opacity', 1)
      },
      update => {
        update.transition()
          .duration(800)
          .style('opacity', 1)
      },
      exit => {
        exit.transition()
          .duration(800)
          .style('opacity', 0.25)
      }
    )
  }


}