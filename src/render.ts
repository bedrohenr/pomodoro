let intervalId: ReturnType<typeof setInterval>;
let seconds: number = 0;
let minutes: number = 0;

const clock = document.getElementById('clock');

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

const startClock = async (): Promise<void> => {
    intervalId = setInterval(() => {
        clockWork();
        updateClock(minutes, seconds);
    }, 1000)
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

const start_clock_button = document.getElementById('start')
const pause_clock_button = document.getElementById('pause')
const stop_clock_button = document.getElementById('stop')

start_clock_button!.addEventListener("click", startClock)
pause_clock_button!.addEventListener("click", pauseClock)
stop_clock_button!.addEventListener("click", stopClock)
