var cont = document.getElementById("connections_buttons")
var CHECK_BUTTON = document.getElementById("check")
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
var validConn = [POWER_POSITIVE, CIRCUIT_POWER_POSITIVE, POWER_NEGATIVE, CIRCUIT_POWER_NEGATIVE]
var arrChk = []
var arrChkStore = []
var CONNECTIONS_BOOL = true;
var L = 200;
const instance = jsPlumb.getInstance({
    container: cont
});

CHECK_BUTTON.onclick = function() {
    alert("TODO: Check connections function")
//disableConnections();
}
instance.bind("ready", function() {
createConnections();
});

//function to check connections NOTE: IT DOES NOT WORK AT ALL. FOR RAGHAV
function checkConnections() {
    alert("Running connections check")
    for (let i = 0; i < validConn.length + 1; i++) {
        if ((instance.getConnections({ source: [validConn[i]], target: [validConn[i + 1]] })[0] != undefined)) {
            if (i % 2 == 0) {
                arrChk.push(instance.getConnections({ source: [validConn[i]], target: [validConn[i + 1]] })[0])

                try {
                    if ((instance.getConnections({ source: [validConn[i + 2]], target: [validConn[i + 3]] })[0] == undefined) & (i % 4 == 0)) {
                        if ((instance.getConnections({ source: [validConn[i + 3]], target: [validConn[i + 2]] })[0] == undefined) & (i % 4 == 0)) {
                            arrChk.pop();
                        }
                    }
                }

                catch {
                    continue;
                }
            }
        }

        else if ((instance.getConnections({ source: [validConn[i + 1]], target: [validConn[i]] })[0] != undefined)) {
            if (i % 2 == 0) {
                arrChk.push(instance.getConnections({ source: [validConn[i + 1]], target: [validConn[i]] })[0])

                try {
                    if ((instance.getConnections({ source: [validConn[i + 2]], target: [validConn[i + 3]] })[0] == undefined) & (i % 4 == 0)) {
                        if ((instance.getConnections({ source: [validConn[i + 3]], target: [validConn[i + 2]] })[0] == undefined) & (i % 4 == 0)) {
                            arrChk.pop();
                        }
                    }
                }

                catch {
                    continue;
                }
            }
        }
    }

    if (arrChk.length == 8) {
        alert("Right connections! Please choose resistance values.")

        // if (voltageVal.length == 0) {
        //     r1val.disabled = false
        //     r2val.disabled = false
        //     r3val.disabled = false
        // }

        // add.disabled = false
        // plot.disabled = false

        // arrChkStore = arrChk;
        // arrChk = [];
    }

    else if (arrChk.length == 0) {
        alert("Please make connections")
    }

    else {
        alert("Invalid connections!! Please re-check your connections")
        // window.location.reload()
    }
}

//function to make connections
function createConnections () {
    instance.registerConnectionTypes({
        "positive": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 7.5 }
        },
        "negative": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 7.5 }
        }
    });

    instance.addEndpoint([POWER_POSITIVE, AMMETER_POSITIVE, VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 1
    });

    instance.addEndpoint([POWER_NEGATIVE, AMMETER_NEGATIVE, VOLTAGE_NEGATIVE, MULTIMETER_NEGATIVE, CIRCUIT_POWER_NEGATIVE, CIRCUIT_AMMETER_NEGATIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 1
    });

    instance.addEndpoint([CIRCUIT_VOLTAGE_POSITIVE], { //Added 2 endpoints just for these 2 points, since only these will be having multiple connections. 
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 2
    });

    instance.addEndpoint([CIRCUIT_VOLTAGE_NEGATIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 2
    });
}
//function to disable connections
function disableConnections() {
    instance.addEndpoint([POWER_POSITIVE, AMMETER_POSITIVE, VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE], { //POWER_POSITIVE, AMMETER_POSITIVEP, VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE, CIRCUIT_VOLTAGE_POSITIVE
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: false,
        isTarget: false,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: false,
        maxConnections: 1
    });

    instance.addEndpoint([POWER_NEGATIVE, AMMETER_NEGATIVE, VOLTAGE_NEGATIVE, MULTIMETER_NEGATIVE, CIRCUIT_POWER_NEGATIVE, CIRCUIT_AMMETER_NEGATIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: false,
        isTarget: false,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: false,
        maxConnections: 1
    });

    instance.addEndpoint([CIRCUIT_VOLTAGE_POSITIVE], { //Added 2 endpoints just for these 2 points, since only these will be having multiple connections. 
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: false,
        isTarget: false,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: false,
        maxConnections: 2
    });

    instance.addEndpoint([CIRCUIT_VOLTAGE_NEGATIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: false,
        isTarget: false,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: false,
        maxConnections: 2
    });
}

/* Useless stuff below 
window.scrollTo(10, document.body.scrollHeight);
//POWER_POSITIVE, AMMETER_POSITIVE, VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE, CIRCUIT_VOLTAGE_POSITIVE

*/