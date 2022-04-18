const questionsData = [
  {
    question: "Which city is the capital of Switzerland?",
    a: "The Swiss National Bank",
    b: "Zurich",
    c: "Geneva",
    d: "It has no capital",
    correctAnswer: "d",
  },

  {
    question: "The tallest building is ",
    a: "Burj Khalifa",
    b: "Lotte World Tower",
    c: "One World Trade Center",
    d: "Who cares",
    correctAnswer: "a",
  },

  {
    question: "The most populated city in the world is ",
    a: "Earth",
    b: "Jakarta",
    c: "Tokyo-Yokohama",
    d: "Manila",
    correctAnswer: "c",
  },

  {
    question: "Who was the second president of the United States?",
    a: "George Washington",
    b: "Some Dude",
    c: "John Adams",
    d: "Wait, I know him. What was his name???",
    correctAnswer: "c",
  },

  {
    question: "Who is the inventor of the first electric motor?",
    a: "Nikola Tesla",
    b: "Elon Musk",
    c: "The scientist",
    d: "Albert Einstein",
    correctAnswer: "a",
  },
];

const buttonsElement = document.querySelector("[data-buttons]");
const contentElement = document.querySelector("[data-content]");
const numberOfQuestions = document.getElementById("questions");
const currentQuestion = document.getElementById("question");
const answers = document.querySelectorAll("[data-answer]");

let totalNumberOfQuestions = questionsData.length;
let numberOfCorrectAnswers = 0;
let currentQuestionNumber = 0;
let chosenPersonsAnswer = "";
const submittedAnswers = [];

function showQuestions() {
  const q = questionsData[currentQuestionNumber];
  currentQuestion.textContent = q["question"];
  answers.forEach((element) => {
    element.textContent = `${element.id.toUpperCase()}: ${q[element.id]}`;
  });
  showNumberOfQuestions();
}

function showNumberOfQuestions() {
  currentQuestionNumber += 1;
  numberOfQuestions.textContent = `Question ${currentQuestionNumber} / ${totalNumberOfQuestions}`;
}

function chosenAnswer(el) {
  chosenPersonsAnswer = el.id;
}

function clearElements() {
  buttonsElement.innerHTML = `<button class="submit-btn" id="submit-btn" onclick="restartFunction()">
            Restart
          </button>`;
  let child = contentElement.lastChild;
  while (child) {
    child.remove();
    child = contentElement.lastChild;
  }
  console.log(submittedAnswers);
}

function showResult() {
  const newHeading = document.createElement("h1");
  const headingText = document.createTextNode(
    `YOUR RESULT: ${numberOfCorrectAnswers} / ${submittedAnswers.length}`
  );
  newHeading.appendChild(headingText);
  contentElement.appendChild(newHeading);
  for (let i = 0; i < submittedAnswers.length; i++) {
    const containerDivElement = document.createElement("div");
    containerDivElement.classList.add("result");
    const textFilling = document.createTextNode(`Question ${
      i + 1
    } and answers: \n\
    yours - ${submittedAnswers[i]}, correct one - ${
      questionsData[i]["correctAnswer"]
    }`);
    containerDivElement.appendChild(textFilling);
    contentElement.appendChild(containerDivElement);
  }
}

function submitFunction() {
  if (chosenPersonsAnswer && currentQuestionNumber != 5) {
    submittedAnswers.push(chosenPersonsAnswer);
    countingCorrectAnswers();
    chosenPersonsAnswer = "";
    showQuestions();
  } else if (currentQuestionNumber < 5) {
    alert(`Please, choose an answer!`);
  } else if (currentQuestionNumber == 5) {
    submittedAnswers.push(chosenPersonsAnswer);
    countingCorrectAnswers();
    chosenPersonsAnswer = "";
    clearElements();
    showResult();
  }
}

function restartFunction() {
  location.reload();
}

function countingCorrectAnswers() {
  if (
    chosenPersonsAnswer ==
    questionsData[currentQuestionNumber - 1]["correctAnswer"]
  ) {
    numberOfCorrectAnswers += 1;
  }
}

showQuestions();
