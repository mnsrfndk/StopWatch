let minutesDOM = document.getElementById('minutes');
let secondsDOM = document.getElementById('seconds');

const startDOM = document.getElementById('start');
const stopDOM = document.getElementById('stop');
const resetDOM = document.getElementById('reset');

let seconds = 0;
let minutes = 0;
let started = false;
let interval;

const increment = () => {
    seconds++;
    if(seconds<10) {
    secondsDOM.innerText = "0"+seconds;
    /*
        We add "0" at the beginning when seconds are under
        10 because while they are under 10, they contain only
        one digits which causes the problem of DOM rendering
        only one digit when it needs to show two no matter what.
        Same goes for minutes as well.
        e.g. Error => 00:1   Correct => 00:01
            Error => 4:54   Correct => 04:54
    */
    } else {
        secondsDOM.innerText = seconds;
    }
    if(seconds == 60) {
        seconds = 0;
        secondsDOM.innerText = "0"+seconds;
        minutes++;
    }
    /*
        Since 1 minute is 60 seconds, we don't want our
        StopWatch to show us 60 or more seconds. So whenever
        it reaches 60 seconds, we increment minutes by 1 and
        set seconds to zero.
    */
    if(minutes<10) {
        minutesDOM.innerText = "0"+minutes;
    } else {
        minutesDOM.innerText = minutes;
    }
}


/*
        The reason we declare a "started" variable at the beginning
        is to keep "startTimer" function from running multiple times
        which causes a bug where if you click the start button multiple
        times quickly without stopping or resetting, time stops running
        while you keep clicking. By setting it's default value to false
        and changing it to true once the startTimer function invokes and
        changing it's value to false again with stop and reset buttons
        we can avoid this bug.
*/
const startTimer = () => {
    if(started === false){
    clearInterval(interval);
    interval = setInterval(increment, 1000);
    started = true;
    }
}

startDOM.addEventListener('click', startTimer);


const stopTimer = () => {
    clearInterval(interval);
    started = false;
}

stopDOM.addEventListener('click', stopTimer);


const resetTimer = () => {
    seconds = 0;
    minutes = 0;
    secondsDOM.innerText = "0"+seconds;
    minutesDOM.innerText = "0"+minutes;
    clearInterval(interval);
    started = false;
}

resetDOM.addEventListener('click', resetTimer);