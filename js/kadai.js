'use strict'

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
    resultLength = results.length
    startQuiz()
  })
  const startQuiz = async () => {
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


