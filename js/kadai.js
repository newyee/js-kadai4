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
    console.log(responsData)
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
<<<<<<< HEAD
  // const getData = async () => {
  //   return new Promise(async (resolve, _reject) => {
  //     const respons = await fetch('https://opentdb.com/api.php?amount=10')
  //     const data = await respons.json();
  //     resolve(data);
  //   })
  // }
=======
>>>>>>> ae6da6a9490e6b56c0592a68f879446161048ae1

})


