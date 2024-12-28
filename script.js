const vocabulary = [
    { word: "apple", meaning: "蘋果" },
    { word: "book", meaning: "書" },
    { word: "cat", meaning: "貓" },
    { word: "dog", meaning: "狗" },
    { word: "elephant", meaning: "大象" }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM元素
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const checkButton = document.getElementById('check-btn');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');

// 初始化
function initQuiz() {
    totalQuestionsSpan.textContent = vocabulary.length;
    showQuestion();
}

// 顯示問題
function showQuestion() {
    const currentQuestion = vocabulary[currentQuestionIndex];
    questionElement.textContent = `請輸入「${currentQuestion.meaning}」的英文：`;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    answerInput.value = '';
    answerInput.focus();
    feedbackElement.textContent = '';
    feedbackElement.className = 'feedback';
}

// 檢查答案
function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = vocabulary[currentQuestionIndex].word.toLowerCase();
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
        score++;
        feedbackElement.textContent = '答對了！';
        feedbackElement.className = 'feedback correct';
        scoreElement.textContent = `目前得分：${score}`;
    } else {
        feedbackElement.textContent = `答錯了！正確答案是 ${vocabulary[currentQuestionIndex].word}`;
        feedbackElement.className = 'feedback incorrect';
    }

    checkButton.disabled = true;
    nextButton.disabled = false;
    answerInput.disabled = true;
}

// 下一題
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < vocabulary.length) {
        checkButton.disabled = false;
        nextButton.disabled = true;
        answerInput.disabled = false;
        showQuestion();
    } else {
        // 測驗結束
        questionElement.textContent = '測驗結束！';
        answerInput.style.display = 'none';
        checkButton.style.display = 'none';
        nextButton.style.display = 'none';
        feedbackElement.textContent = `測驗完成！最終得分：${score}/${vocabulary.length}`;
        feedbackElement.className = 'feedback';
    }
}

// 事件監聽
checkButton.addEventListener('click', checkAnswer);
nextButton.addEventListener('click', nextQuestion);
answerInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !checkButton.disabled) {
        checkAnswer();
    }
});

// 啟動測驗
initQuiz();