'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start_button')
  const titleText = document.getElementById('title')
  const descriptionText = document.getElementById('description')
  const genre = document.createElement('p')
  const difficulty = document.createElement('p')
  const answerBox = document.createElement('div')
  // const mainContent = document.getElementById('main_content')
  const bottomLine = document.getElementById('bottom_line')
  let responsData = {}
  let resultCount = 0

  let numberOfCorrectAnswers = 0
  startButton.addEventListener('click', async () => {
    startButton.remove()
    titleText.textContent = '取得中'
    descriptionText.textContent = '少々お待ち下さい'
    responsData = await getQuizData()

    startQuiz()
  })
  const startQuiz = async () => {
    console.log('a')
    const results = responsData.results
    // console.log('aaa',results[0].incorrect_answers)
    genre.textContent = '[ジャンル]' + results[resultCount].category
    genre.style.fontWeight = "bold";
    genre.style.fontsize = "1rem"
    console.log(results)
    difficulty.textContent = '[難易度]' + results[resultCount].difficulty
    difficulty.style.fontWeight = "bold";
    titleText.after(genre)
    genre.after(difficulty)
    titleText.textContent = '問題'
    descriptionText.textContent = results[resultCount].question
    let choiceList = results[resultCount].incorrect_answers
    console.log('incorrect',choiceList)
    const correctAnswer = results[resultCount].correct_answer
    console.log('correctAnswer',correctAnswer)
    choiceList.push(correctAnswer)
    choiceList = shuffle(choiceList)
    console.log(choiceList)
    for(let i = 0; i < choiceList.length; i++){
      let choiceButton = document.createElement('button')
      choiceButton.addEventListener('click', () => {
        console.log('選択ボタンクリック')
        resultCount += 1
        if (choiceButton.textContent == correctAnswer){
          numberOfCorrectAnswers++
        }
        // mainContent.remove()
        while( answerBox.firstChild ){
          answerBox.removeChild(answerBox.firstChild );
        }
        // answerBox.remove()
        genre.remove()
        difficulty.remove()
        // br.remove()
        // choiceButton.remove()
        console.log('ok')
        startQuiz()
      })
      let br = document.createElement('br')
      choiceButton.textContent = choiceList[i]
      bottomLine.after(answerBox)
      answerBox.appendChild(choiceButton)
      answerBox.appendChild(br)
      // bottomLine.after(choiceButton)
      // bottomLine.after(br)
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
    // console.log(data.results)
    // console.log(data)
    return data
  }

})


