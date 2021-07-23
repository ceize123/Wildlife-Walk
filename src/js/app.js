// An instance of our SimpleMap, created below when the window loads.
let map;

// Put these variables in global to reduce redundant code
// Get all the observations from our data.js and format them so we can work with the data
const observations = getAllObservations();
// Filter out any that aren't native species
const native = filterOnlyNative(observations);
// Filter out any that aren't introduced species
const introduced = filterOnlyIntroduced(observations);

// Update the map to show markers for the set of observations
function updateMap(observations, map) {
  // Clear the current markers on the map (if any)
  map.clear();

  // TODO: call the Simple Map's addObservation method for every one
  // of the observations in order to add markers to the map.
  observations.forEach((item) => {
    map.addObservation(item);
  });
}

// Update the table to show markers for the set of observations
function updateTable(observations) {
  // Remove any current data from the table
  clearAllTableRows();

  // Populate the table with all observation data we want to show
  observations.forEach((observation) => {
    // TODO: call the buildRowForObservation function with the current observation
    // and use that to add it to the table with the addRowToTable function.
    let display = buildRowForObservation(observation);
    addRowToTable(display);
  });
}

// Show
function show(filter) {
  let selection = "";
  let species = "";

  if (filter === observations) {
    species = "All Species";
  } else {
    species = `Only ${titleCase(filter)} Species`;
  }
  selection = filter;

  // Update the map and table
  updateMap(selection, map);
  updateTable(selection);
  updateTableTitle(`${species} (${selection.length})`);
}

// Show all species on the map and table
function showAll(filter) {
  show(filter);
}

// Show native species on the map and table
function showOnlyNative(filter) {
  showAll(filter);
}

// Show introduced species on the map and table
function showOnlyIntroduced(filter) {
  showAll(filter);
}

function start() {
  // Create our map object for Seneca's Newnham campus
  map = new SimpleMap("map-container", 43.7955, -79.3496);

  // TODO: create click handlers for all three buttons.
  // The "All Species" button should call the showAll function.
  let show = document.querySelector("#show-all");
  show.addEventListener("click", function () {
    showAll(observations);
  });
  // <button id="show-all" onclick="showAll(observations)">All Species</button>

  // The "Only Native Species" button should call the showOnlyNative function.
  let showNative = document.querySelector("#show-native");
  showNative.addEventListener("click", function () {
    showOnlyNative(native);
  });
  // <button id="show-native" onclick="showOnlyNative(native)">Only Native Species</button>

  // The "Only Introduced Species" button should call the showOnlyIntroduced function.
  let showIntro = document.querySelector("#show-introduced");
  showIntro.addEventListener("click", function () {
    showOnlyIntroduced(introduced);
  });
  // <button id="show-introduced" onclick="showOnlyIntroduced(introduced)">Only Introduced Species</button>

  // In your solution, show both ways of creating click event handlers (i.e.,
  // using the on* property and also addEventListener function).

  // Show all species observations by default when we start.
  showAll(observations);
}

// TODO: replace this console.log with the code necessary to call the start
// function when the page has finished fully loading.
start();
