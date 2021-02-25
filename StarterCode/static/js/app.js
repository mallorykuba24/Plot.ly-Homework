d3.json("samples.json").then(data => {
    var id_names = data.names;
    var dropdown = d3.select("#selDataset");
    id_names.forEach(id => {
        var option = dropdown.append("option");
        option.text(id);
        option.property("value", id);
    });
    showGraphs();
});

function optionChanged(value) {
    showGraphs();
};

function showGraphs() {
    var sel = d3.select('select').property('value');

    d3.json('samples.json').then(({ metadata, samples }) => {

        var meta = metadata.filter(obj => obj.id == sel)[0]
        d3.select('.panel-body').html('')
        Object.entries(meta).forEach(([key, val]) => {
            d3.select('.panel-body').append('h4').text(key.toUpperCase() + ': ' + val)
        });

        var { otu_ids, sample_values, otu_labels } = samples.filter(obj => obj.id == sel)[0]
        var barData = [
            {
                y: otu_ids.slice(0, 10).reverse().map(otuID => 'OTU ' + otuID),
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];

        Plotly.newPlot('bar', barData);
     
        //Bubble Chart
        
            var bubbleData = {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers", 
                marker: {
                    size: sample_values
                }
            };

            var data = [bubbleData];
            console.log(bubbleData)
            var layout = { 
                title: 'Bacterial Bubble Size',
                showlegend: false,
                xaxis: {title: 'OTU ID'},
                height: 600,
                width: 1000
            };
        
            Plotly.newPlot('bubble', data, layout);})}
   

// app.js:29 {id: "940", otu_ids: Array(80), sample_values: Array(80), otu_labels: Array(80)}

// var bubbleData = {
//     x: otu_ids.slice(0, 10).reverse().map(otuID => 'OTU ' + otuID),
//     y: sample_values.slice(0, 10).reverse(),
//     text: otu_labels.slice(0, 10).reverse(),
//     mode: "markers", 
//     marker: {
//         size: [sample_values.slice(0, 10).reverse()]
//     }
// };