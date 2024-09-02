const questions=[
    {
        question:'Which of the following is a fruit?',
        answers:[
            {text:'Apple',correct:true},
            {text:'Cabbage',correct:false},
            {text:'Broccoli',correct:false},
            {text:'Celery',correct:false},
        ]
    },
    {
        question:'Which is the tallest mountain in the world?',
        answers:[
            {text:'K2',correct:false},
            {text:'Everest',correct:true},
            {text:'Api',correct:false},
            {text:'Lhotse',correct:false},
        ]
    },
    {
        question:'How many planets are there?',
        answers:[
            {text:5,correct:false},
            {text:9,correct:false},
            {text:7,correct:false},
            {text:8,correct:true},
        ]
    }

]
const questionElement=document.getElementById('question')
const answerButtons=document.getElementById('answer-buttons')
const nextButton=document.getElementById('next-btn')
const startButton=document.getElementById('startQuiz')
const myDisplay=document.querySelector('.quiz')

let currentQuestionIndex=0
let score=0
startQuiz()
function startQuiz(){
    currentQuestionIndex=0
    score=0
    showQuestion()
    nextButton.innerHTML='Next'
}
function showQuestion(){
    removePrevious()
    let questionNumber=currentQuestionIndex+1
    let currentQuestion=questions[currentQuestionIndex]
    questionElement.innerHTML=questionNumber+"."+currentQuestion.question
    currentQuestion.answers.forEach(answer=>{
        let button=document.createElement('button')
        button.innerHTML=answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.right=answer.correct
        }
        button.onclick=checkAnswer
    })
}
function removePrevious(){
    Array.from(answerButtons.children).forEach(button=>button.style.display='none')
}
function checkAnswer(e){
    if(e.target.dataset.right==='true'){
        e.target.classList.add('correct')
        score++
        Array.from(answerButtons.children).forEach(button=>{
            if(button.dataset.right==null){
                button.disabled=true
            }
        })
    }else{
        e.target.classList.add('incorrect')
        Array.from(answerButtons.children).forEach(button=>{
            if(button.dataset.right==='true'){
                button.classList.add('correct')
            }
            button.disabled=true
        })
        }
        nextButton.style.display='block'
    }
nextButton.onclick=showNext
function showNext(){
    if(currentQuestionIndex<questions.length){
        currentQuestionIndex++
        if(currentQuestionIndex<questions.length){
            showQuestion()
        }else{
            function showScore(){
                removePrevious()
                questionElement.innerHTML=`Your score is ${score} out of ${questions.length}`
                nextButton.innerHTML='Play Again'
            }
            showScore()
        }
    }else{
        startQuiz()
    }
}
