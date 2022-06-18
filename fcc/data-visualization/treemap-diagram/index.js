import * as d3 from "https://cdn.skypack.dev/d3@7";

const vgContainer = document.getElementById('vgContainer');
const movieContainer = document.getElementById('movieContainer');
const kickstarterContainer = document.getElementById('kickstarterContainer');
let rawdats = '';

const vgData = fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
.then(raw => raw.json())
.then((data) => {
    buildChart(data, vgContainer, 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
})
.catch(err => console.log(err));

const movieData = fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
.then(raw => raw.json())
.then((data) => {
    buildChart(data, movieContainer,'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
})
.catch(err => console.log(err));

const kickstarterData = fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json')
.then(raw => raw.json())
.then((data) => {
    buildChart(data, kickstarterContainer, 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json')
})
.catch(err => console.log(err));

const buildChart = (data, container, fet) => {
    container.innerHTML = '';
    const dataset = data.children;

    const w = 800;
    const h = 500;
    const margin = 100;

    const svg = d3.select(container)
    .append('svg')
    .attr('width', w + (2 * margin))
    .attr('height', h + (2 * margin))

    d3.json(fet).then((d) => { // learning from d3 documentation @ d3-graph-gallery.com/graph/treemap_json.html
        const root = d3.hierarchy(data)
        .eachBefore(function (d) {
            d.data.id = (d.parent ? d.parent.data.id + '.' : '') + d.data.name;
          })
        .sum((d) => d.value);
        console.log(root);

        const treemap = d3.treemap()
        .size([w, h])
        .padding(5);
        
        treemap(root);
        
        svg.selectAll('rect')
        .data(root.leaves())
        .enter()
        .append('rect')
            .attr('x', (d) => d.x0)
            .attr('y', d => d.y0)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('class', 'tile')
            .style('stroke', 'black')
            .style('fill', 'slateblue');
        
        svg.selectAll('text')
        .data(root.leaves())
        .enter()
        .append('text')
            .attr('x', (d) => d.x0+5)
            .attr('y', (d) => d.y0+20)
            .text((d) => d.name)
            .attr('font-size', '1rem')
            .attr('fill', 'white');


    })

     

}
    
// User Story #3: My tree map should have rect elements with a corresponding class="tile" that represent the data.

// User Story #4: There should be at least 2 different fill colors used for the tiles.

// User Story #5: Each tile should have the properties data-name, data-category, and data-value containing their corresponding name, category, and value.

// User Story #6: The area of each tile should correspond to the data-value amount: tiles with a larger data-value should have a bigger area.

// User Story #7: My tree map should have a legend with corresponding id="legend".

// User Story #8: My legend should have rect elements with a corresponding class="legend-item".

// User Story #9: The rect elements in the legend should use at least 2 different fill colors.

// User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

// User Story #11: My tooltip should have a data-value property that corresponds to the data-value of the active area.

// For this project you can use any of the following datasets:
