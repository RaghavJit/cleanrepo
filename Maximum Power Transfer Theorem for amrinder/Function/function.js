var cont = document.getElementById("connections_buttons")
var CHECK_BUTTON = document.getElementById("check")
var VOLTAGE_POSITIVE = document.getElementById("p_v")
var VOLTAGE_NEGATIVE = document.getElementById("n_v")
var AMMETER_POSITIVE = document.getElementById("p_a")
var AMMETER_NEGATIVE = document.getElementById("n_a")
var MULTIMETER_POSITIVE = document.getElementById("p_m") 
var MULTIMETER_NEGATIVE = document.getElementById("n_m") 
var POWER_POSITIVE = document.getElementById("n_p")
var POWER_NEGATIVE = document.getElementById("p_p")
var POWER_ON = document.getElementById("p_on")
var CIRCUIT_POWER_POSITIVE = document.getElementById("c_p_p") 
var CIRCUIT_POWER_NEGATIVE = document.getElementById("c_p_n") 
var CIRCUIT_AMMETER_POSITIVE = document.getElementById("c_a_p") 
var CIRCUIT_AMMETER_NEGATIVE = document.getElementById("c_a_n")  
var CIRCUIT_VOLTAGE_POSITIVE = document.getElementById("c_v_p") 
var CIRCUIT_VOLTAGE_NEGATIVE = document.getElementById("c_v_n")   
var MCB_SWITCH = document.getElementById("mcb_switch")
var VOLTAGE_POINTER = document.getElementById("P_V")
var AMMETER_POINTER = document.getElementById("P_A")
var toggle = false
var validConn = [POWER_POSITIVE, CIRCUIT_POWER_POSITIVE, POWER_NEGATIVE, CIRCUIT_POWER_NEGATIVE]
var arrChk = []
var arrChkStore = []
var CONNECTIONS_BOOL = true;
var L = 200;

var POWER_SUPPLY= document.getElementById("PSslider")
var R1_VALUE = document.getElementById("R1")
var RL_VALUE = document.getElementById("RL")
var TABLE = document.getElementById("valTable")
var TABLE_COUNT = 0
var ADD_BUTTON = document.getElementById("add")

const instance = jsPlumb.getInstance({
    container: cont
});


//ON-CLICK / ON-INPUT TRIGGERS BELOW---------------------------------------------
CHECK_BUTTON.onclick = function() {
    window.scrollTo(10, document.body.scrollHeight);
//disableConnections();
}

POWER_SUPPLY.oninput = function () {
    document.getElementById("VOLTAGE_VALUE").innerHTML = this.value;
    updateAmmeter(calcAmmeter(this,R1_VALUE,RL_VALUE))
    updateVoltmeter(calcVoltmeter(this,R1_VALUE,RL_VALUE))
}
R1_VALUE.oninput = function () {
    document.getElementById("R1_VALUE").innerHTML = this.value;
    updateAmmeter(calcAmmeter(POWER_SUPPLY,this,RL_VALUE))
    updateVoltmeter(calcVoltmeter(POWER_SUPPLY,this,RL_VALUE))
}
RL_VALUE.oninput = function () {
    document.getElementById("RL_VALUE").innerHTML = this.value;
    updateAmmeter(calcAmmeter(POWER_SUPPLY,R1_VALUE,this))
    updateVoltmeter(calcVoltmeter(POWER_SUPPLY,R1_VALUE,this))
}
ADD_BUTTON.onclick = function () {
    addValuesToTable();
}

//ON-CLICK / ON-INPUT TRIGGERS END -------------------------------------------------

instance.bind("ready", function() {
createConnections();
});

//function to check connections NOTE: IT DOES NOT WORK AT ALL. TODO-RAGHAV
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

    instance.addEndpoint([ VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", {curviness: -100}]
        
    });

    instance.addEndpoint([AMMETER_POSITIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", {curviness: -20}]
        
    });

    instance.addEndpoint([POWER_POSITIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", {curviness: +20}]
        
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

    instance.addEndpoint([AMMETER_NEGATIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", {curviness: +20}]
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

function addValuesToTable() {
    var row = TABLE.insertRow(-1)
    var S_NO = row.insertCell(0)
    var POWER_VALUE = row.insertCell(1)
    var R1 = row.insertCell(2)
    var LOAD_RESISTANCE = row.insertCell(3)
    var VOLTAGE = row.insertCell(4)
    var AMMETER = row.insertCell(5)
    var POWER = row.insertCell(6)
    TABLE_COUNT = TABLE_COUNT + 1
    var AMMETER_READING = calcAmmeter(POWER_SUPPLY,R1_VALUE,RL_VALUE)
    var VOLTMETER_READING = calcVoltmeter(POWER_SUPPLY,R1_VALUE,RL_VALUE)

    S_NO.innerHTML = parseFloat(TABLE_COUNT)
    POWER_VALUE.innerHTML = parseFloat(POWER_SUPPLY.value).toFixed(2)
    R1.innerHTML = parseFloat(R1_VALUE.value).toFixed(2)
    LOAD_RESISTANCE.innerHTML = parseFloat(RL_VALUE.value).toFixed(2)
    VOLTAGE.innerHTML = parseFloat(VOLTMETER_READING).toFixed(2)
    AMMETER.innerHTML = parseFloat(AMMETER_READING).toFixed(2)
    POWER.innerHTML = parseFloat(VOLTMETER_READING * AMMETER_READING).toFixed(2)

}

function calcAmmeter(PS,R1,RL) {
    return parseFloat(PS.value) / (parseFloat(R1.value) + parseFloat(RL.value))
}

function calcVoltmeter(PS,R1,RL) {
return calcAmmeter(PS,R1,RL) * parseFloat(R1.value)
}




function updateAmmeter(AMMETER_VAR) {
    //TODO-RAGHAV
}

function updateVoltmeter(VOLTMETER_VAR) {
    //TODO-RAGHAV
}


/* Useless stuff below 
window.scrollTo(10, document.body.scrollHeight);
        connector: ["StateMachine", {curviness: -50}]

//POWER_POSITIVE, AMMETER_POSITIVE, VOLTAGE_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE, CIRCUIT_VOLTAGE_POSITIVE

*/