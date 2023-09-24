let timeCounter;
function getAllInfo() {
  // necessary html elements
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");
  const arrowUp = document.querySelectorAll(".arrow-up");
  const arrowDown = document.querySelectorAll(".arrow-down");
  const startBtn = document.getElementById("start");
  const stopBtn = document.getElementById("stop");
  const cancelBtn = document.getElementById("cancel");
  // below are event listeners for the elements
  arrowUp.forEach((element, index) => {
    element.addEventListener("click", function () {
      const marker = 1;
      checkArrow(marker, index, hours, minutes, seconds);
    });
  });
  arrowDown.forEach((element, index) => {
    element.addEventListener("click", function () {
      const marker = -1;
      checkArrow(marker, index, hours, minutes, seconds);
    });
  });
  startBtn.addEventListener("click", function () {
    if (
      hours.textContent === "0" &&
      minutes.textContent === "0" &&
      seconds.textContent === "0"
    ) {
      return alert(`All values are zero! (0)`);
    } else {
      timeCounter = setInterval(function () {
        hour = Number(hours.textContent);
        minute = Number(minutes.textContent);
        second = Number(seconds.textContent);
        startFunction(hour, hours, minute, minutes, second, seconds);
      }, 900);
    }
  });
  stopBtn.addEventListener("click", function () {
    stopFunction();
  });
  cancelBtn.addEventListener("click", function () {
    const times = [hours, minutes, seconds];
    cancelFunction(times);
  });
}
// mr - marker; ar - index
function checkArrow(mr, ar, h, m, s) {
  switch (ar) {
    case 0:
      changeHours(h, mr);
      break;
    case 1:
      changeMinutesSeconds(m, mr);
      break;
    case 2:
      changeMinutesSeconds(s, mr);
      break;
  }
}
// mr - marker is necessary to return the counter to 0 after 23 or jump from 0 to 23 when arow dows is pressed
function changeHours(h, mr) {
  hour = Number(h.textContent);
  if (mr > 0) {
    if (hour == 23) {
      h.textContent = 0;
    } else {
      h.textContent = hour + mr;
    }
  } else {
    if (hour == 0) {
      h.textContent = 23;
    } else {
      h.textContent = hour + mr;
    }
  }
}
// changing minutes or seconds
function changeMinutesSeconds(t, mr) {
  timePoints = Number(t.textContent);
  if (mr > 0) {
    if (timePoints == 59) {
      t.textContent = 0;
    } else {
      t.textContent = timePoints + mr;
    }
  } else {
    if (timePoints == 0) {
      t.textContent = 59;
    } else {
      t.textContent = timePoints + mr;
    }
  }
}

function startFunction(hour, h, minute, m, second, s) {
  if (second == 0 && minute == 0 && hour == 0) {
    alert("Time is over!");
    stopFunction();
  } else if (second > 0) {
    s.textContent = second - 1;
  } else if (minute > 0 && second == 0) {
    m.textContent = minute - 1;
    s.textContent = 59;
  } else {
    h.textContent = hour - 1;
    m.textContent = 59;
    s.textContent = 59;
  }
}

function stopFunction() {
  clearInterval(timeCounter);
}

function cancelFunction(arr1) {
  stopFunction();
  arr1.forEach((element) => {
    element.textContent = "0";
  });
}

getAllInfo();
