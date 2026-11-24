// Questions Array: Stores questions, options, and the correct answer
const questions = [
  {
    question: "Which HTML tag is used to link an external CSS file?",
    options: ["<style>", "<link>", "<script>", "<css>"],
    answer: "<link>"
  },
  {
    question: "Which CSS property changes the text color of an element?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: "color"
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    options: ["msg('Hello World')", "alertBox('Hello World')", "alert('Hello World')", "msgBox('Hello World')"],
    answer: "alert('Hello World')"
  },
  {
    question: "Which HTML element is used to define the footer of a document?",
    options: ["<bottom>", "<section>", "<footer>", "<aside>"],
    answer: "<footer>"
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "<!--", "/*", "#"],
    answer: "//"
  }
];

let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let answered = false;

// Randomly shuffles the questions array
function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}

// Clears the currently selected radio option
function clearOption() {
  if (answered) {
    return;
  }

  let radios = document.getElementsByName("option");
  for (let i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
}

// Highlights the correct answer (and wrong user choice) directly on the options
function highlightOptions(correctAnswer) {
  let labels = document.getElementsByClassName("option-item");
  for (let i = 0; i < labels.length; i++) {
    let radio = labels[i].querySelector("input");
    radio.disabled = true;

    if (radio.value === correctAnswer) {
      labels[i].classList.add("correct-answer");
    } else if (radio.checked) {
      labels[i].classList.add("wrong-answer");
    }
  }
}

// Sets a countdown timer for each question
function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  document.getElementById("time").textContent = timeLeft;

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("time").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      answered = true;

      let correctAnswer = questions[currentIndex].answer;
      let feedbackSection = document.getElementById("feedback-section");
      let feedbackMessage = document.getElementById("feedback-message");

      feedbackMessage.textContent = "Time's up! The correct answer is: " + correctAnswer;
      feedbackSection.className = "incorrect";

      highlightOptions(correctAnswer);

      document.getElementById("clear-btn").disabled = true;
      document.getElementById("submit-btn").disabled = true;
      document.getElementById("next-btn").disabled = false;
    }
  }, 1000);
}

// Displays the current question and answer options
function displayQuestion() {
  answered = false;
  let currentQuestion = questions[currentIndex];

  document.getElementById("question-number").textContent =
    "Question " + (currentIndex + 1) + " of " + questions.length;
  document.getElementById("question-text").textContent = currentQuestion.question;

  // Hide previous feedback
  let feedbackSection = document.getElementById("feedback-section");
  feedbackSection.className = "hidden";

  // Build option radio buttons
  let optionsList = document.getElementById("options-list");
  optionsList.innerHTML = "";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    let label = document.createElement("label");
    label.className = "option-item";

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = currentQuestion.options[i];

    label.appendChild(radio);
    label.appendChild(document.createTextNode(currentQuestion.options[i]));
    optionsList.appendChild(label);
  }

  document.getElementById("clear-btn").disabled = false;
  document.getElementById("submit-btn").disabled = false;
  document.getElementById("next-btn").disabled = true;
}

// Checks whether the selected answer is correct and updates the score
function checkAnswer() {
  if (answered) {
    return;
  }

  let selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option first.");
    return;
  }

  answered = true;
  clearInterval(timer);

  let userAnswer = selected.value;
  let correctAnswer = questions[currentIndex].answer;
  let feedbackSection = document.getElementById("feedback-section");
  let feedbackMessage = document.getElementById("feedback-message");

  if (userAnswer === correctAnswer) {
    score++;
    feedbackMessage.textContent = "Correct! The answer is: " + correctAnswer;
    feedbackSection.className = "correct";
  } else {
    feedbackMessage.textContent = "Incorrect! The correct answer is: " + correctAnswer;
    feedbackSection.className = "incorrect";
  }

  highlightOptions(correctAnswer);

  document.getElementById("clear-btn").disabled = true;
  document.getElementById("submit-btn").disabled = true;
  document.getElementById("next-btn").disabled = false;
}

// Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
  currentIndex++;

  if (currentIndex < questions.length) {
    displayQuestion();
    startTimer();
  } else {
    clearInterval(timer);
    document.getElementById("quiz-section").classList.add("hidden");
    document.getElementById("feedback-section").className = "hidden";
    document.getElementById("score-text").textContent =
      "Quiz Finished! Your Final Score: " + score + " / " + questions.length;
    document.getElementById("restart-btn").classList.remove("hidden");
  }
}

// Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
  currentIndex = 0;
  score = 0;

  document.getElementById("quiz-section").classList.remove("hidden");
  document.getElementById("score-text").textContent = "Finish the quiz to see your score.";
  document.getElementById("restart-btn").classList.add("hidden");

  shuffleQuestions();
  displayQuestion();
  startTimer();
}

// Run quiz when page loads
startQuiz();