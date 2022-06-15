import * as d3 from "https://cdn.skypack.dev/d3@7";

const chart = document.getElementById('chart');


const data = fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
.then(raw => raw.json())
.then(({data}) => {
        buildChart(data)})
.catch((err) => console.log(err));

const buildChart =  (data) => {
    const dataset = data;
    chart.innerHTML = '';
    const margin = { top: 50, right: 50, left: 50, bottom: 50 };
    const h = 500;
    const w = 1000;
    

const monthName = (m) => {
    switch (m.toString()) {
        case '01':
            return 'Jan';
        case '04':
            return 'Apr';
        case '07':
            return 'Jul';
        case '10':
            return 'Oct';
        default:
            return m;
    }
}

    const dates = dataset.map((d) => new Date(d[0].split('-').join(',')));
    const numbers = dataset.map((d) => d[1]);
    
    const xScale = d3.scaleTime()
    .domain([d3.min(dates), d3.max(dates)])
    .range([margin.left, w - margin.right]);

    const yScale = d3.scaleLinear()
    .domain([d3.min(numbers), d3.max(numbers)])
    .range([h - 5, 50]);

    const svg = d3.select(chart)
    .append('svg')
    .attr('width', w)
    .attr('height', h)

    svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('data-date', (d, i) => dates[i])
    .attr('data-gdp', (d, i) => numbers[i])
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(dates[i]))
    .attr('y', (d, i) => yScale(numbers[i]))
    .attr('width', w / dates.length)
    .attr('height', (d, i) => h - yScale(numbers[i]))
    .style('fill', 'salmon')
    .attr('transform', 'translate(0, -20)')
    // tooltip
    .append('title')
    .text((d, i) => monthName(dataset[i][0].split('-')[1]) + '-' + dataset[i][0].split('-')[0] + ' '  + `GDP: $${numbers[i]} Billion `)
    
    
    const xAxis = d3.axisBottom(xScale)

    svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(0, 480)')
    .call(xAxis);

    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(50, 30)`)
    .call(yAxis);
    
    console.log('rodando buildChart');
}


// window.onload =  buildChart();
