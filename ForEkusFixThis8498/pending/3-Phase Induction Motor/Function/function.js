cont = document.getElementById("container")

MCB_Blue = document.getElementById("mcb_b")
MCB_Yellow = document.getElementById("mcb_y")
MCB_Red = document.getElementById("mcb_r")

StarterInRed = document.getElementById("i_r")
StarterInYel = document.getElementById("i_b")
StarterInBlu = document.getElementById("i_y")
StarterOutRed = document.getElementById("o_r")
StarterOutYel = document.getElementById("o_b")
StarterOutBlu = document.getElementById("o_y")

MotorInRed = document.getElementById("motor-1")
MotorInYel = document.getElementById("motor-2")
MotorInBlu = document.getElementById("motor-3")
MotorOutRed = document.getElementById("motor-4")
MotorOutYel = document.getElementById("motor-5")
MotorOutBlu = document.getElementById("motor-6")

VoltmeterPositive = document.getElementById("p_v")
VoltmeterNegative = document.getElementById("n_v")

AmmeterPositive = document.getElementById("p_a")
AmmeterNegative = document.getElementById("n_a")

const instance = jsPlumb.getInstance({
    container: cont
});

instance.bind("ready", function () {
    instance.registerConnectionTypes({
        "blue": {
            paintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(97,106,229)", strokeWidth: 2.5 }
        },
        "red": {
            paintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "rgb(229, 97, 97)", strokeWidth: 2.5 }
        },
        "blue0": {
            paintStyle: { stroke: "blue", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "blue", strokeWidth: 2.5 }
        },
        "red0": {
            paintStyle: { stroke: "red", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "red", strokeWidth: 2.5 }
        },
        "yellow0": {
            paintStyle: { stroke: "yellow", strokeWidth: 2.5 },
            hoverPaintStyle: { stroke: "yellow", strokeWidth: 2.5 }
        }
    })

    instance.addEndpoint([MCB_Red], {
        endpoint: "Dot",
        anchor: [["Center"]],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red0",
        paintStyle: { fill: "red", strokeWidth: 2.5 },
        maxConnections: 10,
        connector: ["StateMachine", { curviness: 50 }]
    })

    instance.addEndpoint([MCB_Blue], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue0",
        paintStyle: { fill: "blue", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([MCB_Yellow], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "yellow0",
        paintStyle: { fill: "yellow", strokeWidth: 2.5 },
        maxConnections: 10
    })

    instance.addEndpoint([StarterInBlu, StarterInRed, StarterInYel, StarterOutBlu, StarterOutRed, StarterOutYel, MotorInBlu, MotorInRed, MotorInYel, MotorOutBlu, MotorOutRed, MotorOutYel, VoltmeterPositive, AmmeterPositive], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "red",
        paintStyle: { fill: "rgb(229, 97, 97)", strokeWidth: 2.5 },
        maxConnections: 10
    })  

    instance.addEndpoint([VoltmeterNegative, AmmeterNegative], {
        endpoint: "Dot",
        anchor: ["Center"],
        isSource: true,
        isTarget: true,
        connectionsDetachable: true,
        connectionType: "blue",
        paintStyle: { fill: "rgb(97, 97, 229)", strokeWidth: 2.5 },
        maxConnections: 10
    })
})

function isConnected(node1, node2){
    if( (instance.getConnections({ source:node1, target:node2 })[0] != undefined) || (instance.getConnections({ source:node2, target:node1 })[0] != undefined)){
        return true;
    }
    else{
        return false;
    }
}

function MCBToStarter(){
    MCB_nodes = [MCB_Red, MCB_Blue, MCB_Yellow]
    Starter_nodes = [StarterInRed, StarterOutBlu, StarterInYel]
    
    for(let i=0; i<MCB_nodes.length; i++){
        for(let j=0; j<Starter_nodes.length; j++){
            let counter = 0;
            if(isConnected(MCB_nodes[i], Starter_nodes[j])){
                counter=counter+1;
            }
            if(counter == 3){
                return true;
            }
            else{
                return false;
            }
        }
    }
}

function StarterToMotor(){
    Starter_nodes = [StarterInRed, StarterOutBlu, StarterInYel]
    MotorInNodes = [MotorInRed, MotorInBlu, MotorInYel]
    
    for(let i=0; i<MCB_nodes.length; i++){
        for(let j=0; j<MotorInNodes.length; j++){
            let counter = 0;
            if(isConnected(MCB_nodes[i], MotorInNodes[j])){
                counter=counter+1;
            }
            if(counter == 3){
                return true;
            }
            else{
                return false;
            }
        }
    }
}


