// script.js: logic ng IT Basics Quiz

// Ang mga tanong. answer = index ng tamang sagot (0 ang una)
var questions = [
  { q: "What does HTML stand for?", c: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language"], answer: 0 },
  { q: "Which language is used to style a web page (colors, sizes)?", c: ["HTML", "CSS", "SQL"], answer: 1 },
  { q: "Which language makes a web page interactive (like a button that does something)?", c: ["JavaScript", "CSS", "Markdown"], answer: 0 },
  { q: "What does SQL help you do?", c: ["Design a logo", "Talk to a database", "Draw circuits"], answer: 1 },
  { q: "What is the main job of an Arduino Uno?", c: ["Store websites", "Control electronics using code", "Print documents"], answer: 1 },
  { q: "Which HTML tag creates a link?", c: ["<img>", "<a>", "<p>"], answer: 1 },
  { q: "What does CPU stand for?", c: ["Central Processing Unit", "Computer Power Unit", "Central Program Utility"], answer: 0 },
  { q: "Which one is a strong password habit?", c: ["Use your birthday", "Use the same password everywhere", "Use a long mix of letters, numbers, and symbols"], answer: 2 },
  { q: "In Microsoft Excel, which formula adds the numbers in cells A1 to A5?", c: ["=SUM(A1:A5)", "=ADD(A1-A5)", "=TOTAL(A1,A5)"], answer: 0 },
  { q: "What does GitHub mainly do?", c: ["Edit photos", "Store and share code", "Send emails"], answer: 1 }
];

var index = 0;       // anong tanong na tayo
var score = 0;

var progress = document.getElementById("progress");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var feedback = document.getElementById("feedback");
var nextBtn = document.getElementById("nextBtn");

// Ipakita ang kasalukuyang tanong
function showQuestion() {
  var item = questions[index];
  progress.textContent = "Question " + (index + 1) + " of " + questions.length;
  questionEl.textContent = item.q;
  feedback.textContent = "";
  nextBtn.hidden = true;
  choicesEl.innerHTML = "";

  item.c.forEach(function (text, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.addEventListener("click", function () { choose(i); });
    choicesEl.appendChild(btn);
  });
}

// Kapag may pinili
function choose(i) {
  var item = questions[index];
  var buttons = choicesEl.querySelectorAll("button");
  buttons.forEach(function (b) { b.disabled = true; });      // hindi na puwedeng palitan
  buttons[item.answer].classList.add("correct");

  if (i === item.answer) {
    score++;
    feedback.textContent = "Correct!";
  } else {
    buttons[i].classList.add("wrong");
    feedback.textContent = "Not quite. The right answer is: " + item.c[item.answer];
  }
  nextBtn.textContent = index === questions.length - 1 ? "See result" : "Next";
  nextBtn.hidden = false;
}

// Susunod na tanong o resulta
function next() {
  index++;
  if (index < questions.length) { showQuestion(); return; }
  document.getElementById("quiz").hidden = true;
  progress.textContent = "Finished!";
  document.getElementById("score").textContent = score + " / " + questions.length;
  var msg = score >= 9 ? "Excellent!" : score >= 7 ? "Great job!" : score >= 5 ? "Good start, keep learning!" : "Keep practicing, you can do it!";
  document.getElementById("message").textContent = msg;
  document.getElementById("result").hidden = false;
}

function restart() {
  index = 0; score = 0;
  document.getElementById("result").hidden = true;
  document.getElementById("quiz").hidden = false;
  showQuestion();
}

nextBtn.addEventListener("click", next);
document.getElementById("restartBtn").addEventListener("click", restart);
showQuestion();