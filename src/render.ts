import { ipcRenderer } from 'electron';

let intervalId: ReturnType<typeof setInterval>;
let seconds: number = 0;
let minutes: number = 0;

/* CLOCK ACTION BUTTONS */
const start_clock_button = document.getElementById('start')
const pause_clock_button = document.getElementById('pause')
const continue_clock_button = document.getElementById('continue')
const stop_clock_button = document.getElementById('stop')

/* ACTION BUTTONS */
const min_icon = document.getElementById('min-icon');
const close_icon = document.getElementById('close-icon');

const clock = document.getElementById('clock');

/* CLOCK FUNCTIONALITY */

const clockWork = (): void => {
    if (seconds + 1 > 59) {
        minutes++;
        seconds = 0
    }
    seconds++;
}

const display = (time: number): string => {
    if(time < 10){
        return `0${time}`;
    }
    return `${time}`;
}

const updateClock = (minutes: number, seconds: number): void => {
    let show_minutes: string = display(minutes);
    let show_seconds: string = display(seconds);

    clock!.innerText = `${show_minutes}:${show_seconds}`;
}

const runClock = () => {
    intervalId = setInterval(() => {
        clockWork();
        updateClock(minutes, seconds);
    }, 1000)
}
    } 
}

const startClock = async (): Promise<void> => {
    runClock();

    start_clock_button!.style.display = 'none';
    pause_clock_button!.style.display = 'initial'
}

const stopTimeLoop = (): void => {
    clearInterval(intervalId);
}

const pauseClock = (): void => {
    stopTimeLoop();
}

const stopClock = (): void => {
    stopTimeLoop();

    minutes = 0;
    seconds = 0;
    updateClock(0, 0);
}
/* WINDOW ACTION FUNCTIONS */
const minimizeApp = (): void => {
    ipcRenderer.send('minimize');
}

const closeApp = (): void => {
    ipcRenderer.send('close');
}

/* CLOCK BUTTON EVENTS */

start_clock_button!.addEventListener("click", startClock);
pause_clock_button!.addEventListener("click", pauseClock);
continue_clock_button!.addEventListener("click", restartClock);
stop_clock_button!.addEventListener("click", stopClock);

/* WINDOW ACTIONS */

min_icon!.addEventListener("click", minimizeApp)
close_icon!.addEventListener("click", closeApp)
