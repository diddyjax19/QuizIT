/*jshint esversion: 6 */
let shuffledQuestions = []; 

function handleQuestions() {
    //pushed 10 questions to the array of shuffled questions using this function.
    //The app would handle 10 queries every session.
    while (shuffledQuestions.length <= 9) {
        
        const random = questions[Math.floor(Math.random() * questions.length)];
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random);
        }
    }
}

let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

// code for displaying the next question to the dom in an array
//also handles showing information about quiz participants to dom
function NextQuestion(index) {
    handleQuestions();
    const currentQuestion = shuffledQuestions[index];
    document.getElementById("question-number").innerHTML = questionNumber;
    document.getElementById("player-score").innerHTML = playerScore;
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber];
    const currentQuestionAnswer = currentQuestion.correctOption;
    const options = document.getElementsByName("option");

    //retrieves all DOM elements with the name "option" (in this the radio inputs)
    let correctOption = null;

    options.forEach((option) => {
       if (option.value === currentQuestionAnswer) {
         //receives the right radio input with the right response.
            correctOption = option.labels[0].id;
        }
    });

    //ensuring that a radio input has been selected or a choice has been made
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex";
    }
    

    //ensuring that a radio input has been selected or a choice has been made
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex";
    }

    //checking to see if the answer matches the checked radio button
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green";
            playerScore++;
            indexNumber++;
            //set to hold the current question number until the next one loads
            setTimeout(() => {
                questionNumber++;
            }, 1000);
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id;
            document.getElementById(wrongLabelId).style.backgroundColor = "red";
            document.getElementById(correctOption).style.backgroundColor = "green";
            wrongAttempt++;
            indexNumber++;
            //set to hold the question number until the following question loads
            setTimeout(() => {
                questionNumber++;
            }, 1000);
        }
    });
}

//when the subsequent button is pressed
function handleNextQuestion() {
    checkForAnswer();
    unCheckRadioButtons();

    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber);
        } else {
            handleEndGame();
        }
        resetOptionBackground();
    }, 1000);
}

//returns the option background to null after displaying the correct or incorrect colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = "";
    });
}

// For the following inquiry, all radio buttons are unchecked (can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function to use when all queries have been resolved
function handleEndGame() {
    let remark = null;
    let remarkColor = null;

    // player condition check and color check for remarks
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing.";
        remarkColor = "red";
    } else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better.";
        remarkColor = "orange";
    } else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going.";
        remarkColor = "green";
    }
    const playerGrade = (playerScore / 10) * 100;

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark;
    document.getElementById('remarks').style.color = remarkColor;
    document.getElementById('grade-percentage').innerHTML = playerGrade;
    document.getElementById('wrong-answers').innerHTML = wrongAttempt;
    document.getElementById('right-answers').innerHTML = playerScore;
    document.getElementById('score-modal').style.display = "flex";

}

//closes the score modal, restarts the game, and reorders the questions.
function closeScoreModal() {
    questionNumber = 1;
    playerScore = 0;
    wrongAttempt = 0;
    indexNumber = 0;
    shuffledQuestions = [];
    NextQuestion(indexNumber);
    document.getElementById('score-modal').style.display = "none";
}

//function to end warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none";
}

//Here is where all questions and answers are stored.
const questions = [{
        question: "Who has won more tennis grand slam titles?",
        optionA: "Venus Williams ",
        optionB: "Serena Williams",
        optionC: "Iga ??wi??tek",
        optionD: "Simona Halep",
        correctOption: "optionB"
        
    },

    {
        question: 'How many players are allowed on a soccer pitch?',
        optionA: '10 players',
        optionB: '11 players',
        optionC: '9 players',
        optionD: '12 players',
        correctOption: 'optionB'
    },

    {
        question: "In soccer, what body part can???t touch the ball?",
        optionA: "Hand",
        optionB: "leg",
        optionC: "Stomach",
        optionD: "Knee",
        correctOption: "optionA"
    },

    {
        question: "How many players are on a baseball team?",
        optionA: "7 players",
        optionB: "11 players",
        optionC: "9 players",
        optionD: "12 players",
        correctOption: "optionC"
    },

    {
        question: "How many rings are there on the Olympic flag?",
        optionA: "5",
        optionB: "6",
        optionC: "4",
        optionD: "3",
        correctOption: "optionA"
    },

    {
        question: "Which country has the largest population in the world?",
        optionA: "China",
        optionB: "USA",
        optionC: "Germany",
        optionD: "Ghana",
        correctOption: "optionA"
    },

    {
        question: "What is the record for red cards given in a single soccer game?",
        optionA: "30",
        optionB: "36",
        optionC: "20",
        optionD: "10",
        correctOption: "optionB"
    },

    {
        question: "What is the coldest place on Earth?",
        optionA: "Germany",
        optionB: "Canada",
        optionC: "Russia",
        optionD: "Antarctica",
        correctOption: "optionD"
    },
    {
        question: "How continents are there in the world?",
        optionA: "8",
        optionB: "7",
        optionC: "4",
        optionD: "12",
        correctOption: "optionB"
    },

    {
        question: "30 days has ______?",
        optionA: "January",
        optionB: "December",
        optionC: "June",
        optionD: "August",
        correctOption: "optionC"
    },

    {
        question: "What is the only country to have played in every single soccer World Cup?",
        optionA: "Brazil",
        optionB: "England",
        optionC: "Germany",
        optionD: "USA",
        correctOption: "optionA"
    },

    {
        question: "Which is the longest river in the world?",
        optionA: "River Nile",
        optionB: "Long River",
        optionC: "River Niger",
        optionD: "Lake Chad",
        correctOption: "optionA"
    },

    {
        question: "_____ is the hottest Continent on Earth?",
        optionA: "Oceania",
        optionB: "Antarctica",
        optionC: "Africa",
        optionD: "North America",
        correctOption: "optionC"
    },

    {
        question: "Which country is the largest in the world ?",
        optionA: "Russia",
        optionB: "Canada",
        optionC: "Africa",
        optionD: "Egypt",
        correctOption: "optionA"
    },

    {
        question: "The World Cup are held every how many years??",
        optionA: "1",
        optionB: "5",
        optionC: "2",
        optionD: "4",
        correctOption: "optionD"
    },

    {
        question: "What sport is dubbed the ???king of sports????",
        optionA: "Lawn Tennis",
        optionB: "Golf",
        optionC: "BasketBall",
        optionD: "Soccer",
        correctOption: "optionD"
    },

    {
        question: "Which of the following sports does not use a ball?",
        optionA: "Golf",
        optionB: "Hockey",
        optionC: "Polo",
        optionD: "Tennis",
        correctOption: "optionB"
    },

    {
        question: "The longest river in the United Kingdom is ?",
        optionA: "River Severn",
        optionB: "River Mersey",
        optionC: "River Trent",
        optionD: "River Tweed",
        correctOption: "optionA"
    },


    {
        question: "In which year did Roger Federer first win the US Open?",
        optionA: "2010",
        optionB: "2015",
        optionC: "2004",
        optionD: "2001",
        correctOption: "optionC"
    },

    {
        question: "Which national team won the football World cup in 2018 ?",
        optionA: "England",
        optionB: "Brazil",
        optionC: "Germany",
        optionD: "France",
        correctOption: "optionD"
    },

    {
        question: "Which country won the first ever soccer World Cup in 1930?",
        optionA: "Brazil",
        optionB: "Spain",
        optionC: "Uruguay",
        optionD: "Canada",
        correctOption: "optionC"
    },

    {
        question: "How many sets of hurdles are there in a 110m race?",
        optionA: "10",
        optionB: "12",
        optionC: "9",
        optionD: "11",
        correctOption: "optionA"
    },

    {
        question: "____ is the capital of Nigeria?",
        optionA: "Abuja",
        optionB: "Lagos",
        optionC: "Calabar",
        optionD: "Kano",
        correctOption: "optionA"
    },

    {
        question: "Los Angeles is also known as?",
        optionA: "Angels City",
        optionB: "Shining city",
        optionC: "City of Angels",
        optionD: "Lost Angels",
        correctOption: "optionC"
    },

    {
        question: "What is the capital of Germany ?",
        optionA: "Georgia",
        optionB: "Missouri",
        optionC: "Oklahoma",
        optionD: "Berlin",
        correctOption: "optionD"
    },

    {
        question: "What is the largest desert in the world ?",
        optionA: "Antarctica",
        optionB: "Sahara",
        optionC: "Arctic",
        optionD: "Arabian",
        correctOption: "optionA"
    },

    {
        question: "How many planets are currently in the solar system ?",
        optionA: "Eleven",
        optionB: "Seven",
        optionC: "Nine",
        optionD: "Eight",
        correctOption: "optionD"
    },

    {
        question: "Which Planet is the hottest?",
        optionA: "Jupitar",
        optionB: "Mercury",
        optionC: "Earth",
        optionD: "Venus",
        correctOption: "optionB"
    },

    {
        question: "What is the highest peak in Africa?",
        optionA: "Mount Kenya",
        optionB: "Mount Kilimanjaro",
        optionC: "Mount Stanley",
        optionD: "Mount Speke",
        correctOption: "optionB"
    },

    {
        question: "Which football manager is known as ???The Special One????",
        optionA: "J??rgen Klopp",
        optionB: "Jos?? Mourinho",
        optionC: "Pep Guardiola",
        optionD: "Ars??ne Wenger",
        correctOption: "optionB"
    },

    {
        question: "How long is a marathon?",
        optionA: "26.2 miles",
        optionB: "100.9 miles",
        optionC: "36.7 miles",
        optionD: "16.5 miles",
        correctOption: "optionA"
    }
];