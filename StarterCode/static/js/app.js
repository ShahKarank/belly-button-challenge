
// FUNCTION #1 of 4 Populate Demographic Information
function populateDemoInfo(sample) {
  let Box = d3.select("#sample-metadata");

  d3.json(BBUrl).then((data) => {
    let mData = data.metadata;
    let sMeData = mData.filter(row => row.id == sample);
    Box.selectAll("p").remove();
    sMeData.forEach(row => {
      for (const [key, value] of Object.entries(row)) {
        Box.append("p").text(`${key}: ${value}`);
      };    
    });
  });
};
// FUNCTION #2 of 4
function buildChart(sample) {
  d3.json(BBUrl).then((data) => {
    let Samdata = data.samples.filter(row => row.id == sample);
    let sliceid = Samdata[0]["otu_ids"].slice(0,10);
    let slicelabel = Samdata[0]["otu_labels"].slice(0,10);
    let slicevalue = Samdata[0]["sample_values"].slice(0,10);
    let otuIds = sliceid.reverse();
    let otuLabels = slicelabel.reverse();
    let sampleValues = slicevalue.reverse();

    let trace1 = {
      x: sampleValues,
      y: otuIds.map(elt => `OTU ${elt}`),
      text: otuLabels,
      type: 'bar',
      orientation: 'h'
    };
    let d1 = [trace1];
    let layout1 = {
      title: "Sample Values"
    };

    let allOtu = Samdata[0]["otu_ids"];
    let allOtuLabels = Samdata[0]["otu_labels"];
    let allSamp = Samdata[0]["sample_values"];

    let trace2 = {
      x: allOtu,
      y: allSamp,
      text: allOtuLabels,
      mode: 'markers',
      marker: {
        color: allOtu,
        colorscale: 'Portland',
        size: allSamp
      }
    };
    let d2 = [trace2];
    let layout2 = {showlegend: false};
    
    Plotly.newPlot("bar", d1, layout1);
    Plotly.newPlot("bubble",d2,layout2)
  });
};
// FUNCTION #3 of 4
function optionChanged(sample) {
    populateDemoInfo(sample);
  buildChart(sample);
};

const BBUrl = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// FUNCTION #4 of 4 Initiate the Dashboard
function initDashboard() {
  let dropDownMenu = d3.select("#selDataset");

  d3.json(BBUrl).then((data) => {
    let sIds = data.names;
    sIds.forEach((sample) => {
      dropDownMenu.append("option").text(sample).property("value",sample)
    });
    let initSample = sIds[0];
    
    populateDemoInfo(initSample);
    buildChart(initSample);
  });
};

initDashboard();