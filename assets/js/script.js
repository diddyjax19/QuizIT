
let questions = [
    {
        id: 1,
        question: "What is the Full Form Of RAM?",
        answer:"Random Access Memory",
        options: [
            "Run Accept Memory",
            "Random All Memory",
            "Random Access Memory",
            "None of these"
        ]   
    },
    {
        id: 2,
        question: "What is the Full-Form of CPU?",
        answer: "Central Processing Unit",
        options: [
          "Central Program Unit",
          "Central Processing Unit",
          "Central Preload Unit",
          "None of these"
        ]
      },
      {
        id: 3,
        question: "What is the Full-Form of E-mail",
        answer: "Electronic Mail",
        options: [
          "Electronic Mail",
          "Electric Mail",
          "Engine Mail",
          "None of these"
        ]
      },
      {
        id: 4,
        question: "'DB' in computer means?",
        answer: "DataBase",
        options: [
          "Double Byte",
          "Data Block",
          "DataBase",
          "None of these"
        ]
      },
      {
        id: 5,
        question: "What is FMD?",
        answer: "Fluorescent Multi-Layer Disc",
        options: [
          "Fluorescent Multi-Layer Disc",
          "Flash Media Driver",
          "Fast-Ethernet Measuring Device",
          "None of these"
        ]
      },
      {
        id: 6,
        question: "How many bits is a byte?",
        answer: "8",
        options: [
          "32",
          "16",
          "8",
          "64"
        ]
      },
      {
        id: 7,
        question: "A JPG stands for:",
        answer: "A format for an image file",
        options: [
          "A format for an image file",
          "A Jumper Programmed Graphic",
          "A type of hard disk",
          "A unit of measure for memory"
        ]
      },
      {
        id: 8,
        question: "Which was an early mainframe computer?",
        answer: "ENIAC",
        options: [
          "ENIAC",
          "EDVAC",
          "UNIC",
          "ABACUS"
        ]
      },
      {
        id: 9,
        question: "Main circuit board in a computer is:",
        answer: "Mother board",
        options: [
          "Harddisk",
          "Mother board",
          "Microprocessor",
          "None of these"
        ]
      },
      {
        id: 10,
        question: "ISP stands for:",
        answer: "Internet Service Provider",
        options: [
          "Internet Survey Period",
          "Integreted Service Provider",
          "Internet Security Protocol",
          "Internet Service Provider"
          
        ]
      },
    {
        id: 11,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
        "Common Style Sheet",
        "Colorful Style Sheet",
        "Computer Style Sheet",
        "Cascading Style Sheet"
          
        ]
      },

      {
        id: 12,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        options: [
          "Hypertext Preprocessor",
          "Hypertext Programming",
          "Hypertext Preprogramming",
          "Hometext Preprocessor"
          
        ]
      },
];

let question_count = 0;
let points = 0;
let shuffled_questions = questions.sort(() => Math.random() - 0.5); // shuffle the questions

let timer = document.getElementById("timer");
let time_left = 20; // sent the time to 20 seconds per question
let interval = null;

window.onload = function () {
    show(shuffled_questions[question_count]);
};

function show(question) {
    clearInterval(interval);
    time_left = 20; // reset time limit per question
    interval = setInterval(() => {
        time_left--;
        timer.innerHTML = `Time Left: ${time_left} seconds`;
        if (time_left === 0) {
            clearInterval(interval);
            next();
        }
    }, 1000);

    let questionElement = document.getElementById("questions");
    let [first, second, third, fourth] = question.options;

    questionElement.innerHTML = `<h2>Q${question.question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
    toggleActive();
}

function toggleActive() {
    let option = document.querySelectorAll("li.option");
    for (let i = 0; i < option.length; i++) {
        option[i].onclick = function () {
            for (let i = 0; i < option.length; i++) {
                if (option[i].classList.contains("active")) {
                    option[i].classList.remove("active");
                }
            }
            option[i].classList.add("active");
        };
    }
}

function next() {
    let selectedOption = document.querySelector("li.option.active");
    if (!selectedOption) {
        alert("Please select an option!");
        return;
    }

    let user_answer = selectedOption.innerHTML;
    let shuffled_question = shuffled_questions[question_count];
    if (user_answer == shuffled_question.answer) {
        points += 10;
        sessionStorage.setItem("points", points);
    } else {
        let options = document.querySelectorAll("li.option");
        for (let i = 0; i < options.length; i++) {
            if (options[i].innerHTML === shuffled_question.answer) {
                options[i].classList.add("correct");
            }
        }
    }

    question_count++;
    if (question_count == shuffled_questions.length) {
        clearInterval(interval);
        location.href = "end.html";
        return;
    }
    show(shuffled_questions[question_count]);
}

function exit() {
    clearInterval(interval);
    location.href = "end.html";
}

function restart() {
    sessionStorage.setItem("points", 0);
    location.href = "index.html";
}