
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
        },
        {
            "layername": "nnlayer3",
            "numnodes": 20
        }
    ]
}

var numin = jdata.input_l.length;
var numout = jdata.output_l.length;
var hidden_layers = jdata.hidden_l;

var top_padd = 22;
var left_padd = 22;


/**store location of layer nodes**/
var position_data = {
    "loc_data": []
}

/**generate postions for the nodes*/
function graph_nn() {

    /**validate data*/
    if (numin != 0 && numout != 0 && hidden_layers != 0) {
        //draw nodes
        graph_input();
        var space = graph_nn_nodes();
        graph_output(space);

        //draw lines between nodes
        join_nodes();

        console.log(position_data)
    } else {
        console.log("Data Insuffiecient");
    }
}

/**graph input nodes**/
function graph_input() {

    var inputg = document.createElementNS(svgatt, "g");

    //add data to layer
    var newlayer = {
        "layername": "input_layer",
        "data": []
    }
    position_data.loc_data.push(newlayer);

    var y_padding = 0;

    y_padding = ((32 * 20) / 2 - (28 * numin) / 2);

    var x, y = 0;
    for (var j = 0; j < numin; j++) {
        x = top_padd;
        y = y_padding + 32 * j;

        //append location data to json
        var loc = {
            "x": x,
            "y": y
        }
        position_data.loc_data[0].data.push(loc);

        //draw circles
        inputg.appendChild(draw_circles(x, y, "input"));
    }
    svgDoc.appendChild(inputg);
}

/**graph output nodes**/
function graph_output(space) {

    var inputg = document.createElementNS(svgatt, "g");

    //add data to layer
    var newlayer = {
        "layername": "output_layer",
        "data": []
    }
    position_data.loc_data.push(newlayer);
    var putput_index = position_data.loc_data.length - 1;

    var y_padding = 0;
    y_padding = ((32 * 20) / 2 - (28 * numout) / 2);

    var x, y = 0;
    for (var j = 0; j < numout; j++) {
        x = top_padd + space;
        y = y_padding + 32 * j;

        //append location data to json
        var loc = {
            "x": x,
            "y": y
        }
        position_data.loc_data[putput_index].data.push(loc);

        //draw circles
        inputg.appendChild(draw_circles(x, y, "output"));
    }
    svgDoc.appendChild(inputg);
}

/**graph hidden nodes**/
function graph_nn_nodes() {
    var space = 120;

    for (var i = 0; i < hidden_layers.length; i++) {
        var newlayer = {
            "layername": "layer" + (i + 1),
            "data": []
        }
        position_data.loc_data.push(newlayer);
        nn_nodes(space, jdata.hidden_l[i].numnodes, i + 1);
        space += 120;
    }

    //return space
    return space;
}


function nn_nodes(space, numnodes, index) {
    var inputg = document.createElementNS(svgatt, "g");

    var y_padding = 0;
    y_padding = ((32 * 20) / 2 - (28 * numnodes) / 2);

    var x, y = 0;
    for (var j = 0; j < numnodes; j++) {
        x = top_padd + space;
        y = y_padding + 32 * j;

        //append location data to json
        var loc = {
            "x": x,
            "y": y
        }
        position_data.loc_data[index].data.push(loc);

        //draw circles
        inputg.appendChild(draw_circles(x, y, "nn"));
    }
    svgDoc.appendChild(inputg);
}

function join_nodes() {

    var index1, index2 = 0

    //iterate through layers
    for (var layer = 0; layer < position_data.loc_data.length; layer++) {
        if (layer != position_data.loc_data.length - 1) {
            //console.log(position_data.loc_data[layer].data);
            index1 = layer;
            index2 = layer + 1;

            //console.log("doing it", index1, index2)
            draw_lines(index1, index2);
        }
    }
}

function draw_lines(index1, index2) {

    var data1 = position_data.loc_data[index1].data;
    var data2 = position_data.loc_data[index2].data;

    //layer1
    var group = document.createElementNS(svgatt, "g");
    for (var layer1 = 0; layer1 < data1.length; layer1++) {
        //layer2
        for (var layer2 = 0; layer2 < data2.length; layer2++) {
            //console.log(data1[layer1].x, data1[layer1].y, data2[layer2].x, data2[layer2].y)

            var line = document.createElementNS(svgatt, "line");
            line.setAttributeNS(null, 'x1', data1[layer1].x + 14);
            line.setAttributeNS(null, 'x2', data2[layer2].x - 14);
            line.setAttributeNS(null, 'y1', data1[layer1].y);
            line.setAttributeNS(null, 'y2', data2[layer2].y);
            line.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;');
            group.appendChild(line);
        }
    }
    svgDoc.appendChild(group);
}

function draw_circles(x, y, type) {
    var circle = document.createElementNS(svgatt, 'circle');
    circle.setAttributeNS(null, 'cx', x);
    circle.setAttributeNS(null, 'cy', y);
    circle.setAttributeNS(null, 'r', 14);

    if (type == "input")
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: red; stroke-width: 2px;');

    if (type == "output")
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: green; stroke-width: 2px;');

    if (type == "nn")
        circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 2px;');

    return circle;
}

graph_nn();