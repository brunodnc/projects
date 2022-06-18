import * as d3 from "https://cdn.skypack.dev/d3@7";
// import { topology } from "topojson-server";

const svgContainer = document.getElementById('svgContainer');

const counties = fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
.then(raw => raw.json())
.then((data) => {
    fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
    .then((raw) => raw.json())
    .then((data2) => buildChart(data, data2))
    .catch(err => console.log(err));
})
.catch(err => console.log(err));


const buildChart = (counties, edu) => {
    svgContainer.innerHTML = '';
    const educations = edu;
    const topology = counties;

    const w = 800;
    const h = 500;
    const margin = 100;

    const tooltipDiv = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', 'tooltip')
    .style('visibility', 'hidden')
    .style('position', 'absolute')

    const svg = d3.select(svgContainer)
    .append('svg')
    .attr('width', w + (2 * margin))
    .attr('height', h + (2 * margin));

    // scale

    const color = d3.scaleLinear()
    .domain(d3.extent(educations.map(edu => edu.bachelorsOrHigher)))
    .range([100, 40]);

    // applying d3geo, based on FCC example @ codepen.io/freeCodeCamp/pen/EZKqza

    const path = d3.geoPath();

    svg.append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(topojson.feature(topology, topology.objects.counties).features) // formats topo data
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('data-fips', (d) => d.id)
    .attr('data-education', (d) => {
        const res = edu.filter(ed=> ed.fips === d.id);
        return res ? res[0].bachelorsOrHigher : 0;
    })
    .attr('d', path)
    .attr('fill', (d) => {
        const res = edu.filter(ed=> ed.fips === d.id);
        return res ? `hsl(100, 100%, ${color(res[0].bachelorsOrHigher)}%` : 'white';
    })
    .on('mouseover', (e, d) => {
        tooltipDiv.html(() => {
            const res = edu.filter(ed=> ed.fips === d.id);
            return res ? `${res[0].area_name}, ${res[0].state} <br> Education: ${res[0].bachelorsOrHigher}%` : 0;            
        })
        .attr('data-education', () => {
            const res = edu.filter(ed=> ed.fips === d.id);
            return res ? res[0].bachelorsOrHigher : 0;
        })
        .style('left', e.pageX + 10 + 'px')
        .style('top', e.pageY + -20 + 'px')
        .style('visibility', 'visible')
    })
    .on('mouseout', () => {
        tooltipDiv.style('visibility', 'hidden')
    });

    const legendScale = d3.scaleLinear().domain(d3.extent(educations.map(obj => obj.bachelorsOrHigher))).range([0, w / 3]);
    const legendAxis = d3.axisBottom(legendScale).tickFormat((d) => d + '%');
    
    const legend = svg.append('g')
    .attr('id', 'legend')
    .selectAll('rect')
    .data([0, 10, 20, 30, 40, 50, 60, d3.max(educations.map(edu => edu.bachelorsOrHigher))])
    .enter()
    .append('rect')
    .attr('x', (d, i) => 300 + 33 * i)
    .attr('y', 0)
    .attr('width', ((w / 3) / 8) + 3)
    .attr('height', 10)
    .attr('fill', (d) => `hsl(100, 100%, ${color(d)}%`)
    .attr('transform', 'translate(30, 0)');


    svg.append('g')
    .call(legendAxis)
    .attr('transform', 'translate(330, 0)')
}
