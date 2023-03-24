// create menu option
let datas = d3.json(resource)
datas.then(function(data) {
    let names = data['names'];
    names.forEach(function(id) {
        menu.append('option').text(id).property("value", id)});
    let sample = names[0]
    console.log(sample)});

// function for displaying initial view 
function init(){
    d3.json(resource).then((data)=>{
    let names = data['names']
    let init_id = names[0]
    console.log(init_id)
    gauge(init_id)})}

// fuction for creating gauge chart
function gauge(id){
    datas.then((data)=>{
        let meta=data['metadata']
        // get the specific datas when a new sample is selected 
        let target_meta = meta.filter((id_value)=>id_value.id==id)
        console.log(target_meta)
        let meta_value = target_meta[0]
        console.log(meta_value)
        let wfreq = meta_value['wfreq']
        console.log(wfreq)
    
        // update the plot when a new sample is selected 
        let graph = {
            value: wfreq,
            domain: {x: [0,1], y: [0,1]},
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                font: {color: "black", size: 18}
            },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
            axis: {range: [0,10], tickmode: "linear", tick0: 1, dtick: 1},
            bar: {color: "rgba(208, 150, 210, 0.86)"},
            steps: [
                {range: [0, 1], color: "rgba(245, 39, 145, 0.02)"},
                {range: [1, 2], color: "rgba(245, 39, 145, 0.07)"},
                {range: [2, 3], color: "rgba(245, 39, 145, 0.12)"},
                {range: [3, 4], color:  "rgba(245, 39, 145, .17)"},
                {range: [4, 5], color:  "rgba(245, 39, 145, .22)"},
                {range: [5, 6], color: "rgba(245, 39, 145, .27)"},
                {range: [6, 7], color: "rgba(245, 39, 145, .32)"},
                {range: [7, 8], color:  "rgba(245, 39, 145, .37)"},
                {range: [8, 9], color: "rgba(245, 39, 145, 0.42)"},
                {range: [9, 10], color: "rgba(245, 39, 145, .47)"},
            ]
            } 
        };

// Set up the Layout
        let layout = {
    width: 425, 
    height: 425,
    margin: {t: 0, b:0}
        };

// Call Plotly to plot the gauge chart
        Plotly.newPlot("gauge", [graph], layout)
    })}

    function optionChanged(selectObject){
        gauge(selectObject)
        utobar(selectObject);
        bubblechart(selectObject)
        metadata_info(selectObject)}
        

// display initial view
init()

