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

    const w = 1500;
    const h = 1500;
    const margin = 100;

    const svg = d3.select(container)
    .append('svg')
    .attr('width', w + (2 * margin))
    .attr('height', h + (2 * margin))

    d3.json(fet).then((d) => { // learning from d3 documentation @ d3-graph-gallery.com/graph/treemap_json.html
        const root = d3.hierarchy(data)
        .sum((d) => d.value);

        const treemap = d3.treemap()
        .size([w, h])
        .padding(2);
        
        treemap(root);
        
        const switchColor = (category) => {
            switch (dataset.findIndex((item) => item.name === category)) {
                case 0:
                    return 'chocolate';
                case 1:
                    return 'red';
                case 2:
                    return 'green';
                case 3:
                    return 'cadetblue';
                case 4:
                    return 'orange';
                case 5:
                    return 'purple';
                case 6:
                    return 'brown';
                case 7:
                    return 'pink';
                case 8:
                    return 'salmon';
                case 9:
                    return 'fuchsia';
                case 10:
                    return 'gray';
                case 11:
                    return 'greenyellow';
                case 12:
                    return 'steelblue';
                case 13:
                    return 'aqua';
                case 14:
                    return 'darkgreen';
                case 15:
                    return 'gold';
                case 16:
                    return 'cornflowerblue';
                case 17:
                    return 'blueviolet';
                case 18:
                    return 'chartreuse';
                case 19:
                    return 'cornsilk';
                default:
                    return 'white';
            }
        }

        const tooltip = 
        d3.select(container)
        .append('div')
        .attr('height', 250)
        .attr('width', 250)
        .style('visibility', 'hidden')
        .style('position', 'absolute')

        // squares
        svg.selectAll('rect')
        .data(root.leaves())
        .enter()
        .append('rect')
            .attr('x', (d) => d.x0)
            .attr('y', d => d.y0)
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('class', 'tile')
            .attr('data-name', (d) => d.data.name )
            .attr('data-category', (d) => d.data.category )
            .attr('data-value', (d) => d.data.value )
            // .style('stroke', 'black')
            .attr('fill', (d) => switchColor(d.data.category))
            .style('transform', `translate(${margin}, 0)`)
            .on('mousemove', (e, d) => {
                tooltip.style('top', e.pageY - 10 + 'px')
                .style('left', e.pageX + 10 + 'px')
                .html(`${d.data.name} <br> ${d.data.category} <br> Value: ${d.data.value}`)
                .style('visibility', 'visible');
            })
            .on('mouseout', (e, d) => tooltip.style('visibility', 'hidden'))
        

            // function constructSameNameTexts(arr) {
            //     svg.selectAll('text')
            //     .data(arr)
            //     .append(text)
            // }


        svg.selectAll('text')
        .data(root.leaves())
        .enter()
        .append('text')
            .attr('class', 'text')
            .attr('x', (d) => d.x0+5)
            .attr('y', (d) => d.y0+10)
            .selectAll('tspan')
            .data(d => d.data.name.split(' ').map((item) => ({split: item, name: d.data.name})))
            .enter()
            .append('tspan')
            .text((d) => d.split)
            .attr('font-size', '15px')
            .attr('fill', 'white')
            .attr('x', (d, i) => {
                const name = d.name;
                const nodes = root.leaves().filter((n) => n.data.name === name)
                const node = root.leaves().find((node) => node.data.name === name)
                if (nodes.length > 1) {
                    // constructSameNameTexts(nodes);
                    return node.x0 + 5
                } else {
                    return node.x0 + 5
                }
            })
            .attr('y', (d, i) => {
                const name = d.name;
                const node = root.leaves().find((node) => node.data.name === name)
                return (node.y0 + 11) + 15 * i
            })


        const categories = dataset.map(d => d.name);

        const legend = svg.selectAll('g')
        .data(categories)
        .enter()
        .append('rect')
            .attr('x', (d, i) => w / categories.length * i )
            .attr('y', h)
            .attr('width', w / categories.length - 3)
            .attr('height', margin / 2)
            .attr('id', 'legend')
            .attr('fill', (d) => switchColor(d))
            // dont know wy above line dont show, so I needed to reselectAll 'g', and create new littles 'g's to render legend's text
            .append('text')
            .attr('x', (d, i) => w / categories.length * i)
            .attr('y', h - 20)
            .attr('fill', 'black')
            .text((d, i) => categories[i])

            svg.selectAll('g')
            .data(categories)
            .enter()
            .append('g')
            .append('text')
            .attr('x', (d, i) => w / categories.length * i + 10)
            .attr('y', h + 20)
            .attr('fill', 'black')
            .text((d, i) => categories[i])
            
    })

     

}


// User Story #7: My tree map should have a legend with corresponding id="legend".


// User Story #8: My legend should have rect elements with a corresponding class="legend-item".

// User Story #9: The rect elements in the legend should use at least 2 different fill colors.

// User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

// User Story #11: My tooltip should have a data-value property that corresponds to the data-value of the active area.

// For this project you can use any of the following datasets:
