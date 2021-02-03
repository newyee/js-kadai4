'use strict'
class Quiz{
  constructor(genre,difficulty,question,correctAnswer,incorrectAnswers){
    this.quiz_genre = genre
    this.quiz_difficulty = difficulty
    this.quiz_question = question
    this.quiz_choiceList = incorrectAnswers
    this.quiz_incorrectAnswers = incorrectAnswers
    this.quiz_correctAnswer = correctAnswer
    this.quiz_choiceList.push(correctAnswer)
    this.quiz_choiceList = this.shuffle(this.quiz_choiceList)
  }
  get genre(){
    return this.quiz_genre
  }
  get difficulty(){
    return this.quiz_difficulty
  }
  get question(){
    return this.quiz_question
  }
  get correctAnswer(){
    return this.quiz_correctAnswer
  }
  get choiceList(){
    return this.quiz_choiceList
  }
  shuffle ([...array]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
window.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start_button')
  const titleText = document.getElementById('title')
  const descriptionText = document.getElementById('description')
  const genre = document.createElement('p')
  const difficulty = document.createElement('p')
  const answerBox = document.createElement('div')
  const bottomLine = document.getElementById('bottom_line')
  let quizCount = 0
  let results = []
  let numberOfCorrectAnswers = 0
  let resultLength = 0
  startButton.addEventListener('click', async () => {
    startButton.remove()
    titleText.textContent = '取得中'
    descriptionText.textContent = '少々お待ち下さい'
    const responsData = await getQuizData()
    results = responsData.results
    resultLength = results.length
    const quizData = [];
    results.forEach((result) => {
      quizData.push(new Quiz(result.category, result.difficulty, result.question,
      result.correct_answer, result.incorrect_answers));
    });
    await startQuiz(quizData)
  })

  const startQuiz = async (quizData) => {
    genre.textContent = '[ジャンル]' + quizData[quizCount].genre
    genre.style.fontWeight = "bold";
    genre.style.fontsize = "1rem"
    difficulty.textContent = '[難易度]' + quizData[quizCount].difficulty
    difficulty.style.fontWeight = "bold";
    titleText.after(genre)
    genre.after(difficulty)
    titleText.textContent = '問題'
    descriptionText.textContent = quizData[quizCount].question
    for(let i = 0; i < quizData[quizCount].choiceList.length; i++){
      if(typeof quizData[quizCount].choiceList[i] == 'undefined'){
        break
      }
      let choiceButton = document.createElement('button')
      calcAnswer(choiceButton,quizData)
      let p = document.createElement('p')
      choiceButton.textContent = quizData[quizCount].choiceList[i]
      bottomLine.after(answerBox)
      answerBox.appendChild(p)
      p.appendChild(choiceButton)
    }
  }
  const calcAnswer = (choiceButton,quizData) => {
    choiceButton.addEventListener('click', () => {
      // console.log('選択ボタンクリック')
      if (choiceButton.textContent == quizData[quizCount].correctAnswer){
        numberOfCorrectAnswers++
      }
      quizCount += 1
      while( answerBox.firstChild ){
        answerBox.removeChild(answerBox.firstChild );
      }
      genre.remove()
      difficulty.remove()
      if (resultLength == quizCount){
        titleText.textContent = "あなたの正当数は" + numberOfCorrectAnswers + "です"
        descriptionText.textContent = "再度チャレンジしたい場合は以下のボタンをクリック！"
        const homeButton = document.createElement("button")
        homeButton.textContent = "ホームに戻る"
        answerBox.appendChild(homeButton)
        homeButton.addEventListener("click", () => {
          location.reload();
        })
      }
      startQuiz(quizData)
    })
  }
  const getQuizData = async () => {
    try {
      const respons = await fetch('https://opentdb.com/api.php?amount=10')
      const data = await respons.json();
      return data
    } catch (error) {
      console.log(error)
    }
  }
})
