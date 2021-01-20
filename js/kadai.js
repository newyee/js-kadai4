'use strict'
class Quiz{
  constructor(genre,difficulty,question,correctAnswer,incorrect_answers){
    this.quiz_genre = genre
    this.quiz_difficulty = difficulty
    this.quiz_question = question
    this.quiz_choiceList = incorrect_answers
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
  let responsData = {}
  let resultCount = 0
  let results = []
  let numberOfCorrectAnswers = 0
  let resultLength = 0
  startButton.addEventListener('click', async () => {
    startButton.remove()
    titleText.textContent = '取得中'
    descriptionText.textContent = '少々お待ち下さい'
    responsData = await getQuizData()
    results = responsData.results
    console.log('results',results)
    resultLength = results.length
    let quiz_one = new Quiz(results[0].category,results[0].difficulty,results[0].question,results[0].correctAnswer,
      results[0].incorrect_answers);
    let quiz_two = new Quiz(results[1].category,results[1].difficulty,results[1].question,results[1].correctAnswer,
      results[1].incorrect_answers);
    let quiz_three = new Quiz(results[2].category,results[2].difficulty,results[2].question,results[2].correctAnswer,
      results[2].incorrect_answers);
    let quiz_four = new Quiz(results[3].category,results[3].difficulty,results[3].question,results[3].correctAnswer,
      results[3].incorrect_answers);
    let quiz_five = new Quiz(results[4].category,results[4].difficulty,results[4].question,results[4].correctAnswer,
      results[4].incorrect_answers);
    let quiz_six = new Quiz(results[5].category,results[5].difficulty,results[5].question,results[5].correctAnswer,
      results[5].incorrect_answers);
    let quiz_seven = new Quiz(results[6].category,results[6].difficulty,results[6].question,results[6].correctAnswer,
      results[6].incorrect_answers);
    let quiz_eight = new Quiz(results[7].category,results[7].difficulty,results[7].question,results[7].correctAnswer,
      results[7].incorrect_answers);
    let quiz_nine = new Quiz(results[8].category,results[8].difficulty,results[8].question,results[8].correctAnswer,
      results[8].incorrect_answers);
    let quiz_ten = new Quiz(results[9].category,results[9].difficulty,results[9].question,results[9].correctAnswer,
      results[9].incorrect_answers);
    startQuiz()

  })
  const startQuiz = async () => {
    // let oneQuestion = new Quiz(results[0].category,)
    genre.textContent = '[ジャンル]' + results[resultCount].category
    genre.style.fontWeight = "bold";
    genre.style.fontsize = "1rem"
    // console.log(results)
    difficulty.textContent = '[難易度]' + results[resultCount].difficulty
    difficulty.style.fontWeight = "bold";
    titleText.after(genre)
    genre.after(difficulty)
    titleText.textContent = '問題'
    descriptionText.textContent = results[resultCount].question
    let choiceList = results[resultCount].incorrect_answers
    const correctAnswer = results[resultCount].correct_answer
    // console.log('correctAnswer',correctAnswer)
    choiceList.push(correctAnswer)
    choiceList = shuffle(choiceList)
    for(let i = 0; i < choiceList.length; i++){
      let choiceButton = document.createElement('button')
      choiceButton.addEventListener('click', () => {
        // console.log('選択ボタンクリック')
        resultCount += 1
        if (choiceButton.textContent == correctAnswer){
          numberOfCorrectAnswers++
        }
        while( answerBox.firstChild ){
          answerBox.removeChild(answerBox.firstChild );
        }
        genre.remove()
        difficulty.remove()
        if (resultLength == resultCount){
          titleText.textContent = "あなたの正当数は" + numberOfCorrectAnswers + "です"
          descriptionText.textContent = "再度チャレンジしたい場合は以下のボタンをクリック！"
          const homeButton = document.createElement("button")
          homeButton.textContent = "ホームに戻る"
          answerBox.appendChild(homeButton)
          homeButton.addEventListener("click", () => {
            location.reload();
          })
        }
        startQuiz()
      })
      let br = document.createElement('br')
      choiceButton.textContent = choiceList[i]
      bottomLine.after(answerBox)
      answerBox.appendChild(choiceButton)
      answerBox.appendChild(br)
    }
  }

  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const getQuizData = async () => {
    const respons = await fetch('https://opentdb.com/api.php?amount=10')
    const data = await respons.json();
    return data
  }
})


