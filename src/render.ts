import { ipcRenderer } from 'electron';

let intervalId: ReturnType<typeof setInterval>;
let seconds: number = 0;
let minutes: number = 0;

/* TIMER ACTION BUTTONS */
const start_timer_button = document.getElementById('start')
const pause_timer_button = document.getElementById('pause')
const continue_timer_button = document.getElementById('continue')
const stop_timer_button = document.getElementById('stop')

/* ACTION BUTTONS */
const min_icon = document.getElementById('min-icon');
const close_icon = document.getElementById('close-icon');

const timer = document.getElementById('clock');

/* TIMER FUNCTIONALITY */

const runClockwise = (): void => {
    if (seconds + 1 > 59) {
        minutes++;
        seconds = 0
    }
    seconds++;
}

const runAntiClockwise = (): void => {
    if (seconds == 0) {
        seconds = 59
        minutes--;
    }
    seconds--;
}

const timerWork = (): void => {
    runClockwise();
}

const display = (time: number): string => {
    if(time < 10){
        return `0${time}`;
    }
    return `${time}`;
}

const updateTimer = (minutes: number, seconds: number): void => {
    let show_minutes: string = display(minutes);
    let show_seconds: string = display(seconds);

    timer!.innerText = `${show_minutes}:${show_seconds}`;
}

const runTimer = () => {
    intervalId = setInterval(() => {
        timerWork();
        updateTimer(minutes, seconds);
    }, 1000)
}

const restartTimer = () => {
    runTimer();

    continue_timer_button!.style.display = 'none';
    stop_timer_button!.style.display = 'none';
    pause_timer_button!.style.display = 'initial';
}

const startTimer = async (): Promise<void> => {
    runTimer();

    start_timer_button!.style.display = 'none';
    pause_timer_button!.style.display = 'initial'
}

const stopTimeLoop = (): void => {
    clearInterval(intervalId);
}

const pauseTimer = (): void => {
    stopTimeLoop();

    pause_timer_button!.style.display = 'none';
    continue_timer_button!.style.display = 'initial';
    stop_timer_button!.style.display = 'initial';
}

const stopTimer = (): void => {
    stopTimeLoop();

    minutes = 0;
    seconds = 0;
    updateTimer(0, 0);

    pause_timer_button!.style.display = 'none';
    continue_timer_button!.style.display = 'none';
    stop_timer_button!.style.display = 'none';
    start_timer_button!.style.display = 'initial';
}
/* WINDOW ACTION FUNCTIONS */
const minimizeApp = (): void => {
    ipcRenderer.send('minimize');
}

const closeApp = (): void => {
    ipcRenderer.send('close');
}

/* TIMER BUTTON EVENTS */

start_timer_button!.addEventListener("click", startTimer);
pause_timer_button!.addEventListener("click", pauseTimer);
continue_timer_button!.addEventListener("click", restartTimer);
stop_timer_button!.addEventListener("click", stopTimer);

/* WINDOW ACTIONS */

min_icon!.addEventListener("click", minimizeApp)
close_icon!.addEventListener("click", closeApp)
