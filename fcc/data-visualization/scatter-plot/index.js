    import * as d3 from "https://cdn.skypack.dev/d3@7";

    const svgDiv = document.getElementById('svg');


    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then((raw) => raw.json())
    .then((data) => buildScatterPlot(data))
    .catch((error) => console.log(error));

    const buildScatterPlot = (data) => {
        svgDiv.innerHTML = ''
        const dataset = data;

        const colors = ['rgb(250, 120, 15', 'rgb(30, 120, 180)'];

        const w = 900;
        const h = 600;
        const margin = 100;

        const years = dataset.map((data) => data.Year);
        const times = dataset.map((data) => data.Time);
        
        const timesLinear = times.map((t) => t.split(':').join(''))
        const parsedTimes = times.map((t) => {
            const arr = t.split(':');
            return new Date(1990, 0, 1, 0, arr[0], arr[1])
        }) // << method based on freeCodeCamp example @ codepen.io/freeCodeCamp/pen/bgpXyK to get dot's data-xvalue prop, turns minutes into Date object, 

        const xScale = d3.scaleLinear()
        .domain([d3.min(years), d3.max(years)])
        .range([0, w]);


        // const yScale = d3.scaleLinear()
        // .domain([d3.min(timesLinear), d3.max(timesLinear)])
        // .range([0, h]);
        // 

        const yScale = d3.scaleTime()
        .domain([d3.min(parsedTimes), d3.max(parsedTimes)])
        .range([0, h]);

        // main svg
        const svg = d3.select(svgDiv)
        .append('svg')
        .attr('width', w + margin)
        .attr('height', h + margin);

        // axis
        const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
        const yAxis = d3.axisLeft(yScale).tickFormat(d3.utcFormat('%M:%S'));

        svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(${margin / 2 + margin / 4}, ${h + margin / 4 * 3})`)
        .call(xAxis)
        .style('font-size', 15);

        svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${margin / 2}, ${margin / 4 * 3})`)
        .call(yAxis)
        .style('font-size', 15);
        

        // tooltip div
        const tooltip = d3.select('body')
        .append('div')
        .attr('class', 'tooltip')
        .attr('id', 'tooltip')
        .style('visibility', 'hidden');

        // dots
        const circles = svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(years[i]))
        .attr('cy', (d, i) => yScale(parsedTimes[i]))
        .attr('r', 10)
        .attr('transform', `translate(${margin / 2 + margin / 4}, ${margin / 4 * 3})`)
        .attr('class', 'dot')
        .attr('data-xvalue', (d, i) => years[i])
        .attr('data-yvalue', (d, i) => parsedTimes[i].toISOString())
        .style('fill', (d) => d.Doping !== '' ? colors[0] : colors[1])
        // tooltip
        .on('mouseover', (e, d) => { // show tooltip function based on freeCodeCamp example code @ codepen.io/freeCodeCamp/pen/bgpXyK
            const string = `${d.Name} - ${d.Nationality} <br> Year: ${d.Year} - Time: ${d.Time} ${d.Doping !== '' ?  `<a href=${d.URL} target="_blank"><br><br>${d.Doping}</a>` : ''}`
            tooltip.style('visibility', 'visible')
            .attr('data-year', d.Year)
            .html(string)
            .style('left', e.pageX + 'px')
            .style('top', e.pageY - 100 + 'px')
            .style('position', 'absolute')
        })
        .on('mouseout', () => setTimeout( () => tooltip.style('visibility', 'hidden'), 1000))


        // SVG texts
        svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -370)
        .attr('y', 80)
        .text('Time in Minutes')
        .style('font-size', 20);

        const legend = svg.append('g')
        .attr('id', 'legend');
        
        legend.selectAll('g')
        .data(colors)
        .enter()
        .append('rect')
        .attr('transform', (d, i) => `translate(0, ${h / 2 - i * 25})`) // calculation based from freeCodeCamp example @ codepen.io/freeCodeCamp/pen/bgpXyK
        .attr('x', w - 130)
        .attr('y', 20)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', (d) => d);

        legend.append('text')
        .attr('x', w - 105)
        .attr('y', h / 2 + 13)
        .text('No doping allegations')

        legend.append('text')
        .attr('x', w - 105)
        .attr('y', h / 2 + 39)
        .text('Riders with doping allegations')
    }