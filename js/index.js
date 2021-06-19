const refs = {
  start: document.querySelector(".js-start"),
  timeTable: document.querySelector(".js-time"),
  lap: document.querySelector(".js-take-lap"),
  reset: document.querySelector(".js-reset"),
  ul: document.querySelector(".js-laps"),
};

refs.lap.setAttribute("disabled", true);
refs.reset.disabled = true;

const timer = {
  startTime: null,
  currentTime: null,
  pauseTime: null,
  isActive: false,
  id: 0,
  deltaTime: null,

  start() {
    if (this.isActive) {
      this.isActive = false;
      changeName(this.isActive);
      this.pauseTime = this.currentTime - this.startTime;

      clearInterval(this.id);
      return;
    }

    this.startTime = this.pauseTime ? Date.now() - this.pauseTime : Date.now();

    this.id = setInterval(() => {
      this.currentTime = Date.now();
      this.deltaTime = this.currentTime - this.startTime;
      showTimeOnTable(formatTime(this.deltaTime));
    }, 100);
    this.isActive = true;
    changeName(this.isActive);
    refs.lap.disabled = false;
    refs.reset.disabled = false;
  },
  reset() {
    clearInterval(this.id);
    this.deltaTime = 0;
    showTimeOnTable(formatTime(this.deltaTime));
    this.isActive = false;

    changeName(this.isActive, this.deltaTime);
    refs.lap.disabled = true;
    refs.reset.disabled = true;
    refs.ul.innerHTML = "";
  },
  takeLap() {
    createLap(formatTime(this.deltaTime));
  },
};

function formatTime(time) {
  let date = new Date(time);
  let minutes =
    date.getMinutes() < 10
      ? 0 + `${date.getMinutes()}`
      : `${date.getMinutes()}`;
  let seconds =
    date.getSeconds() < 10
      ? 0 + `${date.getSeconds()}`
      : `${date.getSeconds()}`;
  let milliseconds = Math.floor(date.getMilliseconds() / 100);

  return `${minutes}:${seconds}.${milliseconds}`;
}

refs.start.addEventListener("click", timer.start.bind(timer));
refs.reset.addEventListener("click", timer.reset.bind(timer));
refs.lap.addEventListener("click", timer.takeLap.bind(timer));

function showTimeOnTable(str) {
  refs.timeTable.textContent = str;
}

function changeName(active, delta) {
  if (!active) {
    refs.start.textContent = "Continue";
  } else if (active) {
    refs.start.textContent = "Pause";
  }
  if (delta === 0) {
    refs.start.textContent = "Start";
  }
}
function createLap(str) {
  const li = document.createElement("li");
  refs.ul.append(li);
  li.textContent = str;
}
