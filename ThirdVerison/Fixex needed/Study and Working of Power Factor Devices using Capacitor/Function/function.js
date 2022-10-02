
var cont = document.getElementById("container")

var add = document.getElementById("add")
var calculate = document.getElementById("calculate")
var prnt = document.getElementById("print")

var mcb_switch = document.getElementById("on_mcb")
var var_switch = document.getElementById("var_on")
var onOff_switch = document.getElementById("switch")

var up = document.getElementById("up")
var loadImg = document.getElementById("loadImg")

vtable = document.getElementById("valTable")

var variacSlider = document.getElementById("variacSlider")

var P_V = document.getElementById("P_V")
var P_A = document.getElementById("P_A")
var P_W = document.getElementById("P_W")

var p_mcb = document.getElementById("p_mcb")
var n_mcb = document.getElementById("n_mcb")
var on_mcb = document.getElementById("on_mcb")
var p_fuse = document.getElementById("p_fuse")
var n_fuse = document.getElementById("n_fuse")
var p_switch = document.getElementById("p_switch")
var n_switch = document.getElementById("n_switch")
var p_v = document.getElementById("p_v")
var n_v = document.getElementById("n_v")
var p_a = document.getElementById("p_a")
var n_a = document.getElementById("n_a")
var v_w = document.getElementById("v_w")
var l_w = document.getElementById("l_w")
var m_w = document.getElementById("m_w")
var c_w = document.getElementById("c_w")
var a_var = document.getElementById("a_var")
var b_var = document.getElementById("b_var")
var c_var = document.getElementById("c_var")
var d_var = document.getElementById("d_var")
var var_on = document.getElementById("var_on")
var p_l = document.getElementById("p_l")
var n_l = document.getElementById("n_l")

var DC1 = document.getElementById("DeviceC1")
var DC2 = document.getElementById("DeviceC2")
var VrC = document.getElementById("VariacValC")
var VC = document.getElementById("VoltmeterC")
var AC = document.getElementById("AmmeterC")
var WC = document.getElementById("WattmeterC")
var nu = document.getElementById("numerator")
var de1 = document.getElementById("denominator1")
var de2 = document.getElementById("denominator2")
var pf = document.getElementById("powerfactor")

var s1 = document.getElementById("s1")
var s2 = document.getElementById("s2")
var s3 = document.getElementById("s3")
var s4 = document.getElementById("s4")
var s5 = document.getElementById("s5")
var s6 = document.getElementById("s6")
var s7 = document.getElementById("s7")

var valConn = [
    p_mcb, a_var,
    n_mcb, b_var,
    c_var, p_v,
    d_var, n_v,
    n_a, m_w,
    n_a, c_w,
    l_w, n_l,
    v_w, p_l,
]
var valList = [c_var, p_fuse, n_fuse, p_switch, n_switch, p_a];
var arrChk = 0

var index = -1;
var obs = 1;

var flags3 = 0;
var flags4 = 0;
var flags5 = 0;
var flags6 = 0;
var flags7 = 0;

var d1, d2, d3, d4;

var mcb_state = 0;
var var_state = 0;
var onOff_state = 0;

window.onload = function setSize() {
    document.body.style.zoom = "99%"
}

const instance = jsPlumb.getInstance({
    container: cont
});

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "positive": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
        "negative": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 }
        },
        "grey": {
            paintStyle: { stroke: "grey", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "grey", strokeWidth: 2.5 }
        }
    })

    instance.addEndpoint([n_a, c_var], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 2,
        connector: ["StateMachine", { curviness: -90 }]
    })

    instance.addEndpoint([p_mcb, p_a, p_v, v_w, c_w, a_var, v_w,
        b_var, d_var, c_w, p_l], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", { curviness: -90 }]
    })

    instance.addEndpoint([n_mcb, n_v, n_a, c_w, m_w, l_w,
        b_var, d_var, c_w, n_l], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "red", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", { curviness: -90 }]
    })

    instance.addEndpoint([n_fuse, n_switch, p_fuse, p_switch], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "grey",
        paintStyle: { fill: "grey", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 1,
        connector: ["StateMachine", { curviness: -90 }]
    })

})

check.onclick = function chkConn() {

    flags3 = 1

    console.log(instance.getConnections({ source: p_mcb, target: a_var })[0])
    for (var i = 0; i < valConn.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: valConn[i], target: valConn[i + 1] })[0] != undefined) || (instance.getConnections({ source: valConn[i + 1], target: valConn[i] })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }
    }
    console.log(arrChk)

    for (var i = 0; i < valList.length; i++) {
        if ((instance.getConnections({ source: valList[i] })[0] != undefined)) {
            arrChk = arrChk + 1;
        }
    }

    if (arrChk == 11) {
        window.alert("Right Connections!")
        up.disabled = false;
        arrChk = 0;
    }
    else {
        console.log(arrChk)
    }
}

up.onclick = function GoUp() {
    flags4 = 1;
    switch (index) {
        case -1:
            index = 1;
        case 3:
            loadImg.src = '../Assets/CFL_Off.png';
            index = 0;
            break;
        case 0:
            loadImg.src = '../Assets/Lamp_Off.png';
            index = 1;
            break;
        case 1:
            loadImg.src = '../Assets/Led_Off.png';
            index = 2;
            break;
        case 2:
            loadImg.src = '../Assets/tubelight_Off.png';
            index = 3;
            break;
    }
    updateVals();
}

function setZero() {
    P_V.style.transform = "rotate(0deg)"
    P_A.style.transform = "rotate(0deg)"
    P_W.style.transform = "rotate(0deg)"
}

function updateVals() {
    d1 = variacSlider.value * 1.565217
    d2 = variacSlider.value * 0.6

    if ((mcb_state == 1) && (onOff_state == 1) && (var_state == 1)) {
        Var_Knob.style.transform = "rotate(" + d1 + "deg)"
        P_V.style.transform = "rotate(" + d2 + "deg)"

        if (index == 0) {
            d3 = variacSlider.value * 117.5 / 230
            d4 = variacSlider.value * 59.8 / 230

            P_A.style.transform = "rotate(" + d3 * (180 / 500) + "deg)"
            P_W.style.transform = "rotate(" + d4 * (90 / 100) + "deg)"
        }
        if (index == 1) {
            d3 = variacSlider.value * 270 / 230
            d4 = variacSlider.value * 24 / 230

            P_A.style.transform = "rotate(" + d3 * (180 / 500) + "deg)"
            P_W.style.transform = "rotate(" + d4 * (90 / 100) + "deg)"
        }
        if (index == 2) {
            d3 = variacSlider.value * 45 / 230
            d4 = variacSlider.value * 8 / 230

            P_A.style.transform = "rotate(" + d3 * (180 / 500) + "deg)"
            P_W.style.transform = "rotate(" + d4 * (90 / 100) + "deg)"
        }
        if (index == 3) {
            d3 = variacSlider.value * 325 / 230
            d4 = variacSlider.value * 52.8 / 230

            P_A.style.transform = "rotate(" + d3 * (180 / 500) + "deg)"
            P_W.style.transform = "rotate(" + d4 * (90 / 100) + "deg)"
        }
    }
}

variacSlider.oninput = function updateValsCall() {
    updateVals();
}

var_switch.onclick = function toggle_var() {

    //FLAGS

    if (mcb_state == 1) {
        if (var_state == 0) {
            document.getElementById('Var').src = '../Assets/Variac_ON.png' // IF IN OFF STATE PLACE IMAGE OF ON STATE
            variacSlider.disabled = false
            add.disabled = false
            var_state = 1;

            updateVals();
        }
        else if (var_state == 1) {
            document.getElementById('Var').src = '../Assets/Variac_OFF.png' // IF IN ON STATE PLACE IMAGE OF OFF STATE

            variacSlider.value = 0
            var_state = 0;

            setZero();
        }
    }
}

mcb_switch.onclick = function toggle_mcb() {
    flags5 = 1
    if (mcb_state == 0) {
        document.getElementById('MCB').src = '../Assets/MCB_ON.png' // IF IN OFF STATE PLACE IMAGE OF ON STATE
        mcb_state = 1;
        mcb_switch.style.transform = "translate(0px, -60px)"

        updateVals();
    }
    else if (mcb_state == 1) {
        document.getElementById('MCB').src = '../Assets/MCB_Off.png' // IF IN ON STATE PLACE IMAGE OF OFF STATE
        document.getElementById('Var').src = '../Assets/Variac_OFF.png'
        variacSlider.disabled = true
        variacSlider.value = 0
        variacSlider.value = 0;
        mcb_state = 0;
        mcb_switch.style.transform = "translate(0px, 0px)"

        setZero();
    }
}

onOff_switch.onclick = function toggle_switch() {
    if (onOff_state == 0) {
        document.getElementById('switch').src = '../Assets/Switch_On.png' // IF IN OFF STATE PLACE IMAGE OF ON STATE
        onOff_state = 1;

        updateVals();
    }
    else if (onOff_state == 1) {
        document.getElementById('switch').src = '../Assets/Switch_off.png' // IF IN ON STATE PLACE IMAGE OF OFF STATE
        onOff_state = 0;

        setZero();
    }
}


add.onclick = function AddToTable() {

    if (obs < 8) {
        flags6 = 1

        let row = vtable.insertRow(obs);

        let SNo = row.insertCell(0);
        let volt = row.insertCell(1);
        let amps = row.insertCell(2);
        let watts = row.insertCell(3);
        let Pf = row.insertCell(4);

        SNo.innerHTML = obs;

        volt.innerHTML = (variacSlider.value);
        amps.innerHTML = (d3);
        watts.innerHTML = (d4);
        obs = obs + 1;

        calculate.disabled = false
    }
}

calculate.onclick = function doCalc() {

    flags7 = 1;

    mcb_state = 0
    onOff_state = 0
    var_state = 0
    document.getElementById('MCB').src = '../Assets/MCB_Off.png' // IF IN ON STATE PLACE IMAGE OF OFF STATE
    document.getElementById('Var').src = '../Assets/Variac_OFF.png'
    document.getElementById('switch').src = '../Assets/Switch_off.png'

    setZero();


    if (obs > 0) {
        if (index == 0) {
            vtable.rows[obs - 1].cells[4].innerHTML = 0.880
        }
        else if (index == 1) {
            vtable.rows[obs - 1].cells[4].innerHTML = 0.960
        }
        else if (index == 2) {
            vtable.rows[obs - 1].cells[4].innerHTML = 0.770
        }
        else if (index == 3) {
            vtable.rows[obs - 1].cells[4].innerHTML = 0.707
        }
    }

    switch (index) {
        case 0:
            DC1.value = "CFL"
            DC2.value = "CFL"
            pf.value = 0.880
            break;
        case 1:
            DC1.value = "Lamp"
            DC2.value = "Lamp"
            pf.value = 0.960
            break;
        case 2:
            DC1.value = "LED"
            DC2.value = "LED"
            pf.value = 0.770
            break;
        case 3:
            DC1.value = "Tubelight"
            DC2.value = "Tubelight"
            pf.value = 0.707
            break;
    }

    VrC.value = vtable.rows[obs-1].cells[1].innerHTML

    VC.value = vtable.rows[obs-1].cells[1].innerHTML
    AC.value = vtable.rows[obs-1].cells[2].innerHTML
    WC.value = vtable.rows[obs-1].cells[3].innerHTML

    nu.value = vtable.rows[obs-1].cells[3].innerHTML
    de1.value = vtable.rows[obs-1].cells[2].innerHTML
    de2.value = vtable.rows[obs-1].cells[1].innerHTML
}

function highlight() {

    let conn = instance.getConnections();

    if (conn.length == 1) {
        s1.style.color = "black";
        s2.style.color = "red";

    }

    if (flags3 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";
    }

    if (flags4 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "red";
    }

    if (flags5 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "red";
    }

    if (flags6 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "red";
    }

    if (flags7 == 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "black";
        s4.style.color = "black";
        s5.style.color = "black";
        s6.style.color = "black";
        s7.style.color = "red";

        prnt.disabled = false;
    }

}

window.setInterval(highlight, 100);