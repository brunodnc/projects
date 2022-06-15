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
    .range([0, w]);

    const linearScale = d3.scaleLinear().domain([0, d3.max(numbers)]).range([0, h]);
    const scaled = numbers.map((num) => linearScale(num));
    
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(numbers)])
    .range([h, 0]);

    const svg = d3.select(chart)
    .append('svg')
    .attr('width', w + 100)
    .attr('height', h + 100)
    .attr('id', 'svg')

    const tooltip = document.getElementById('tooltipBox');
    const tooltipString = (i) =>  monthName(dataset[i][0].split('-')[1]) + '-' + dataset[i][0].split('-')[0] + ' '  + `GDP: $${numbers[i]} Billion `
    
    svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('id', (d, i) => i)
    .attr('data-date', (d, i) => d[0])
    .attr('data-gdp', (d, i) => d[1])
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(dates[i]))
    // .attr('y', (d, i) => yScale(numbers[i])) why we need scaled version of numbers ?? aint the yScale supposed to do that?
    .attr('y', (d, i) => h - scaled[i])
    .attr('width', w / dates.length - 0.1)
    .attr('height', (d, i) => scaled[i])
    .attr('transform', 'translate(100, 80)')
    .on('mouseover', (e) =>{ tooltip
    // .style('visibility', 'visible')
    .innerHTML = `<div id="tooltip" data-date"${dataset[e.target.id][0]}">${tooltipString(e.target.id)}</div>`
    

    }
    // .attr('data-date', (d, i) => d[0])
    // .attr('data-gdp', (d, i) => d[1])
    )
    // tooltip test dont work...
    // .append('title')
    // .attr('id', 'tooltip')
    // .attr('data-date', (d, i) => d[0])
    // .attr('data-gdp', (d, i) => d[1])
    // .text((d, i) => monthName(dataset[i][0].split('-')[1]) + '-' + dataset[i][0].split('-')[0] + ' '  + `GDP: $${numbers[i]} Billion `)
    
    


    
    
    
    const xAxis = d3.axisBottom(xScale)

    svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', 'translate(100, 580)')
    .call(xAxis);

    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(100, 80)`)
    .call(yAxis);

    // based on freeCodeCamp example @ codepen.io/freeCodeCamp/pen/GrZVaM
    svg.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -270)
    .attr('y', 130)
    .text('Gross Domestic Product');
}
