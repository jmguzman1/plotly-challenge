// read in samples.json.

function buildMetadata(sample) {
  d3.json("samples.json").then((importedData) => {
    var data = importedData.metadata.filter(sampleObj => sample.id == sample) [0];

    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    Object.entries(data).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}


function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var dataArray = samples.filter(sampleObj => sampleObj.id == sample);
    var data = dataArray[0];

    var otu_ids = data.otu_ids;
    var otu_labels = data.otu_labels;
    var sample_values = data.sample_values;

// Create a Bubble Chart

    var bubbleLayout = {
      title: "Belly Button Diversity",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30}
    };
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'rgb(55, 83, 109)'
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

 // Create a horizontal bar chart
    
    var barChart = [
      {
        y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
          color: 'Bisque'
        }

      }
    ];

    var barLayout = {
      title: "Belly Button Diversity - Top 10 OTUs",
    };

    Plotly.newPlot("bar", barChart, barLayout);
  });
}
// Display the sample metadata, i.e., an individual's demographic information.
function getMetaData(metaID){
  d3.json("samples.json").then((importedData) => {
      var data = importedData;
      console.log(data);

      var metaData = data.metadata;
      console.log(metaData);
      var metaArr = metaData.filter(metaObject => metaObject.id == metaID);
      var DemArr = metaArr[0];

      var ethnicity = DemArr.ethnicity;
      console.log(ethnicity);
      var gender = DemArr.gender;
      console.log(gender);
      var age = DemArr.age;
      console.log(age);
      var location = DemArr.location;
      console.log(location);
      var bbtype = DemArr.bbtype;
      console.log(bbtype);
      var wfreq = DemArr.wfreq;
      console.log(wfreq);

      var metaDataset = d3.select("#sample-metadata");

      metaDataset.html("");
      Object.entries(DemArr).forEach(([key, value]) =>{
          metaDataset.append("h6").text(`${key}: ${value}`);
      })

  });

};

function init() {
  var selector = d3.select("#selDataset");


  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    getMetaData(firstSample);
  });
}

function optionChanged(newSample) {

  buildCharts(newSample);
  getMetaData(newSample);
}

init();
