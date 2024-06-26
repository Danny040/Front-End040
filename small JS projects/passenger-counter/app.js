let totalNumberP = 0; // total number of people
const historyDisplay = document.getElementById("history-display");
const counterWindow = document.getElementById("counter-window");
const counterElement = document.getElementById("number-of-people");
// adding data to the table 
const storingData = (pN) => {
  const hourS = new Date();
  const tableInfo = document.getElementById("table1");
  document.getElementById("total-number-of-people").innerText = totalNumberP;
  let times = `${hourS.getHours()}:${hourS.getMinutes()}:${hourS.getSeconds()}`;
  tableInfo.innerHTML += `<tr> \
          <td>${times}</td>\
          <td> ${pN}</td>\
    </tr>`;
  return console.log("Ok");
};
// counting how many people entered
const myAddFunction = () => {
  let counter = counterElement.textContent;
  let changedCounter = Number(counter) + 1;
  counterElement.textContent = changedCounter;
};
// "saving" data
const mySaveFunction = () => {
  let counter = counterElement.textContent;
  totalNumberP += Number(counter);
  counterElement.textContent = "0";
  storingData(counter);
  alert("Data has been saved!");
};
// closing history section
const closeFunction = () => {
  historyDisplay.classList.toggle("history-display-off");
  counterWindow.classList.remove("counter-window-off");
};
// showing history section
const myHistoryFunction = () => {
  counterWindow.classList.toggle("counter-window-off");
  historyDisplay.classList.remove("history-display-off");
};
