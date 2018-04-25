
var svgatt = "http://www.w3.org/2000/svg";

var svg = document.createElementNS(svgatt, "svg");
svg.setAttributeNS(null, "id", "svgDoc");
//svg.setAttributeNS(null, "viewBox", "");
svg.setAttributeNS(null, "height", "100%");
svg.setAttributeNS(null, "width", "100%");
svg.setAttributeNS(null, "style", "float:left;");

document.getElementById('content').appendChild(svg);
var svgDoc = document.getElementById('svgDoc');


/**SAMPLE json**/
var jdata = {
    "input_l": [
    {
        "inname": "X1"
    },
    {   
        "inname": "X2"
    },
    {   
        "inname": "X3"
    },
    {   
        "inname": "X5"
    },
    {   
        "inname": "X6"
    },
    {   
        "inname": "X4"
    },
    {   
        "inname": "X5"
    },
    {   
        "inname": "X6"
    }],
    "output_l": [
    {
        "outname": "Y1"
    },  
    {
        "outname": "Y2"
    }
    ],
    "hidden_l": [
        {
            "layername": "nnlayer1",
            "numnodes": 10
        },
        {
            "layername": "nnlayer2",
            "numnodes": 12
        },
        {
            "layername": "nnlayer3",
            "numnodes": 10
        }
    ]
}

var numin = jdata.input_l.length;
var numout = jdata.output_l.length;
var hidden_layers = jdata.hidden_l;
console.log(hidden_layers)

var top_padd = 22;
var left_padd= 22;


/**store location of layer nodes**/
var position_data = {
    "input_loc": [],
    "output_loc": [],
    "hidden_loc": []
}

/**generate postions for the nodes*/
function graph_nn(){

    /**validate data*/
    if(numin != 0 && numout != 0 && hidden_layers != 0){
        graph_input();
        var space = graph_nn_nodes();
        graph_output(space);

        console.log(position_data)
    }else{
        console.log("Data Insuffiecient");
    }
}

/**graph input nodes**/
function graph_input(){

    var inputg = document.createElementNS(svgatt, "g");
    inputg.setAttributeNS(null, 'cx', top_padd);

    var x_loc = []
    var y_loc = []
    var y_padding = 0;

    y_padding = ((32*20)/2 - (28*numin)/2);

    for(var j = 0; j < numin; j++){
        var x = top_padd;
        var y = y_padding + 32*j;

        x_loc.push(x);
        y_loc.push(y);

        var circle = document.createElementNS(svgatt, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', 14);
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: red; stroke-width: 2px;');

        inputg.appendChild(circle);
    }

    //append location data to json
    for(k=0; k < numin; k++){
        var loc = {
            "x": x_loc[k],
            "y": y_loc[k]
        }

        position_data.input_loc.push(loc);
    }
    svgDoc.appendChild(inputg);
}

/**graph output nodes**/
function graph_output(space){

    var inputg = document.createElementNS(svgatt, "g");
    inputg.setAttributeNS(null, 'cx', top_padd);

    var x_loc = []
    var y_loc = []
    var y_padding = 0;

    y_padding = ((32*20)/2 - (28*numout)/2);

    for(var j = 0; j < numout; j++){
        var x = top_padd+space;
        var y = y_padding + 32*j;

        x_loc.push(x);
        y_loc.push(y);

        var circle = document.createElementNS(svgatt, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', 14);
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: green; stroke-width: 2px;');

        inputg.appendChild(circle);
    }

    //append location data to json
    for(k=0; k < numout; k++){
        var loc = {
            "x": x_loc[k],
            "y": y_loc[k]
        }

        position_data.output_loc.push(loc);
    }
    svgDoc.appendChild(inputg);
}

/**graph hidden nodes**/
function graph_nn_nodes(){
    var space = 120;

    for(var i=0; i < hidden_layers.length; i++){
        var newlayer = {
            "layername": "layer"+i,
            "data": []
        }
        position_data.hidden_loc.push(newlayer);
        nn_nodes(space, jdata.hidden_l[i].numnodes, i);
        space += 120;
    }

    //return space
    return space;
}


function nn_nodes(space, numnodes, index){
    var inputg = document.createElementNS(svgatt, "g");
    inputg.setAttributeNS(null, 'cx', top_padd);

    var x_loc = []
    var y_loc = []
    var y_padding = 0;

    y_padding = ((32*20)/2 - (28*numnodes)/2);

    for(var j = 0; j < numnodes; j++){
        var x = top_padd+space;
        var y = y_padding + 32*j;

        x_loc.push(x);
        y_loc.push(y);

        var circle = document.createElementNS(svgatt, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', 14);
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 2px;');

        inputg.appendChild(circle);
    }

    //append location data to json
    for(k=0; k < numnodes; k++){
        var loc = {
            "x": x_loc[k],
            "y": y_loc[k]
        }

        position_data.hidden_loc[index].data.push(loc);
    }
    svgDoc.appendChild(inputg);
}

function join_nodes(){
    var group = document.createElementNS(svgatt, "g");

    for(i=0; i<nodes; i++){
        /**CREATE LINE */
        var line = document.createElementNS(svgatt, "line");
        line.setAttributeNS(null, 'x1', 35);
        line.setAttributeNS(null, 'x2', 106);
        line.setAttributeNS(null, 'y1', 20);
        line.setAttributeNS(null, 'y2', 20);
        line.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );

        group.appendChild(line);
    }
    svgDoc.appendChild(group);
}

graph_nn();