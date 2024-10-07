// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    metadata  = data.metadata;
    // console.log(metadata);

    // Filter the metadata for the object with the desired sample number
    var details={};
    for (let i=0; i<metadata.length; i++)
      if (metadata[i].id == sample) {
        details = metadata[i];
      
        // Use d3 to select the panel with id of `#sample-metadata`
        panel = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        panel.html("");

        // Inside a loop, you will need to use d3 to append new
        // tags for each key-value in the filtered metadata.
        panel.append("div").text(`ID: ${details.id}`);
        
        console.log(`ID: ${details.id}`);
        break;
      }

    console.log(`ID: ${details.id}`);
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field


    // Filter the samples for the object with the desired sample number


    // Get the otu_ids, otu_labels, and sample_values


    // Build a Bubble Chart


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let ids = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let id_droplist = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i=0; i < ids.length; i++)
      id_droplist.append("option").text(ids[i])

    // Get the first sample from the list
    sample1 = data.samples[0];
    // console.log(sample1.sample_values)
    
    let sliced_values = sample1.sample_values.slice(0, 10);
    let sliced_otu_ids = sample1.otu_ids.slice(0, 10);
    let sliced_otu_labels = sample1.otu_labels.slice(0, 10);

    sliced_values.reverse();
    sliced_otu_ids.reverse();
    sliced_otu_labels.reverse();

    let trace1 = {
      x: sliced_values,
      y: sliced_otu_ids.map(id => `OTU ${id}`),
      text: sliced_otu_labels,
      name: "OTU",
      type: "bar",
      orientation: "h"
    };

    let plot_data = [trace1]
    console.log(plot_data);
  
    // Apply a title to the layout
    let layout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      },
      xaxis:{title: "Number of Bacteria"}
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", plot_data, layout);

      });
}

// Function for event listener
function optionChanged(newSample) {
  // let id = id_droplist.property("value");
  console.log(`id: ${newSample}`);

  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

// Call optionChanged() when a change takes place to the DOM
d3.select("#selDataset").on("change", optionChanged);
