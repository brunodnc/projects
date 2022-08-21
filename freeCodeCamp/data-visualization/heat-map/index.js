// import { utcTicks } from "d3";
import * as d3 from "https://cdn.skypack.dev/d3@7";


const svgContainer = document.getElementById('svgContainer');

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
.then((raw) => raw.json())
.then((data) => buildChart(data))
.catch(err => console.log(err));

const buildChart = ({ monthlyVariance }) => {
    svgContainer.innerHTML = '';
    const dataset = monthlyVariance;
    const w = 1000;
    const h = 700;
    const margin = 100;

    const dates = dataset.map((d) => new Date(d.year + ', ' + d.month));
    const variances = dataset.map(d => d.variance)
    const years = dates.map(d => d.getFullYear());
    const months = dates.map(d => d.getMonth());
    const absoluteTemps = dataset.map((d) => d.variance + 8.66);

    // scales
    const xScale = d3.scaleLinear()
    .domain(d3.extent(years))
    .range([0, w]);

    const yScale = d3.scaleLinear()
    .domain(d3.extent(months))
    .range([h, 0])

    const colorScale = d3.scaleLinear()
    .domain(d3.extent(variances))
    .range([240, -100]);

    const legendScale = d3.scaleLinear()
    .domain(d3.extent(absoluteTemps))
    .range([h, 0]);

    const legendColorScale = d3.scaleLinear()
    .domain(d3.extent(absoluteTemps))
    .range([240, -100]);

    console.log(colorScale(0));

    const svg = d3.select(svgContainer)
    .append('svg')
    .attr('width', w + 2*margin)
    .attr('height', h + 2*margin)
    
    // tooltips
    const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden');




    
    const rects = svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(d.year))
    .attr('y', (d, i) => yScale(d.month))
    .attr('width', () => w / (d3.max(years) - d3.min(years)) )
    .attr('height', () => h / 11)
    .attr('fill', (d, i) => `hsl(${colorScale(d.variance)}, 100%, 75%)`)
    .attr('class', 'cell')
    .attr('transform', `translate(${margin}, ${margin})`)
    .attr('data-month', d => d.month - 1)
    .attr('data-year', d => d.year)
    .attr('data-temp', (d, i) => absoluteTemps[i]) //absolute or relative values?
    .on('mouseover', (e, d) => { // trying to create tooltip with d3-tip api
        tooltip.attr('data-year', d.year)
        .style('right', '235px')
        .style('top', e.pageY + 'px')
        tooltip.html(`Year: ${d.year} <br> Month: ${d.month} <br> Temp: ${absoluteTemps[dataset.indexOf(d)].toFixed(2)} C°`)
        .style('visibility', 'visible')
        .style('position', 'absolute')
        .style('text-align', 'justify');
    })
    .on('mouseout', () => tooltip.style('visibility', 'hidden'));

    // axis
    const xAxis = d3.axisBottom(xScale).tickFormat((d) => d3.timeFormat(d, '%Y'));
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => { // tickFormat function taken from freeCodeCamp example @ codepen.io/freeCodeCamp/pen/JEXgeY
        const date = new Date(null);
        date.setUTCMonth(d + 1); // +1 may not pass the test ????
        const format = d3.timeFormat('%B');
        return format(date);
    })

    svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(${margin}, ${h + margin})`)
    .call(xAxis)
    .style('font-size', 15)
    .style('color', 'white');  

    svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin - 10}, ${margin / 2 + 10})`)
    .call(yAxis)
    .style('font-size', 15)
    .style('color', 'white');

    const legendSvg = d3.select(svgContainer)
    .append('svg')
    .attr('width', 200)
    .attr('height', 900)
    .attr('id', 'legend')
    .attr('transform', 'translate(0, 40)');

    legendSvg.selectAll('rect')
    .data(absoluteTemps)
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', 60)
    .attr('x', 0)
    .attr('y', (d) => legendScale(d))
    .attr('fill', (d) => `hsl(${legendColorScale(d)}, 100%, 75%)`)
    .attr('transform', 'translate(0, 0)') 

    const legendAxis = d3.axisRight(legendScale);

    legendSvg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin / 2 + 20}, ${margin / 2 + 10})`)
    .call(legendAxis)
    .style('font-size', 15)
    .style('color', 'white');
}
