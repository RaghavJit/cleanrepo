var up = document.getElementById("up")
var down = document.getElementById("down")
var variacImg = document.getElementById("variacImg")
var index = 1;

up.onclick = function GoUp(){
    index = index + 1;
    switch(index){
        case 5:
            index = 1;
        case 1:
            variacImg.src = '..Assets/CFL_Off.png';
            break;
        case 2:
            variacImg.src = '..Assets/Lamp_Off.png';
            break;
        case 3:
            variacImg.src = '..Assets/Led_Off.png';
            break;
        case 4:
            variacImg.src = '..Assets/tubelight_Off.png';
            break;
    }
}