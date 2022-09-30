var cont = document.getElementById("container")

var add = document.getElementById("add")

var V1reading = document.getElementById("V1reading")
var A1reading = document.getElementById("A1reading")
var W1reading = document.getElementById("W1reading")
var answer = document.getElementById("answer")

var up = document.getElementById("up")
var down = document.getElementById("down")
var loadImg = document.getElementById("loadImg")

var vtable = document.getElementById("valTable")

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

var on_pow = document.getElementById("on_power")

var variacSlider = document.getElementById("variacSlider")

var pow_state = 0
var R;
var V;
var I;

var valconn1 = [p_pow, c_p_pow, n_pow, c_n_pow, p_mul, c_ur, n_mul, c_lr]
var valconn2 = [p_pow, c_p_pow, n_pow, c_n_pow, p_v, c_ur, n_v, c_lr]
var valconn3 = [p_pow, c_p_pow, n_pow, c_n_pow, c_lr, c_ll, p_a, c_ur, n_a, c_ul]

var obs = 0;

window.onload = function setSize(){
    document.body.style.zoom = "89%"
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
    })

    instance.addEndpoint([p_v, p_a, p_pow, c_ul, c_ur, c_p_pow, p_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "negative",
        paintStyle: { fill: "red", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 1
    })

    instance.addEndpoint([n_v, n_a, n_pow, c_ll, c_lr, c_n_pow, n_mul], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionType: "positive",
        paintStyle: { fill: "blue", strokeWidth: 2.5 },
        connectionsDetachable: true,
        maxConnections: 1
    })

})

function updateAmmeters(){
    var r1 = parseFloat(R1.value).toPrecision(3);
    var r2 = parseFloat(R2.value).toPrecision(3);
    var r3 = parseFloat(R3.value).toPrecision(3);

    R = (r2*r1)/(r1+r2) + r3;

    V = (variacSlider.value * r2) / (r1 + r2)

    I = V*R
}

on_pow.onclick = function toggle(){
    if(pow_state == 0){
        document.getElementById("power").src = "../Assets/current_src_on.png"
        pow_state = 1;
    }
    else if(pow_state == 1){
        document.getElementById("power").src = "../Assets/current_src_off.png"
        pow_state = 0;
    }
}

add.onclick = function AddToTable() {

    //FLAGS

    let row = vtable.insertRow(obs+1);

    let SNo = row.insertCell(0);
    let volt = row.insertCell(1);
    let amps = row.insertCell(2);
    let watts = row.insertCell(3);
    let Pf = row.insertCell(4);

    SNo.innerHTML = obs;

    /*volt.innerHTML = ().toPrecision(3);
    amps.innerHTML = ().toPrecision(3);
    watts.innerHTML = ().toPrecision(3);
    
    Pf.innerHTML = ().toPrecision(3);*/
    obs = obs + 1;
}

variacSlider.oninput = function updateVals(){
    V1reading.value = variacSlider.value

}