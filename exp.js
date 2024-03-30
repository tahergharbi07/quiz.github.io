fetch('questions.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(questions => {
    console.log(questions);

    const questionElement = document.getElementById("question");
    const answerbutton = document.getElementById("answer-buttons");
    const nextbutton = document.getElementById("next-btn");
    
    let currentQuestionIndex = 0;
    let score = 0;
    
    function startQz() {
        resetState();
        currentQuestionIndex = 0;
        score = 0;
        nextbutton.innerHTML = "Next"; 
        showQuestion();
    }
        
    function showQuestion() {
        resetState(); 
        let currentQuestion = questions[currentQuestionIndex];
        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerbutton.appendChild(button);
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectanswer);
        });
    }
       
    function resetState() {
        while (answerbutton.firstChild) {
            answerbutton.removeChild(answerbutton.firstChild);
        }
        nextbutton.style.display = "none";
    }
    
    function selectanswer(e) {
        const selectedBtn = e.target;
        const iscorrect = selectedBtn.dataset.correct == "true";
        if (iscorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerbutton.children).forEach(button => {
            if (button.dataset.correct == "true") {
                button.classList.add("correct");
            }
            button.disabled = "true";
    
        });
        nextbutton.style.display = "block";
    }
    
    function showScore() {
        resetState();
        questionElement.innerHTML = `Vous avez obtenu ! ${score} sur ${questions.length}!`;
        nextbutton.innerHTML = "Rejouer";
        nextbutton.style.display = "block";
    }
    
    
    
    function handleNextbutton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();        
            currentQuestionIndex = -1;
            score = 0;
        }
    }
    
    nextbutton.addEventListener("click", () => {
        if (currentQuestionIndex < questions.length) {
          handleNextbutton();
        } else {
          currentQuestionIndex = 0;
          startQz();
        }
      });
    
    startQz();

})
.catch(error => {
    console.error('There was a problem fetching the data:', error);
  });





