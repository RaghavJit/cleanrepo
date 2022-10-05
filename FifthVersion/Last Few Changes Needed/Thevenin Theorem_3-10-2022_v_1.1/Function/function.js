var cont = document.getElementById("container")

var add = document.getElementById("add")
var check = document.getElementById("check")
var calculate = document.getElementById("calculate")

var loadImg = document.getElementById("loadImg")

var vtable = document.getElementById("valTable")

var P_V = document.getElementById("P_V")
var P_A = document.getElementById("P_A")

var p_v = document.getElementById("p_v")
var n_v = document.getElementById("n_v")
var p_a = document.getElementById("p_a")
var n_a = document.getElementById("n_a")
var p_pow = document.getElementById("p_power")
var n_pow = document.getElementById("n_power")
var c_p_pow = document.getElementById("c_p_power1")
var c_n_pow = document.getElementById("c_n_power1")
var c_ul = document.getElementById("c_ul")
var c_ur = document.getElementById("c_ur")
var c_ll = document.getElementById("c_ll")
var c_lr = document.getElementById("c_lr")
var p_mul = document.getElementById("p_mul")
var n_mul = document.getElementById("n_mul")

var R1 = document.getElementById("R1")
var R2 = document.getElementById("R2")
var R3 = document.getElementById("R3")
var Rls = document.getElementById("Rls")

var RlD =  document.getElementById("RlDisplay")
var R1D =  document.getElementById("R1Display")
var R2D =  document.getElementById("R2Display")
var R3D =  document.getElementById("R3Display")
var PSD =  document.getElementById("PSDisplay")
var MMD = document.getElementById("MMDisplay")

var VC = document.getElementById("VthC")
var RC = document.getElementById("RthC")
var RlC = document.getElementById("RlC")
var nu = document.getElementById("numerator")
var de1 = document.getElementById("denominator1")
var de2 = document.getElementById("denominator2")
var IlC = document.getElementById("IlC")
var Ilo = document.getElementById("IlC_calc")
var Ilc = document.getElementById("IlC_obsv")

var on_pow = document.getElementById("on_power")

var variacSlider = document.getElementById("variacSlider")

var pow_state = 0
var R;
var V;
var I;

var valconn1 = [c_p_pow, c_n_pow, p_mul, c_ul, n_mul, c_ll]
var valconn2 = [p_pow, c_p_pow, n_pow, c_n_pow, p_v, c_ul, n_v, c_ll]
var valconn3 = [p_pow, c_p_pow, n_pow, c_n_pow, c_lr, c_ll, p_a, c_ul, n_a, c_ur]

var conn = []

var obs = 0;

var flags1 = 0
var flags4 = 0
var flags5 = 0

window.onload = function setSize() {
    document.body.style.zoom = "89%"
}

const instance = jsPlumb.getInstance({
    container: cont
});

R1.oninput = function updateR1() {
    flags1 = 1
    R1D.value = this.value 
}
R2.oninput = function updateR2() {
    flags1 = 1
    R2D.value = this.value
}
R3.oninput = function updateR3() {
    flags1 = 1
    R3D.value = this.value
}
Rls.oninput = function updateRls() {
    flags1 = 1
    RlD.value = this.value
}
variacSlider.oninput = function updateVS() {
    flags1 = 1
    PSD.value = this.value + ' V'
}

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
    })

    instance.addEndpoint([p_v, p_a, p_pow, c_ul, c_ur, c_p_pow, p_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 1
    })

    instance.addEndpoint([n_v, n_a, n_pow, c_ll, c_lr, c_n_pow, n_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 1
    })

})

function checkcon(l) {
    var arrChk = 0;
    for (var i = 0; i < l.length; i++) {
        if (i % 2 == 0) {
            if ((instance.getConnections({ source: l[i], target: l[i + 1] })[0] != undefined) || (instance.getConnections({ source: l[i + 1], target: l[i] })[0] != undefined)) {
                arrChk = arrChk + 1;
            }
        }
    }
    return arrChk;
}

function updateAmmeters(n) {
    var r1 = parseFloat(R1.value);
    var r2 = parseFloat(R2.value);
    var r3 = parseFloat(R3.value);
    var Rl = parseFloat(Rls.value)

    R = (r2 * r1) / (r1 + r2) + r3;

    V = (variacSlider.value * r2) / (r1 + r2)

    I = V / (R + Rl)

    console.log(V)

    if (n == 1) {
        MMD.value = R
    }
    else if (n == 2) {
        var d = V * 1.8
        P_V.style.transform = "rotate(" + d + "deg)"
    }
    else if (n == 3) {
        var d = I * 1.8
        P_A.style.transform = "rotate(" + d + "deg)"
    }
}

check.onclick = function callCheck() {
    var caseVal;
    var valList = [valconn1, valconn2, valconn3]

    for (var i = 0; i < 3; i++) {
        if ((i == 0) && (checkcon(valList[i])) == 3) {
            window.alert("Multimeter connected")
            caseVal = 1;
        }
        else if ((i == 1) && (checkcon(valList[i])) == 4) {
            window.alert("Voltmeter connected")
            caseVal = 2;
        }
        else if ((i == 2) && (checkcon(valList[i])) == 5) {
            window.alert("Load connected")
            caseVal = 3;
        }
    }

    temp = instance.getConnections.length
    updateAmmeters(caseVal)
}

on_pow.onclick = function toggle() {
    if (pow_state == 0) {
        document.getElementById("power").src = "../Assets/current_src_on.png"
        variacSlider.disabled=false
        pow_state = 1;
    }
    else if (pow_state == 1) {
        document.getElementById("power").src = "../Assets/current_src_off.png"
        variacSlider.disabled=true
        pow_state = 0;
    }
}

add.onclick = function AddToTable() {

    flags4 = 1

    let row = vtable.insertRow(obs + 1);

    let SNo = row.insertCell(0);
    let V_th = row.insertCell(1);
    let R_th = row.insertCell(2);
    let R_load = row.insertCell(3)
    let Reading = row.insertCell(4);

    SNo.innerHTML = obs + 1;

    V_th.innerHTML = (V).toPrecision(3);
    R_th.innerHTML = (R).toPrecision(3);
    R_load.innerHTML = document.getElementById("Rls").value
    Reading.innerHTML = (I).toPrecision(3);
    obs = obs + 1;

    calculate.disabled = false
}

calculate.onclick = function doCalc(){
    R1.disabled = false;
    R2.disabled = false;
    R3.disabled = false;
    Rls.disabled = false;
    variacSlider.disabled = false;

    VC.value = V
    RC.value = R
    RlC.value = Rl.value

    nu.value = V
    de1.value = R
    de2.value = Rl.value

    IlC.value = I
    Ilc.value = I
    Ilo.value = I
}

function highlight() {
    s1 = document.getElementById("s1");
    s2 = document.getElementById("s2");
    s3 = document.getElementById("s3");
    s4 = document.getElementById("s4");
    s5 = document.getElementById("s5");
    s6 = document.getElementById("s6");
    s7 = document.getElementById("s7");

    if (flags1 == 1) {
        s1.style.color = "black";
        s2.style.color = "red";
    }

    conn = instance.getConnections();

    if (conn.length >= 1) {
        s1.style.color = "black";
        s2.style.color = "black";
        s3.style.color = "red";

        R1.disabled = true;
        R2.disabled = true;
        R3.disabled = true;
        Rls.disabled = true;
        variacSlider.disabled = true;
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


}

window.setInterval(highlight, 100);