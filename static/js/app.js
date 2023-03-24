// Resource URL
const resource="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//menu section in html
let menu = d3.select("#selDataset")

// create menu option
d3.json(resource).then(function(data) {
    
    let names = data['names'];
    names.forEach(function(id) {
        menu.append('option').text(id).property("value", id)});
    });

//// function for displaying initial view 
function init(){
    d3.json(resource).then((data)=>{
    let names = data['names']
    let init_id = names[0]
    console.log(init_id)
    utobar(init_id);
    bubblechart(init_id)
    metadata_info(init_id)
    })
}


// function for creating bar chart
function utobar(sample_id){
    d3.json(resource).then((data)=>{
        let samples = data['samples'];
        // get the specific datas and update the plot when a new sample is selected 
        let target_sample = samples.filter(x=>x.id==sample_id);
        console.log(target_sample)
        let sample_values = target_sample[0]['sample_values'];
        sample_values = sample_values.slice(0, 10).reverse()
        console.log(sample_values)
        let otu_ids = target_sample[0]['otu_ids'];
        otu_ids = otu_ids.slice(0, 10).reverse().map(id=>`OTU ${id}`)
        console.log(otu_ids)
        let otu_labels = target_sample[0]['otu_labels'];
        otu_labels = otu_labels.slice(0, 10).reverse()
        let trace = {"x":sample_values, "y":otu_ids, "text":otu_labels, type:"bar","orientation":"h"}
        let trace_data = [trace]
        let layout = {title: "Top 10 OTUs Present"}
        Plotly.newPlot('bar', trace_data, layout)
    })}

// function for bubboechart section
function bubblechart(sample_id){
    d3.json(resource).then((data)=>{
        let samples = data['samples'];
        // get the specific datas and update the plot when a new sample is selected 
        let target_sample = samples.filter(x=>x.id==sample_id);
        console.log(target_sample)
        let sample_values = target_sample[0]['sample_values'];
        console.log(sample_values)
        let otu_ids = target_sample[0]['otu_ids'];
        console.log(otu_ids)
        let otu_labels = target_sample[0]['otu_labels'];
        var desired_maximum_marker_size = 110;
        let trace = {"x":otu_ids, "y":sample_values, "type": 'scatter',
            "mode": 'markers', "text":otu_labels,
            "marker": {"color":otu_ids, colorscale: "Earth", "size":sample_values, 
            sizeref: 3.0 * Math.max(...sample_values) / (desired_maximum_marker_size**2),
            sizemode: 'area'}}
        let trace_data = [trace]
        let layout = {xaxis:{title:{text:"OTU ID"}}}
        Plotly.newPlot('bubble', trace_data, layout)
    })
    }

// function for displaying individual's demographic information 
function metadata_info(sample_id){
    d3.json(resource).then((data)=>{
        let metadata = data['metadata']
        // get the specific datas and update the plot when a new sample is selected 
        let target_metadata = metadata.filter((x=>x.id == sample_id))
        console.log(target_metadata)
        let metadata_value =  target_metadata[0]
        let meta_keys = Object.keys(metadata_value)
        console.log(meta_keys)
        let meta_values = Object.values(metadata_value)
        console.log(meta_values)
        d3.select("#sample-metadata").html("")
        for (let i=0; i<meta_keys.length; i++){
            d3.select("#sample-metadata").append("h5").text(`${meta_keys[i]}: ${meta_values[i]}`)}
        })
    }

//onchange="optionChanged(this.value)"
// call this fuction when a new sample is selected 
function optionChanged(selectObject){
    console.log(selectObject);
    utobar(selectObject);
    bubblechart(selectObject)
    metadata_info(selectObject)
};

//display initial view 
init()




