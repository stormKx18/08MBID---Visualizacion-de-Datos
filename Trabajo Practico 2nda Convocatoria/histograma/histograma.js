function convertHistData(data){
    var years = []
    data.forEach(element => {
        var year = element["Join Date"].split('-').slice(-1)[0]
        years.push(Number(year))
    });
    return years
}

years = convertHistData(dataH)
// Your input array of categorical data
//const data = ["Category A", "Category B", "Category A", "Category C", "Category B", "Category A", "Category D", "Category D"];

// Set the dimensions and margins for the histogram
var margin = { top: 10, right: 30, bottom: 60, left: 60 };
var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// Count the occurrences of each category
var counts = {};
years.forEach(category => {
  counts[category] = counts[category] ? counts[category] + 1 : 1;
});

// Convert the counts object to an array of objects
const histogramData = Object.entries(counts).map(([category, count]) => ({ category, count }));

// Sort the histogram data by category
histogramData.sort((a, b) => d3.ascending(a.category, b.category));

// Append an SVG element to the body of the document
const svg = d3
  .select("#histogramaD3")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the scale for the x-axis (categories)
const x = d3.scale.ordinal()
  .domain(histogramData.map(d => d.category))
  .rangeBands([0, width], 0.1);

// Define the scale for the y-axis (counts)
const y = d3.scale.linear()
  .domain([0, d3.max(histogramData, d => d.count)])
  .range([height, 20])

// Create the histogram bars
svg.selectAll("rect")
  .data(histogramData)
  .enter()
  .append("rect")
  .attr("x", d => x(d.category))
  .attr("y", d => y(d.count))
  .attr("width", x.rangeBand())
  .attr("height", d => height - y(d.count))
  .style("fill", "#69b3a2")

// Add labels to the bars
svg.selectAll(".label")
  .data(histogramData)
  .enter()
  .append("text")
  .attr("class", "label")
  .attr("x", d => x(d.category) + x.rangeBand() / 2)
  .attr("y", d => y(d.count) - 5)
  .text(d => d.count);

// Add the x-axis
svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + height + ")")
  .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
  .call(d3.svg.axis().scale(x).orient("bottom"))

svg.append("text")
  .attr("x", width / 2)
  .attr("y", height + 40)
  .attr("text-anchor", "middle")
  .text("Año de inicio de la suscripción");

// Add the y-axis
svg.append("g")
  .attr("class", "y-axis")
  .style({ 'stroke': 'black', 'fill': 'none', 'stroke-width': '1px'})
  .call(d3.svg.axis().scale(y).orient("left"))

  svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", -margin.left + 10)
  .attr("text-anchor", "middle")
  .text("Frecuencia");