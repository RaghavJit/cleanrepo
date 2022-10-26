var cont = document.getElementById("connections_buttons")
var CHECK_BUTTON = document.getElementById("check")
var VOLTMETER_POSITIVE = document.getElementById("p_v")
var VOLTMETER_NEGATIVE = document.getElementById("n_v")
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
var CIRCUIT_VOLTMETER_POSITIVE = document.getElementById("c_v_p")
var CIRCUIT_VOLTMETER_NEGATIVE = document.getElementById("c_v_n")
var MCB_SWITCH = document.getElementById("mcb_switch")
var VOLTAGE_POINTER = document.getElementById("P_V")
var AMMETER_POINTER = document.getElementById("P_A")
var CALCULATE_BUTTON = document.getElementById("calculate")
var RESET_BUTTON = document.getElementById("reset")
var PRINT_BUTTON = document.getElementById("print")
var POWER_IMG = document.getElementById("power")
var MCB_IMG = document.getElementById("mcb")
var toggle = false
var validConn = [
    POWER_POSITIVE, CIRCUIT_POWER_POSITIVE,
    POWER_NEGATIVE, CIRCUIT_POWER_NEGATIVE,
    VOLTMETER_POSITIVE, CIRCUIT_VOLTMETER_POSITIVE,
    VOLTMETER_NEGATIVE, CIRCUIT_VOLTMETER_NEGATIVE,
    MULTIMETER_POSITIVE, CIRCUIT_VOLTMETER_POSITIVE,
    MULTIMETER_NEGATIVE, CIRCUIT_VOLTMETER_NEGATIVE,
    AMMETER_POSITIVE, CIRCUIT_AMMETER_POSITIVE,
    AMMETER_NEGATIVE, CIRCUIT_AMMETER_NEGATIVE
]
var arrChk = 0
var arrChkStore = 0
var CONNECTIONS_CHECK_BOOL = true;
var L = 200;
var POWER_STATE = 0
var MCB_STATE = 0

var POWER_SUPPLY = document.getElementById("PSslider")
var R1_SLIDER = document.getElementById("R1")
var RL_SLIDER = document.getElementById("RL")
var TABLE = document.getElementById("valTable")
var TABLE_COUNT = 0
var ADD_BUTTON = document.getElementById("add")
//ADD_BUTTON.disabled = true
const instance = jsPlumb.getInstance({
    container: cont
});

//TOGGLE BUTTONS

POWER_ON.onclick = function toggle_power(){
    if(POWER_STATE == 0){
        POWER_IMG.src = "../Assets/PowerSupplyOn.png"
        POWER_STATE = 1
    }
    else if(POWER_STATE == 1){
        POWER_IMG.src = "../Assets/PowerSupplyOff.png"
        POWER_STATE = 0
    }
}

MCB_SWITCH.onclick = function toggle_mcb(){
    if(MCB_STATE == 0){
        MCB_IMG.src = "../Assets/MCB_On.png"
        MCB_SWITCH.style.transform = "translate(0px, -55px)"
        MCB_STATE = 1
    }
    else if(MCB_STATE == 1){
        MCB_IMG.src = "../Assets/MCB_Off.png"
        MCB_SWITCH.style.transform = "translate(0px, 0px)"
        MCB_STATE = 0
    }
}

//ON-CLICK / ON-INPUT TRIGGERS BELOW---------------------------------------------

POWER_SUPPLY.oninput = function () {
    document.getElementById("VOLTAGE_VALUE").innerHTML = this.value;
    updateAmmeter(calcAmmeter(this, R1_SLIDER, RL_SLIDER))
    updateVoltmeter(calcVoltmeter(this, R1_SLIDER, RL_SLIDER))
}
R1_SLIDER.oninput = function () {
    document.getElementById("R1_VALUE").innerHTML = this.value;
    updateAmmeter(calcAmmeter(POWER_SUPPLY, this, RL_SLIDER))
    updateVoltmeter(calcVoltmeter(POWER_SUPPLY, this, RL_SLIDER))
}
RL_SLIDER.oninput = function () {
    document.getElementById("RL_VALUE").innerHTML = this.value;
    updateAmmeter(calcAmmeter(POWER_SUPPLY, R1_SLIDER, this))
    updateVoltmeter(calcVoltmeter(POWER_SUPPLY, R1_SLIDER, this))
}
ADD_BUTTON.onclick = function () {
    addValuesToTable();
}
//ON-CLICK / ON-INPUT TRIGGERS END -------------------------------------------------

instance.bind("ready", function () {
    createConnections();
});

CHECK_BUTTON.onclick = function checkConnections() {
    for (let i = 0; i < validConn.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: validConn[i], target: validConn[i + 1] })[0] != undefined) || (instance.getConnections({ source: validConn[i + 1], target: validConn[i] })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }
    }

    if (arrChk == 8) {
        alert("Right connections! Please choose resistance values.")

        disableConnections()
        R1_SLIDER.disabled = true
        POWER_SUPPLY.disabled = true
        ADD_BUTTON.disabled = false

        arrChk = 0;
    }

    else if (instance.getAllConnections().length == 0) {
        alert("Please make connections")
    }

    else {
        alert("Invalid connections!! Please re-check your connections")
        console.log(arrChk)
        // window.location.reload()
    }
}

document.addEventListener('contextmenu', event => event.preventDefault());

//function to make connections
function createConnections() {
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

    instance.addEndpoint([MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", { curviness: -100 }]

    });

    instance.addEndpoint([VOLTMETER_POSITIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", { curviness: 100 }]

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
        connector: ["StateMachine", { curviness: -20 }]

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
        connector: ["StateMachine", { curviness: +20 }]

    });


    instance.addEndpoint([POWER_NEGATIVE, AMMETER_NEGATIVE, VOLTMETER_NEGATIVE, MULTIMETER_NEGATIVE, CIRCUIT_POWER_NEGATIVE, CIRCUIT_AMMETER_NEGATIVE], {
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
        connector: ["StateMachine", { curviness: +20 }]
    });

    instance.addEndpoint([CIRCUIT_VOLTMETER_POSITIVE], { //Added 2 endpoints just for these 2 points, since only these will be having multiple connections. 
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: true,
        maxConnections: 2
    });

    instance.addEndpoint([CIRCUIT_VOLTMETER_NEGATIVE], {
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
    instance.addEndpoint([POWER_POSITIVE, AMMETER_POSITIVE, VOLTMETER_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE], { //POWER_POSITIVE, AMMETER_POSITIVEP, VOLTMETER_POSITIVE, AMMETER_POSITIVE, MULTIMETER_POSITIVE, CIRCUIT_POWER_POSITIVE, CIRCUIT_AMMETER_POSITIVE, CIRCUIT_VOLTMETER_POSITIVE
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: false,
        isTarget: false,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: false,
        maxConnections: 1
    });

    instance.addEndpoint([POWER_NEGATIVE, AMMETER_NEGATIVE, VOLTMETER_NEGATIVE, MULTIMETER_NEGATIVE, CIRCUIT_POWER_NEGATIVE, CIRCUIT_AMMETER_NEGATIVE], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: false,
        isTarget: false,
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionType: "negative",
        connectionsDetachable: false,
        maxConnections: 1
    });

    instance.addEndpoint([CIRCUIT_VOLTMETER_POSITIVE], { //Added 2 endpoints just for these 2 points, since only these will be having multiple connections. 
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: false,
        isTarget: false,
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionType: "positive",
        connectionsDetachable: false,
        maxConnections: 2
    });

    instance.addEndpoint([CIRCUIT_VOLTMETER_NEGATIVE], {
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
    var AMMETER_READING = calcAmmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER)
    var VOLTMETER_READING = calcVoltmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER)

    S_NO.innerHTML = parseFloat(TABLE_COUNT)
    POWER_VALUE.innerHTML = parseFloat(POWER_SUPPLY.value).toFixed(2)
    R1.innerHTML = parseFloat(R1_SLIDER.value).toFixed(2)
    LOAD_RESISTANCE.innerHTML = parseFloat(RL_SLIDER.value).toFixed(2)
    VOLTAGE.innerHTML = parseFloat(VOLTMETER_READING).toFixed(2)
    AMMETER.innerHTML = parseFloat(AMMETER_READING).toFixed(2)
    POWER.innerHTML = parseFloat(VOLTMETER_READING * AMMETER_READING).toFixed(2)

}

function calcAmmeter(PS, R1, RL) {
    return parseFloat(PS.value) / (parseFloat(R1.value) + parseFloat(RL.value))
}

function calcVoltmeter(PS, R1, RL) {
    return calcAmmeter(PS, R1, RL) * parseFloat(R1.value)
}

function updateAmmeter() {
    let d = calcAmmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER) * 1.8;
    AMMETER_POINTER.style.transform = "rotate("+ d +"deg)"
}

function updateVoltmeter() {
    let d = calcVoltmeter(POWER_SUPPLY, R1_SLIDER, RL_SLIDER) * 36;
    VOLTAGE_POINTER.style.transform = "rotate("+ d +"deg)"
}