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
    const genre = document.createElement('h2')
    genre.textContent = 'test'
    const difficulty = document.createElement('h2')
    titleText.insertBefore(titleText,genre.nextSibling)
    titleText.insertBefore(genre,difficulty.nextSibling)
    console.log(results)
    titleText.textConent = '問題'

    console.log('b')


    // console.log(await getData())
    // getData().then((value) => {
    //   console.log('aaa')
    // })
    // console.log('b')

  })
  const getQuizData = async () => {
    const respons = await fetch('https://opentdb.com/api.php?amount=10')
    const data = await respons.json();
    // console.log(data.results)
    // console.log(data)
    return data
  }
  // const getData = async () => {
  //   return new Promise(async (resolve, _reject) => {
  //     const respons = await fetch('https://opentdb.com/api.php?amount=10')
  //     const data = await respons.json();
  //     resolve(data);
  //   })
  // }

})


