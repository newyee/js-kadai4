'use strict'

window.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start_button')
  const titleText = document.getElementById('title')
  const descriptionText = document.getElementById('description')
  startButton.addEventListener('click', async () => {
    startButton.remove()
    titleText.textContent = '取得中'
    descriptionText.textContent = '少々お待ち下さい'
    console.log('a')
    const responsData = await getQuizData()
    const results = responsData.results
    console.log('aaa',results[0].incorrect_answers)
    const genre = document.createElement('p')
    genre.textContent = '[ジャンル]' + results[0].category
    genre.style.fontWeight = "bold";
    genre.style.fontsize = "1rem"
    const difficulty = document.createElement('p')
    console.log(results)
    difficulty.textContent = '[難易度]' + results[0].difficulty
    difficulty.style.fontWeight = "bold";
    titleText.after(genre)
    genre.after(difficulty)
    titleText.textContent = '問題'
    descriptionText.textContent = results[0].question
    // const choiceButton1 = document.createElement('button')
    // const choiceButton2 = document.createElement('button')
    let choiceList = results[0].incorrect_answers
    console.log('incorrect',choiceList)
    const correctAnswer = results[0].correct_answer
    console.log('correctAnswer',correctAnswer)
    choiceList.push(correctAnswer)
    choiceList = shuffle(choiceList)
    console.log(choiceList)
    const bottomLine = document.getElementById('bottom_line')
    for(let i = 0; i < choiceList.length; i++){
      let choiceButton = document.createElement('button')
      let br = document.createElement('br')
      choiceButton.textContent = choiceList[i]
      bottomLine.after(choiceButton)
      bottomLine.after(br)
    }
    // choiceButton1.textContent = results[0].correct_answer
    // const bottomLine = document.getElementById('bottom_line')
    // bottomLine.after(choiceButton1)
    // console.log()

  })
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


