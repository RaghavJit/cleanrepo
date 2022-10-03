var cont = document.getElementById("connections_buttons")

var VOLTAGE_POSITIVE = document.getElementById("p_v")
var VOLTAGE_NEGATIVE = document.getElementById("n_v")
var AMMETER_POSITIVE = document.getElementById("p_a")
var AMMETER_NEGATIVE = document.getElementById("n_a")
var MULTIMETER_POSITIVE = document.getElementById("p_m") 
var MULTIMETER_NEGATIVE = document.getElementById("n_m") 
var POWER_POSITIVE = document.getElementById("p_p")
var POWER_NEGATIVE = document.getElementById("n_p")
var POWER_ON = document.getElementById("p_on")
var CIRCUIT_POWER_POSITIVE = document.getElementById("c_p_p") 
var CIRCUIT_POWER_NEGATIVE = document.getElementById("c_p_n") 
var CIRCUIT_AMMETER_POSITIVE = document.getElementById("c_a_p") 
var CIRCUIT_AMMETER_NEGATIVE = document.getElementById("c_a_n")  
var CIRCUIT_VOLTAGE_POSITIVE = document.getElementById("c_v_p") 
var CIRCUIT_VOLTAGE_NEGATIVE = document.getElementById("c_v_n")   
var MCB_SWITCH = document.getElementById("mcb_switch")
var toggle = false
MCB_SWITCH.onclick = function() {
    
}

const instance = jsPlumb.getInstance({
    container: cont
});

instance.bind("ready", function() {
    instance.registerConnectionTypes({
        "positive": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 3.5 }
        },
        "negative": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 3.5 }
        }
    });

    instance.addEndpoint([POWER_POSITIVE, AMMETER_POSITIVE, VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE, CIRCUIT_VOLTAGE_POSITIVE], { //POWER_POSITIVE, AMMETER_POSITIVEP, VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE, CIRCUIT_VOLTAGE_POSITIVE
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 1
    });

    instance.addEndpoint([POWER_NEGATIVE, AMMETER_NEGATIVE, VOLTAGE_NEGATIVE, MULTIMETER_NEGATIVE, CIRCUIT_POWER_NEGATIVE, CIRCUIT_AMMETER_NEGATIVE, CIRCUIT_VOLTAGE_NEGATIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 1
    });

});
