// gathering all necessary HTML elements
const day_ = document.getElementById("day");
const hour_ = document.getElementById("hour");
const minute_ = document.getElementById("minute");
const second_ = document.getElementById("second");
const holiday = document.getElementById("holiday");

const holidayDate = new Date("16 September 2023"); // seting Octoberfest date

const timer = setInterval(timeFlowing, 1000);
// bellow function calculates how many miliseconds till the holiday and then convets it to minuts, hours, and etc
function timeFlowing() {
  const todayDate = new Date();

  let remainingTime = holidayDate.getTime() - todayDate.getTime();
  let seconds = Math.ceil(remainingTime / 1000);
  let minutes = Math.ceil(seconds / 60);
  let hours = Math.ceil(minutes / 60);
  let days = Math.ceil(hours / 24);

  showTime(seconds % 60, minutes % 60, hours % 24, days);
}
// bellow fucntion shows data from timeFlowing function
function showTime(s, m, h, d) {
  if (s == 0 && m == 0 && h == 0 && d == 0) {
    alert(`Happy ${holiday.textContent}!!!`);
  } else {
    second_.textContent = s;
    minute_.textContent = m;
    hour_.textContent = h;
    day_.textContent = d;
  }
}
