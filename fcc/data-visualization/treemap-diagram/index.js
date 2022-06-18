import * as d3 from "https://cdn.skypack.dev/d3@7";

const vgContainer = document.getElementById('vgContainer');
const movieContainer = document.getElementById('movieContainer');
const kickstarterContainer = document.getElementById('kickstarterContainer');

const vgData = fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json')
.then(raw => raw.json())
.then((data) => {
    buildChart(data, vgContainer)
})
.catch(err => console.log(err));

const movieData = fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json')
.then(raw => raw.json())
.then((data) => {
    buildChart(data, movieContainer)
})
.catch(err => console.log(err));

const kickstarterData = fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json')
.then(raw => raw.json())
.then((data) => {
    buildChart(data, kickstarterContainer)
})
.catch(err => console.log(err));

const buildChart = (data, container) => {
    container.innerHTML = '';
    const dataset = data;

    const w = 800;
    const h = 500;
    const margin = 100;






//     User Story #1: My tree map should have a title with a corresponding id="title".

// User Story #2: My tree map should have a description with a corresponding id="description".

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

// Movie Sales: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json
// Video Game Sales: https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json