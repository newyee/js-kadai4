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
    console.log('results',results)
    resultLength = results.length
    const quiz_one = new Quiz(results[0].category,results[0].difficulty,results[0].question,results[0].correct_answer,
      results[0].incorrect_answers);
    const quiz_two = new Quiz(results[1].category,results[1].difficulty,results[1].question,results[1].correct_answer,
      results[1].incorrect_answers);
    const quiz_three = new Quiz(results[2].category,results[2].difficulty,results[2].question,results[2].correct_answer,
      results[2].incorrect_answers);
    const quiz_four = new Quiz(results[3].category,results[3].difficulty,results[3].question,results[3].correct_answer,
      results[3].incorrect_answers);
    const quiz_five = new Quiz(results[4].category,results[4].difficulty,results[4].question,results[4].correct_answer,
      results[4].incorrect_answers);
    const quiz_six = new Quiz(results[5].category,results[5].difficulty,results[5].question,results[5].correct_answer,
      results[5].incorrect_answers);
    const quiz_seven = new Quiz(results[6].category,results[6].difficulty,results[6].question,results[6].correct_answer,
      results[6].incorrect_answers);
    const quiz_eight = new Quiz(results[7].category,results[7].difficulty,results[7].question,results[7].correct_answer,
      results[7].incorrect_answers);
    const quiz_nine = new Quiz(results[8].category,results[8].difficulty,results[8].question,results[8].correct_answer,
      results[8].incorrect_answers);
    const quiz_ten = new Quiz(results[9].category,results[9].difficulty,results[9].question,results[9].correct_answer,
      results[9].incorrect_answers);
    const quizData = [quiz_one,quiz_two,quiz_three,quiz_four,quiz_five,quiz_six,quiz_seven,quiz_eight,quiz_nine,quiz_ten]
    // console.log('aaa',quizData[quizCount].choiceList[0])
    startQuiz(quizData)
  })

  const startQuiz = async (quizData) => {
    // console.log(quizData[quizCount].quiz_incorrectAnswers)
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
    const respons = await fetch('https://opentdb.com/api.php?amount=10')
    const data = await respons.json();
    return data
  }
})
