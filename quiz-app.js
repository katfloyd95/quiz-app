// FUNCTIONS:
function buildQuiz() {
  // variable to store the HTML output
  const output = [];
  // for each question
  myQuestions.forEach( (currentQuestion, questionNumber) => {
    // variable to store list of possible answers
    const listAnswers = [];
    // for each available answer in myQuestions.answers
    for (letter in currentQuestion.answers) {
      listAnswers.push(
        `<label>
          <input type = "radio" name = "question${questionNumber}" value = "${letter}">
          ${letter}: ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    // add this question and it's answers to the HTML output
    output.push(
      `<div class = "slide">
        <div class = "question">${currentQuestion.question}</div>
        <div class = "answers">${listAnswers.join("")}</div>
      </div>
      `
    )
  })

  // combine out output list into one string of HTML and put it onto the page
  quizContainer.innerHTML = output.join("");
};

function showResults() {
  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");
  // keep track of user's correct answers
  let numCorrect = 0;
  // for each question
  myQuestions.forEach( (currentQuestion, questionNumber) => {
    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if the answer is correct
    if (userAnswer === currentQuestion.correctAnswer) {
      // add to the correct answer number counter
      numCorrect++;
      // colors the answers green
      answerContainers[questionNumber].style.color = 'lightgreen';
    }
    // if the answer is incorrect
    else {
      // colors the answers red
      answerContainers[questionNumber].style.color = 'red';
    }
  });

  // show number of correct answers out of total
  resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
};

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  // Control the Previous Button Display"
  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  // Control the Next Button Display:
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }

}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function showPreviousSlide() {
  showSlide(currentSlide - 1);
}

// VARIABLES:
const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

const myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];

// KICK THINGS OFF:
buildQuiz();

// PAGINATION:
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

// SHOW THE FIRST SLIDE:
showSlide(currentSlide);

// EVENT LISTENERS
submitButton.addEventListener('click', showResults);
nextButton.addEventListener('click', showNextSlide);
previousButton.addEventListener('click', showPreviousSlide);