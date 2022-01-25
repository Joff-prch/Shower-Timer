//Btn
let start = document.querySelector('#start');
let reset = document.querySelector('#reset');
let audio = new Audio('assets/bruit.m4a');

//Input timer 
let min = document.querySelector('#minutes');
let sec = document.querySelector('#seconds');

//InnerHTML
let remains = document.querySelector('#remaining');
let bigTitle = document.querySelector('#indications-input');
let order = document.querySelector('#order');

//Let timer
let before = null;
let mainTimer = null;
let interval = 1000;

min.value = 3;
sec.value = 45;

start.addEventListener('click', function (){
    this.disabled = true;

    orderIndications('start');
    before = setInterval(countDown, 1000);
})


function countDown(){
    remains.innerHTML = remains.innerHTML - 1;
    if(remains.innerHTML < 0){
        audio.play();
        clearInterval(before)
        mainTimer = setInterval(Timer, interval);
        starting();
    }
}

function starting(){
    orderIndications("shower");
    timeInShower(min, sec);
}

function Timer(){
    sec.value = sec.value - 1;
    if(sec.value < 0){
        min.value = min.value - 1;
        sec.value = 59
    }
}

function timeInShower(min, sec){
    minutes = parseInt(min.value);
    seconds = parseInt(sec.value);

    minutes = minutes * 60
    max = minutes + seconds;
    orderIndications('shower');
    if(max > 160){
        max = Math.round((max - 90) / 2);
        remains.innerHTML = max;
        long = setInterval(longRemains, interval);
    }else {
        max = Math.round(max / 3);
        remains.innerHTML = max;
        long = setInterval(shortRemains, interval);
    }
}
let good = false;
let goodz = true;
let end = false;



function longRemains(){
    remains.innerHTML = remains.innerHTML - 1;
    if(remains.innerHTML  <= 0 && goodz){
        audio.play();
        good = true;
        goodz = false;
        orderIndications('soap');
        console.log('long');
        remains.innerHTML = 90;
    }
    if(good && remains.innerHTML  <= 0){
        audio.play();
        orderIndications('end');
        console.log('bliblilong');
        remains.innerHTML = max;
        good = false;
        end = true;
    }
    if(end && remains.innerHTML  <= 0){
        audio.play();
        ending();
    }
}




function shortRemains(){
    remains.innerHTML = remains.innerHTML - 1;
    if(remains.innerHTML  <= 0 && goodz){
        audio.play();
        good = true;
        goodz = false;
        orderIndications('soap');
        console.log('short');
        remains.innerHTML = max;
    }
    if(good && remains.innerHTML  <= 0){
        audio.play();
        orderIndications('end');
        console.log('bliblishort');
        remains.innerHTML = max;
        good = false;
        end = true;
    }
    if(end && remains.innerHTML  <= 0){
        audio.play();
        ending();
    }
}


function orderIndications(string){
    if(string == 'shower'){
        bigTitle.innerHTML = "SHOWER !!"
        order.innerHTML = "SOAP";
    } else if (string == 'soap'){
        bigTitle.innerHTML = "SOAP !!"
        order.innerHTML = "SHOWER";
    } else if(string == 'start'){
        remains.innerHTML = 10;
        bigTitle.innerHTML = "START IN.."
        order.innerHTML = "SHOWER";
    }else if (string == 'end'){
        bigTitle.innerHTML = "SHOWER !!"
        order.innerHTML = "END";
    }
}


function ending(){
    clearInterval(long);
    clearInterval(mainTimer);
    min.value = 0;
    sec.value = 0;
    remains.innerHTML = 0;
    bigTitle.innerHTML = "FINISH !!"

}
