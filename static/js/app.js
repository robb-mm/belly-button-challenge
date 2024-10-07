// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    metadata  = data.metadata;
    // console.log(metadata);

    // Filter the metadata for the object with the desired sample number
    let details={};
    for (let i=0; i<metadata.length; i++)
      if (metadata[i].id == sample) {
        details = metadata[i];
      
        // Use d3 to select the panel with id of `#sample-metadata`
        panel = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        panel.html("");

        // Append new
        // tags for each key-value in the filtered metadata.
        panel.append("div").text(`ID: ${details.id}`);
        panel.append("div").text(`ETHNICITY: ${details.ethnicity}`);
        panel.append("div").text(`GENDER: ${details.gender}`);
        panel.append("div").text(`AGE: ${details.age}`);
        panel.append("div").text(`LOCATION: ${details.location}`);
        panel.append("div").text(`BBTYPE: ${details.bbtype}`);
        panel.append("div").text(`WFREQ: ${details.wfreq}`);
        
        break;
      }
  });
}

// function to build both charts
function buildCharts(sample_id) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    samples  = data.samples;

    // Filter the samples for the object with the desired sample number
    for (let i=0; i<samples.length; i++)

      if (samples[i].id == sample_id) {
        // Get the otu_ids, otu_labels, and sample_values
        let sliced_values = samples[i].sample_values.slice(0, 10);
        let sliced_otu_ids = samples[i].otu_ids.slice(0, 10);
        let sliced_otu_labels = samples[i].otu_labels.slice(0, 10);
      
        // Build a Bubble Chart


        // Render the Bubble Chart


        // Build a Bar Chart
        // Reverse the input data appropriately
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

        // Render the Bar Chart
        Plotly.react("bar", plot_data, layout);
        // Plotly.update("bar", plot_data, layout);
        // Plotly.restyle("bar", );
      }
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

    buildMetadata(ids[0]);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // let id = id_droplist.property("value");
  console.log(`id: ${newSample}`);

  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();

// Call optionChanged() when a change takes place to the DOM
d3.select("#selDataset").on("change", optionChanged);
