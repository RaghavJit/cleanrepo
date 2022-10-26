var cont = document.getElementById("container")

var add = document.getElementById("add")
var check = document.getElementById("check")
var calculate = document.getElementById("calculate")
var verify = document.getElementById("verify")
var reset = document.getElementById("reset")

var V1reading = document.getElementById("V1reading")
var A1reading = document.getElementById("A1reading")
var W1reading = document.getElementById("W1reading")
var answer = document.getElementById("answer")

var loadImg = document.getElementById("loadImg")

var vtable = document.getElementById("valTable")

var P_V = document.getElementById("P_V")
var P_A = document.getElementById("P_A")

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

var R1D = document.getElementById("R1Display")
var R2D = document.getElementById("R2Display")
var R3D = document.getElementById("R3Display")
var RlsD = document.getElementById("RlDisplay")
var PSD = document.getElementById("PSDisplay")
var MMD = document.getElementById("MMDisplay")

var IscC = document.getElementById("IscC")
var ReqC = document.getElementById("ReqC")
var RlC = document.getElementById("RlC")
var ReqC2 = document.getElementById("ReqC2")
var RlC2 = document.getElementById("RlC2")
var IlC = document.getElementById("IlC")
var num1 = document.getElementById("numeriator1")
var num2 = document.getElementById("numeriator2")
var user = document.getElementById("user")

var on_pow = document.getElementById("on_power")

var variacSlider = document.getElementById("variacSlider")

var pow_state = 0
var R;
var Isc;
var Il;

var valconn1 = [c_p_pow, c_n_pow, p_mul, c_ul, n_mul, c_ll]
var valconn2 = [p_pow, c_p_pow, n_pow, c_n_pow, p_a, c_ul, n_a, c_ll]
var valconn3 = [p_pow, c_p_pow, n_pow, c_n_pow, c_lr, c_ll, c_ul, p_a, c_ur, n_a]

var conn = []

var obs = 0;

var iter = []
var flags1 = 0
var flags1_2 = 0
var flags4 = 0
var flags5 = 0

window.onload = function setSize() {
    document.body.style.zoom = "89%"
}

const instance = jsPlumb.getInstance({
    container: cont
});

R1.oninput = function updateR1() {
    R1D.value = this.value
    flags1 = 1
}
R2.oninput = function updateR2() {
    R2D.value = this.value
    flags1 = 1
}
R3.oninput = function updateR3() {
    R3D.value = this.value
    flags1 = 1
}
Rls.oninput = function updateRls() {
    RlsD.value = this.value
    flags1 = 1
}
variacSlider.oninput = function updateVS() {
    PSD.value = this.value + " V"
    flags1_2 = 1
}

reset.onclick = function resetConn(){
    instance.deleteEveryConnection()
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

    instance.addEndpoint([p_a, p_pow, c_ul, c_ur, c_p_pow, p_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([n_a, n_pow, c_ll, c_lr, c_n_pow, n_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([c_ur], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "rgb(97,106,229)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
    })

    instance.addEndpoint([c_lr], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 10
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
    console.log(arrChk)
    return arrChk;
}

function updateAmmeters(n) {
    var r1 = parseFloat(R1.value);
    var r2 = parseFloat(R2.value);
    var r3 = parseFloat(R3.value);
    var Rl = parseFloat(Rls.value);
    var V = parseFloat(variacSlider.value)

    R = (r2 * r3) / (r3 + r2) + r1;

    Isc = (r2/(r2+r3))*(V/R)

    Il = Isc * (R/(R + Rl))

    if (n == 1) {
        MMD.value = R
    }
    else if (n == 2) {
        var d = Isc * 0.9
        P_A.style.transform = "rotate(" + d + "deg)"
    }
    else if (n == 3) {
        var d = Il * 0.9
        P_A.style.transform = "rotate(" + d + "deg)"
    }
}

check.onclick = function callCheck() {
    var caseVal = 0;
    var valList = [valconn1, valconn2, valconn3]

    for (var i = 0; i < 3; i++) {
        if ((i == 0) && (checkcon(valList[i])) == 3) {
            window.alert("Multimeter connected")
            caseVal = 1;
        }
        else if ((i == 1) && (checkcon(valList[i])) == 4) {
            window.alert("Ammeter connected")
            caseVal = 2;
        }
        else if ((i == 2) && (checkcon(valList[i])) == 5) {
            window.alert("Load and Ammeter connected")
            caseVal = 3;
        }
    }

    if(instance.getAllConnections().length == 0){
        window.alert("Please make connections")
    }

    else if(caseVal == 0){
        window.alert("Invalid Connectios")
        window.location.reload()
    }

    iter.push(caseVal)

    if((iter.indexOf(1)>=0)&&(iter.indexOf(2)>=0)&&(iter.indexOf(3)>=0)){
        add.disabled=false
    }

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

    calculate.disabled = false

    flags4 = 1

    let row = vtable.insertRow(obs + 1);

    let SNo = row.insertCell(0);
    let tabPSvalu = row.insertCell(1);
    let tabIsc = row.insertCell(2);
    let tabR_n = row.insertCell(3)
    let tabIL = row.insertCell(4);
    let tabRl = row.insertCell(5);

    SNo.innerHTML = obs + 1;

    tabPSvalu.innerHTML = variacSlider.value;
    tabIsc.innerHTML = Isc.toFixed(3);
    tabR_n.innerHTML = R.toFixed(3);
    tabIL.innerHTML = Il.toFixed(3);
    tabRl.innerHTML = document.getElementById("Rls").value;
    obs = obs + 1;
}

calculate.onclick = function doCalc(){
    console.log("ok")
    IscC.value = Isc
    ReqC.value = R
    ReqC2.value = R
    RlC.value = Rls.value
    RlC2.value = Rls.value
    num1.value = Isc
    num2.value = R
    IlC.value = Il

    verify.disabled = false

}

verify.onclick = function verifyVal(){
    if(IlC.innerHTML == user.innerHTML){
        window.alert("Reading and Calculation matches")
    }
}

function disconnect(node){
    var node_list = [p_a, n_a, p_mul, n_mul, p_pow, n_pow, c_p_pow, c_n_pow, c_ul, c_ur, c_ll, c_lr]
    instance.deleteConnectionsForElement(node_list[node])
}

function highlight() {
    s1 = document.getElementById("s1");
    s2 = document.getElementById("s2");
    s3 = document.getElementById("s3");
    s4 = document.getElementById("s4");
    s5 = document.getElementById("s5");
    s6 = document.getElementById("s6");
    s7 = document.getElementById("s7");

    if((flags1 == 0) && (instance.getAllConnections().length != 0)){
        window.alert("Please choose resistance values first")
        instance.deleteEveryConnection()
    }

    if((flags1_2 == 0) && (instance.getAllConnections().length != 0)){
        window.alert("Please choose voltage value")
        instance.deleteEveryConnection()
    }

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
        on_pow.disabled = true
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